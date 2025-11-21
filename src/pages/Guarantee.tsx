import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Guarantee() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-4xl font-display font-bold mb-8">Refund Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">1. Our Commitment to You</h2>
            <p className="text-muted-foreground">
              At DeWayne's Credit Repair & Solutions, we stand behind our services with strong guarantees. We are committed to delivering 
              results and ensuring customer satisfaction. This Refund Policy outlines the terms and conditions under which refunds are 
              available for our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">2. Service-Based Refund Terms</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">4-Day Guarantee Service</h3>
            <p className="text-muted-foreground mb-4">
              For our 4-Day Guaranteed Removal service, the following refund terms apply:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>If we do not begin processing your disputes within 4 business days of receiving all required documentation, you are eligible for a full refund</li>
              <li>The 4-day timer begins only after all required documents are uploaded and verified by our team</li>
              <li>Refunds must be requested within 30 days of the service purchase date</li>
              <li>Partial work completed will not affect refund eligibility if we miss the 4-day deadline</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">24-Hour ChexSystems Removal</h3>
            <p className="text-muted-foreground mb-4">
              For our 24-Hour ChexSystems Removal service ($400), the following terms apply:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>If we do not submit your ChexSystems dispute within 24 hours of receiving all required information, you are eligible for a full refund</li>
              <li>The 24-hour timer begins when all required documents and information are received and verified</li>
              <li>Results timing depends on ChexSystems response time, which is outside our control</li>
              <li>Refund requests must be submitted within 14 days of the service purchase date</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Starter Service ($40 Down Payment)</h3>
            <p className="text-muted-foreground mb-4">
              The $40 down payment for our starter service is non-refundable as it covers initial setup and processing fees. However:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>If we fail to deliver services as promised, you may be eligible for a refund of the full service amount</li>
              <li>Remaining balance payments can be cancelled before services begin</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Unlimited Items Service</h3>
            <p className="text-muted-foreground mb-4">
              For our Unlimited Items service ($999), refunds are available under the following conditions:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Full refund if we fail to begin processing within the guaranteed timeframe</li>
              <li>Partial refunds may be available if you cancel within 14 days and before substantial work has been completed</li>
              <li>No refunds after 30 days or if more than 50% of disputes have been submitted</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">3. Refund Eligibility Requirements</h2>
            <p className="text-muted-foreground mb-4">To be eligible for a refund, the following conditions must be met:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>All required documentation must be provided in a timely manner</li>
              <li>You must respond to our communications within the specified timeframes</li>
              <li>Refund requests must be submitted in writing via email or through our customer portal</li>
              <li>You must cooperate with our team throughout the service period</li>
              <li>No fraudulent or misleading information was provided during signup</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">4. Non-Refundable Circumstances</h2>
            <p className="text-muted-foreground mb-4">Refunds will NOT be issued in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Failure to provide required documentation within specified timeframes</li>
              <li>Customer becomes unresponsive or fails to cooperate with our team</li>
              <li>Credit bureaus refuse to remove items due to their legitimacy (accurate negative information)</li>
              <li>Customer terminates services after disputes have been submitted</li>
              <li>Changes in credit bureau policies or procedures outside our control</li>
              <li>Services have been substantially completed regardless of the final outcome</li>
              <li>Fraudulent or false information was provided during enrollment</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">5. How to Request a Refund</h2>
            <p className="text-muted-foreground mb-4">To request a refund, follow these steps:</p>
            <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
              <li>Send an email to Darrellcunningham20@gmail.com with the subject line "Refund Request"</li>
              <li>Include your full name, account information, and reason for the refund request</li>
              <li>Provide any supporting documentation that demonstrates eligibility for a refund</li>
              <li>Allow 5-7 business days for our team to review your request</li>
              <li>You will receive a response via email regarding the status of your refund request</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">6. Refund Processing</h2>
            <p className="text-muted-foreground mb-4">
              Once a refund is approved:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Refunds will be processed within 10 business days of approval</li>
              <li>Refunds will be issued to the original payment method used for the purchase</li>
              <li>For Buy Now Pay Later services (Affirm, Afterpay, Klarna), refunds follow the provider's policies</li>
              <li>Bank processing times may add 3-5 additional business days for the refund to appear</li>
              <li>You will receive a confirmation email once the refund has been processed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">7. Dispute Resolution</h2>
            <p className="text-muted-foreground">
              If you disagree with our decision on your refund request, you may request a review by contacting our management team. 
              All disputes will be reviewed within 14 business days. Final decisions will be communicated in writing. For unresolved 
              disputes, you may pursue resolution through the appropriate legal channels as outlined in our Terms of Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">8. Chargebacks</h2>
            <p className="text-muted-foreground">
              We strongly encourage customers to contact us directly before initiating a chargeback with their bank or credit card company. 
              Chargebacks may result in immediate suspension of services and may affect your ability to use our services in the future. 
              We will work with you to resolve any payment disputes fairly and promptly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">9. Changes to This Refund Policy</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify this Refund Policy at any time. Changes will be posted on our website and will be effective 
              immediately. Your continued use of our services after changes are posted constitutes acceptance of the updated policy. 
              Refund policies in effect at the time of purchase will govern that transaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">10. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              For questions about this Refund Policy or to request a refund, please contact us:
            </p>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-foreground mb-2">DeWayne's Credit Repair & Solutions</p>
              <p className="text-muted-foreground">2003 Linda Ln, Richardson, TX 75081</p>
              <p className="text-muted-foreground">Email: Darrellcunningham20@gmail.com</p>
              <p className="text-muted-foreground">Phone: (469) 877-2300</p>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
