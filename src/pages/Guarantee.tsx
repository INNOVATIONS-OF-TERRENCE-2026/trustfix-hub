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
            <h2 className="text-2xl font-display font-semibold mb-4">2. Refund Policy</h2>
            <p className="text-muted-foreground mb-4">
              Refunds are available only if DeWayne's Credit does not deliver results within the stated service timeline.
            </p>
            <p className="text-muted-foreground mb-4">
              For 4-Day Guaranteed Results services, refunds are evaluated if no progress has been made within 96 hours of receiving all required documents.
            </p>
            <p className="text-muted-foreground mb-4">
              Refunds are processed back to the original payment method within 3–5 business days.
            </p>
            <p className="text-muted-foreground mb-4">
              Clients who fail to provide required documentation are not eligible for refunds.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">Our Four Service Plans</h3>
            
            <div className="space-y-4 mt-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Basic Credit Removal (Up to 5 Items) – $500</h4>
                <p className="text-sm text-muted-foreground">
                  4-Day Guaranteed Results. Remove up to 5 negative items from your credit report.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Premium Credit Removal (Unlimited Items) – $750</h4>
                <p className="text-sm text-muted-foreground">
                  4-Day Guaranteed Results. Remove unlimited negative items with VIP 24/7 support.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">24-Hour ChexSystems Removal – $400</h4>
                <p className="text-sm text-muted-foreground">
                  Complete ChexSystems removal in 24 hours with money-back guarantee.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Credit Mentorship Add-On – $1,200</h4>
                <p className="text-sm text-muted-foreground">
                  Expert credit mentorship with personalized credit building plan and ongoing support for 6 months.
                </p>
              </div>
            </div>
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
