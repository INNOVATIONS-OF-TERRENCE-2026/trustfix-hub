-- Fix remaining security warning for update_updated_at_column function
ALTER FUNCTION update_updated_at_column() SET search_path = public;