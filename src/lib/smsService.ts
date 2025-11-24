/**
 * SMS Notification Service
 * Handles sending SMS notifications via Twilio-compatible API
 */

export interface SMSMessage {
  userId: string;
  phoneNumber: string;
  message: string;
  type: 'payment_received' | 'case_activated' | 'document_reminder' | 'sla_warning' | 'support' | 'admin_message';
}

export const SMS_TEMPLATES = {
  payment_received: (clientName: string) => 
    `Hi ${clientName}! Your payment has been received. Your DeWaynesCredit.com case is now active. Log in to upload documents: https://dwaynescredit.com`,
  
  case_activated: (clientName: string, slaHours: number) => 
    `Welcome ${clientName}! Your case is active. ${slaHours}-hour SLA timer started. Upload docs now: https://dwaynescredit.com/portal/documents`,
  
  document_reminder: (clientName: string) => 
    `Hi ${clientName}, reminder to upload your required documents to start your credit repair process: https://dwaynescredit.com/portal/documents`,
  
  sla_warning: (clientName: string, hoursRemaining: number) => 
    `${clientName}, your SLA has ${hoursRemaining} hours remaining. We need your documents to meet our guarantee: https://dwaynescredit.com/portal/documents`,
  
  support: (clientName: string) => 
    `Hi ${clientName}, you have a new update in your DeWaynesCredit.com portal. Log in to view details: https://dwaynescredit.com/portal/messages`,
  
  admin_message: (clientName: string) => 
    `Hi ${clientName}, you have a new message from your credit repair specialist. Log in to view: https://dwaynescredit.com/portal/messages`
};

/**
 * Send SMS notification
 * This would integrate with Twilio or similar service
 * For now, it logs the message and returns success
 */
export async function sendSMS(params: SMSMessage): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('[SMS] Sending notification:', {
      type: params.type,
      to: params.phoneNumber,
      preview: params.message.substring(0, 50) + '...'
    });

    // TODO: Integrate with actual SMS provider (Twilio, etc.)
    // For now, this is a placeholder that simulates sending
    
    // In production, you would call Twilio API here:
    // const response = await fetch('https://api.twilio.com/2010-04-01/Accounts/...');
    
    return { success: true };
  } catch (error) {
    console.error('[SMS] Error sending notification:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Helper to send SMS from user ID
 */
export async function sendSMSToUser(
  userId: string, 
  phoneNumber: string,
  messageType: keyof typeof SMS_TEMPLATES,
  clientName: string,
  additionalParams?: any
): Promise<{ success: boolean; error?: string }> {
  let message: string;
  
  switch (messageType) {
    case 'sla_warning':
      message = SMS_TEMPLATES.sla_warning(clientName, additionalParams.hoursRemaining);
      break;
    case 'case_activated':
      message = SMS_TEMPLATES.case_activated(clientName, additionalParams.slaHours);
      break;
    default:
      message = SMS_TEMPLATES[messageType](clientName);
  }

  return sendSMS({
    userId,
    phoneNumber,
    message,
    type: messageType
  });
}
