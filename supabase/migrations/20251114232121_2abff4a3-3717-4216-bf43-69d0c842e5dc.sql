-- Fix security warnings by setting search_path on all notification trigger functions

ALTER FUNCTION notify_document_uploaded() SET search_path = public;
ALTER FUNCTION notify_case_stage_change() SET search_path = public;
ALTER FUNCTION notify_message_received() SET search_path = public;