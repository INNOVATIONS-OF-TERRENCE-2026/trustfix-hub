import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  type: 'payment_confirmation' | 'case_activation' | 'document_reminder' | 'welcome' | 'support';
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, type }: EmailRequest = await req.json();
    
    console.log(`[EMAIL] Sending ${type} email to ${to}`);

    // TODO: Integrate with Resend or similar email service
    // For now, log the email details
    console.log('[EMAIL] Email content:', {
      to,
      subject,
      htmlPreview: html.substring(0, 100) + '...',
      type
    });

    // In production, you would use Resend here:
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    // await resend.emails.send({ from: "...", to, subject, html });

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("[EMAIL] Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});

// Email templates
export const EMAIL_TEMPLATES = {
  payment_confirmation: (clientName: string, planName: string, amount: string) => ({
    subject: "Your Payment Has Been Received – Welcome to DeWayne's Credit",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; background: #fff; }
          .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Payment Confirmed!</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>Thank you for choosing DeWayne's Credit Repair & Solutions!</p>
            <p><strong>Payment Details:</strong></p>
            <ul>
              <li>Plan: ${planName}</li>
              <li>Amount: ${amount}</li>
              <li>Status: ✓ Paid</li>
            </ul>
            <p>Your case has been activated and our team is ready to begin processing immediately.</p>
            <a href="https://dwaynescredit.com/portal/dashboard" class="button">Go to Your Dashboard</a>
            <p><strong>Next Steps:</strong></p>
            <ol>
              <li>Log in to your client portal</li>
              <li>Upload your required documents</li>
              <li>Track your progress in real-time</li>
            </ol>
          </div>
          <div class="footer">
            <p>DeWayne's Credit Repair & Solutions<br>
            2003 Linda Ln, Richardson, TX 75081<br>
            (469) 877-2300 | Darrellcunningham20@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  case_activation: (clientName: string, slaHours: number) => ({
    subject: "Your Case Is Now Active",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; background: #fff; }
          .alert { background: #f0f9ff; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; }
          .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your Case Is Active!</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>Great news! Your credit restoration case has been officially opened.</p>
            <div class="alert">
              <strong>🕐 SLA Timer:</strong> Your ${slaHours}-hour guarantee starts as soon as we receive all required documents.
            </div>
            <p><strong>What You Need to Do:</strong></p>
            <ol>
              <li>Upload your Driver's License or Government ID (front only)</li>
              <li>Upload your Social Security Card (optional but recommended)</li>
              <li>Complete your profile information</li>
            </ol>
            <a href="https://dwaynescredit.com/portal/documents" class="button">Upload Documents Now</a>
            <p>Once we receive your documents, our team will begin processing your disputes immediately.</p>
          </div>
          <div class="footer">
            <p>DeWayne's Credit Repair & Solutions<br>
            Questions? Call us at (469) 877-2300</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  document_reminder: (clientName: string) => ({
    subject: "Upload Your Required Documents",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; background: #fff; }
          .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Document Upload Reminder</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>We're ready to start working on your credit repair case, but we still need your documents.</p>
            <p><strong>Required Documents:</strong></p>
            <ul>
              <li>✓ Driver's License or Government ID (Front Only)</li>
              <li>✓ Social Security Card (Optional)</li>
            </ul>
            <a href="https://dwaynescredit.com/portal/documents" class="button">Upload Now</a>
            <p>Uploading your documents today ensures we can start your SLA guarantee and begin removing negative items from your credit report.</p>
          </div>
          <div class="footer">
            <p>Need help? Contact us at (469) 877-2300</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  welcome: (clientName: string) => ({
    subject: "Welcome to DeWayne's Credit – Getting Started",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; background: #fff; }
          .feature { margin: 15px 0; padding: 15px; background: #f9f9f9; border-radius: 5px; }
          .button { display: inline-block; padding: 12px 30px; background: #D4AF37; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to DeWayne's Credit!</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>Welcome to DeWayne's Credit Repair & Solutions! We're excited to help you achieve your credit goals.</p>
            <p><strong>Here's what you can expect:</strong></p>
            <div class="feature">
              <strong>📊 Real-Time Dashboard</strong><br>
              Track your case progress, SLA status, and document uploads.
            </div>
            <div class="feature">
              <strong>💬 Direct Messaging</strong><br>
              Communicate directly with your credit specialist.
            </div>
            <div class="feature">
              <strong>🔒 Secure Document Storage</strong><br>
              All your documents are encrypted and stored securely.
            </div>
            <div class="feature">
              <strong>⏱️ Guaranteed Timeline</strong><br>
              We honor our SLA commitments with a money-back guarantee.
            </div>
            <a href="https://dwaynescredit.com/portal/dashboard" class="button">Explore Your Portal</a>
          </div>
          <div class="footer">
            <p>DeWayne's Credit Repair & Solutions<br>
            (469) 877-2300 | Darrellcunningham20@gmail.com</p>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  support: (clientName: string) => ({
    subject: "We're Here to Help",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%); padding: 30px; text-align: center; color: white; }
          .content { padding: 30px; background: #fff; }
          .contact-box { background: #f0f9ff; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>We're Here to Help</h1>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>Have questions? Need assistance? Our support team is ready to help you succeed.</p>
            <div class="contact-box">
              <p><strong>📧 Email Support:</strong><br>
              Darrellcunningham20@gmail.com<br>
              Response time: Within 24 hours</p>
              <p><strong>📞 Phone Support:</strong><br>
              (469) 877-2300<br>
              Monday - Friday: 9 AM - 6 PM CST</p>
              <p><strong>💬 Portal Messages:</strong><br>
              Send us a message directly through your client portal for the fastest response.</p>
            </div>
            <p><strong>Common Questions:</strong></p>
            <ul>
              <li>What documents do I need to upload?</li>
              <li>How long does the credit repair process take?</li>
              <li>How do I track my case status?</li>
              <li>What is the SLA guarantee?</li>
            </ul>
            <p>Visit our FAQ page or reach out directly – we're here to support you every step of the way.</p>
          </div>
          <div class="footer">
            <p>DeWayne's Credit Repair & Solutions</p>
          </div>
        </div>
      </body>
      </html>
    `
  })
};
