-- Fix search_path for notification functions
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;