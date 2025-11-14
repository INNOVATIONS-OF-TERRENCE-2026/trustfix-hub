-- Add additional fields to profiles for expanded signup
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS experian_username text,
ADD COLUMN IF NOT EXISTS experian_password_encrypted text,
ADD COLUMN IF NOT EXISTS ssn_last4 text,
ADD COLUMN IF NOT EXISTS encryption_key_id uuid;

-- Add check constraint for SSN format (4 digits only)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ssn_last4_format'
  ) THEN
    ALTER TABLE public.profiles 
    ADD CONSTRAINT ssn_last4_format CHECK (ssn_last4 ~ '^[0-9]{4}$' OR ssn_last4 IS NULL);
  END IF;
END $$;

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('client-documents', 'client-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for document storage
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can upload their own documents' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Users can upload their own documents"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'client-documents' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own documents' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Users can view their own documents"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
      bucket_id = 'client-documents' AND
      (storage.foldername(name))[1] = auth.uid()::text
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Admins can view all documents' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Admins can view all documents"
    ON storage.objects FOR SELECT
    TO authenticated
    USING (
      bucket_id = 'client-documents' AND
      has_role(auth.uid(), 'admin'::app_role)
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Admins can upload to any folder' AND tablename = 'objects'
  ) THEN
    CREATE POLICY "Admins can upload to any folder"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
      bucket_id = 'client-documents' AND
      has_role(auth.uid(), 'admin'::app_role)
    );
  END IF;
END $$;

-- Add admin notes to cases
ALTER TABLE public.cases
ADD COLUMN IF NOT EXISTS admin_notes text[];

-- Add stage tracking with more detailed statuses
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'case_stage') THEN
    CREATE TYPE case_stage AS ENUM (
      'reviewing_docs',
      'drafting_disputes',
      'submitted',
      'processing_48hr',
      'complete'
    );
  END IF;
END $$;

ALTER TABLE public.cases
ADD COLUMN IF NOT EXISTS current_stage case_stage DEFAULT 'reviewing_docs';

-- Modify documents table to track document status
ALTER TABLE public.documents
ADD COLUMN IF NOT EXISTS verification_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS admin_viewed_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS admin_viewed_by uuid;

-- Update guarantee_timers to add more tracking
ALTER TABLE public.guarantee_timers
ADD COLUMN IF NOT EXISTS paused_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS pause_reason text,
ADD COLUMN IF NOT EXISTS refund_eligible boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS refund_notified_at timestamp with time zone;

-- Add payment confirmation tracking
ALTER TABLE public.payments
ADD COLUMN IF NOT EXISTS confirmation_sent_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS receipt_url text;

-- Add read status to messages
ALTER TABLE public.messages
ADD COLUMN IF NOT EXISTS is_admin_message boolean DEFAULT false;

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  link text,
  created_at timestamp with time zone DEFAULT now(),
  read_at timestamp with time zone
);

-- Enable RLS on notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Notifications policies
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own notifications'
  ) THEN
    CREATE POLICY "Users can view their own notifications"
    ON public.notifications FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'System can create notifications'
  ) THEN
    CREATE POLICY "System can create notifications"
    ON public.notifications FOR INSERT
    TO authenticated
    WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own notifications'
  ) THEN
    CREATE POLICY "Users can update their own notifications"
    ON public.notifications FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id);
  END IF;
END $$;

-- Add triggers for automatic notifications

-- Trigger: Notify when document uploaded
CREATE OR REPLACE FUNCTION notify_document_uploaded()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, link)
  VALUES (
    NEW.user_id,
    'document_uploaded',
    'Document Uploaded Successfully',
    'Your ' || NEW.type || ' has been uploaded and is being reviewed.',
    '/portal/documents'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_document_upload ON public.documents;
CREATE TRIGGER on_document_upload
  AFTER INSERT ON public.documents
  FOR EACH ROW
  EXECUTE FUNCTION notify_document_uploaded();

-- Trigger: Notify when case stage changes
CREATE OR REPLACE FUNCTION notify_case_stage_change()
RETURNS trigger AS $$
BEGIN
  IF NEW.current_stage IS DISTINCT FROM OLD.current_stage THEN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      NEW.user_id,
      'stage_update',
      'Case Status Updated',
      'Your case has been moved to: ' || NEW.current_stage,
      '/portal/dashboard'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_case_stage_change ON public.cases;
CREATE TRIGGER on_case_stage_change
  AFTER UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION notify_case_stage_change();

-- Trigger: Notify when message received
CREATE OR REPLACE FUNCTION notify_message_received()
RETURNS trigger AS $$
BEGIN
  IF NEW.to_user_id IS NOT NULL THEN
    INSERT INTO public.notifications (user_id, type, title, message, link)
    VALUES (
      NEW.to_user_id,
      'new_message',
      'New Message Received',
      'You have a new message from ' || 
      CASE WHEN NEW.is_admin_message THEN 'Admin' ELSE 'Support' END,
      '/portal/messages'
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_message_received ON public.messages;
CREATE TRIGGER on_message_received
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_message_received();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_unread ON public.notifications(user_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_documents_case ON public.documents(case_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user ON public.messages(to_user_id);
CREATE INDEX IF NOT EXISTS idx_cases_user_status ON public.cases(user_id, status);
CREATE INDEX IF NOT EXISTS idx_guarantee_timers_status ON public.guarantee_timers(status) WHERE status = 'running';