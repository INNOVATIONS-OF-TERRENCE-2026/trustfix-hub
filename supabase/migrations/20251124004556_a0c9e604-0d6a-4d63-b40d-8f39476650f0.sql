-- Add sensitive fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS ssn_encrypted TEXT,
ADD COLUMN IF NOT EXISTS experian_email TEXT,
ADD COLUMN IF NOT EXISTS experian_password_encrypted TEXT;

-- Add case_status enum value for Active Member
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'active_member' AND enumtypid = 'case_status'::regtype) THEN
    ALTER TYPE case_status ADD VALUE 'active_member';
  END IF;
END $$;

-- Add payment_id to cases table to track which payment created the case
ALTER TABLE public.cases
ADD COLUMN IF NOT EXISTS payment_id UUID REFERENCES public.payments(id);

-- Add service_type to cases table to track SLA hours
ALTER TABLE public.cases
ADD COLUMN IF NOT EXISTS service_type TEXT;

-- Update payments table to store product info
ALTER TABLE public.payments
ADD COLUMN IF NOT EXISTS stripe_product_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;

-- Create admin notifications table
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- Admin notifications policies
CREATE POLICY "Admins can view their notifications"
  ON public.admin_notifications
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create admin notifications"
  ON public.admin_notifications
  FOR INSERT
  WITH CHECK (true);

-- Function to notify admins of new payments
CREATE OR REPLACE FUNCTION public.notify_admins_new_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_record RECORD;
  client_name TEXT;
  client_email TEXT;
BEGIN
  -- Get client info
  SELECT full_name INTO client_name FROM profiles WHERE id = NEW.user_id;
  SELECT email INTO client_email FROM auth.users WHERE id = NEW.user_id;
  
  -- Notify all admins
  FOR admin_record IN 
    SELECT DISTINCT user_id FROM user_roles WHERE role = 'admin'
  LOOP
    INSERT INTO admin_notifications (
      admin_user_id,
      type,
      title,
      message,
      link
    ) VALUES (
      admin_record.user_id,
      'new_payment',
      'New Payment Received',
      'Client ' || COALESCE(client_name, client_email) || ' has completed payment of $' || NEW.amount,
      '/admin/clients'
    );
  END LOOP;
  
  RETURN NEW;
END;
$$;

-- Trigger for new payments
DROP TRIGGER IF EXISTS on_payment_completed ON public.payments;
CREATE TRIGGER on_payment_completed
  AFTER INSERT ON public.payments
  FOR EACH ROW
  WHEN (NEW.payment_status = 'paid')
  EXECUTE FUNCTION public.notify_admins_new_payment();

-- Function to auto-create case on payment
CREATE OR REPLACE FUNCTION public.auto_create_case_on_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_case_id UUID;
  sla_hours_value INT;
  service_type_value TEXT;
BEGIN
  -- Determine SLA hours based on product
  CASE NEW.stripe_product_id
    WHEN 'prod_TTjtA4Yuwg9nTV' THEN 
      sla_hours_value := 24;
      service_type_value := '24_hour_chexsystems';
    ELSE 
      sla_hours_value := 96;
      service_type_value := 'credit_removal';
  END CASE;
  
  -- Create case if doesn't exist
  INSERT INTO cases (
    user_id,
    status,
    current_stage,
    sla_hours,
    payment_id,
    service_type,
    started_at,
    sla_deadline
  ) VALUES (
    NEW.user_id,
    'active_member',
    'reviewing_docs',
    sla_hours_value,
    NEW.id,
    service_type_value,
    now(),
    now() + (sla_hours_value || ' hours')::INTERVAL
  )
  ON CONFLICT (user_id) DO UPDATE
  SET 
    status = 'active_member',
    started_at = now(),
    sla_deadline = now() + (sla_hours_value || ' hours')::INTERVAL,
    payment_id = NEW.id,
    service_type = service_type_value;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_payment_create_case ON public.payments;
CREATE TRIGGER on_payment_create_case
  AFTER INSERT ON public.payments
  FOR EACH ROW
  WHEN (NEW.payment_status = 'paid')
  EXECUTE FUNCTION public.auto_create_case_on_payment();