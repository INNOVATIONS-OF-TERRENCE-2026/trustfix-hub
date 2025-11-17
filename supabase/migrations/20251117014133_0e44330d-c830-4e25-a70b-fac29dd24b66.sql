-- Extend profiles table with additional required fields
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS dob DATE,
ADD COLUMN IF NOT EXISTS ssn_last4 TEXT,
ADD COLUMN IF NOT EXISTS experian_username TEXT,
ADD COLUMN IF NOT EXISTS experian_password_encrypted TEXT,
ADD COLUMN IF NOT EXISTS encryption_key_id UUID;

-- Create service subscriptions table
CREATE TABLE IF NOT EXISTS public.service_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL CHECK (service_type IN ('4_day_removal', 'chexsystems_24hr', 'extended_service', 'unlimited')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'cancelled', 'refunded')),
  price_paid NUMERIC NOT NULL,
  payment_provider TEXT CHECK (payment_provider IN ('affirm', 'afterpay', 'zip', 'stripe', 'other')),
  payment_reference TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on service_subscriptions
ALTER TABLE public.service_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS policies for service_subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON public.service_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
  ON public.service_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all subscriptions"
  ON public.service_subscriptions FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'agent'::app_role));

CREATE POLICY "Admins can update all subscriptions"
  ON public.service_subscriptions FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'agent'::app_role));

-- Create audit logs table for compliance
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'auditor'::app_role));

-- System can insert audit logs
CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true);

-- Update cases table with SLA timer fields
ALTER TABLE public.cases
ADD COLUMN IF NOT EXISTS sla_deadline TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS sla_hours INTEGER DEFAULT 96,
ADD COLUMN IF NOT EXISTS sla_paused BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS sla_pause_reason TEXT,
ADD COLUMN IF NOT EXISTS auto_refund_eligible BOOLEAN DEFAULT false;

-- Create function to automatically set SLA deadline when case starts
CREATE OR REPLACE FUNCTION set_sla_deadline()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.started_at IS NOT NULL AND OLD.started_at IS NULL THEN
    NEW.sla_deadline := NEW.started_at + (NEW.sla_hours || ' hours')::INTERVAL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for SLA deadline
DROP TRIGGER IF EXISTS trigger_set_sla_deadline ON public.cases;
CREATE TRIGGER trigger_set_sla_deadline
  BEFORE UPDATE ON public.cases
  FOR EACH ROW
  EXECUTE FUNCTION set_sla_deadline();

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_service_subscriptions_user_id ON public.service_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_service_subscriptions_status ON public.service_subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_cases_sla_deadline ON public.cases(sla_deadline) WHERE sla_deadline IS NOT NULL;

-- Create trigger for updated_at on service_subscriptions
CREATE TRIGGER update_service_subscriptions_updated_at
  BEFORE UPDATE ON public.service_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();