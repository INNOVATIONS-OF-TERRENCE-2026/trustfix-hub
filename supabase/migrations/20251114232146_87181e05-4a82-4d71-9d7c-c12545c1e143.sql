-- Fix the remaining function that's missing search_path
ALTER FUNCTION update_updated_at_column() SET search_path = public;