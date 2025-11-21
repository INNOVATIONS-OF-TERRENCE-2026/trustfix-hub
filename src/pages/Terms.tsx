import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-4xl font-display font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using the services provided by DeWayne's Credit Repair & Solutions ("Company", "we", "us", or "our"), 
              you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">2. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. 
              Your continued use of our services after any changes constitutes acceptance of the new terms. We encourage you to review 
              these terms periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">3. Service Description</h2>
            <p className="text-muted-foreground mb-4">
              DeWayne's Credit Repair & Solutions provides credit repair and improvement services including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Credit report analysis and review</li>
              <li>Dispute letter preparation and submission</li>
              <li>Communication with credit bureaus</li>
              <li>Credit education and counseling</li>
              <li>ChexSystems removal services</li>
              <li>Removal of negative items from credit reports</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">4. User Responsibilities</h2>
            <p className="text-muted-foreground mb-4">As a user of our services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Provide accurate and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not misuse or abuse our services</li>
              <li>Upload only legitimate documents that you have the right to share</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">5. Payment Terms</h2>
            <p className="text-muted-foreground mb-4">
              Payment for services is required in advance unless otherwise agreed in writing. We accept various payment methods including 
              credit cards and buy-now-pay-later options through Affirm, Afterpay, and Klarna. All fees are non-refundable except as 
              specified in our Refund Policy or required by law.
            </p>
            <p className="text-muted-foreground">
              You authorize us to charge your payment method for all fees incurred. If a payment fails, we reserve the right to suspend 
              services until payment is received.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">6. Service Guarantees</h2>
            <p className="text-muted-foreground mb-4">
              We offer specific guarantees for our services, including our 4-Day Guarantee and 24-Hour ChexSystems removal. However:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Results are not guaranteed for every client due to varying circumstances</li>
              <li>Timeframes are estimates and may vary based on credit bureau response times</li>
              <li>Our guarantees are subject to the terms outlined in our Refund Policy</li>
              <li>We cannot guarantee specific credit score increases</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">7. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, trademarks, logos, and intellectual property on our website and in our services are owned by DeWayne's Credit 
              Repair & Solutions or our licensors. You may not use, copy, or distribute any of our intellectual property without prior 
              written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">8. Prohibited Activities</h2>
            <p className="text-muted-foreground mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Violate any laws or regulations</li>
              <li>Provide false or misleading information</li>
              <li>Interfere with or disrupt our services</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use our services for fraudulent purposes</li>
              <li>Share your account with others</li>
              <li>Reverse engineer or attempt to extract source code</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, DeWayne's Credit Repair & Solutions shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
              or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">10. Indemnification</h2>
            <p className="text-muted-foreground">
              You agree to indemnify and hold harmless DeWayne's Credit Repair & Solutions, its officers, directors, employees, and agents 
              from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of our services or 
              violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">11. Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend your access to our services at any time, without notice, for any reason, 
              including breach of these terms. Upon termination, your right to use our services will immediately cease.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms of Service shall be governed by and construed in accordance with the laws of the State of Texas, United States, 
              without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved in the courts 
              located in Dallas County, Texas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">13. Severability</h2>
            <p className="text-muted-foreground">
              If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to 
              the minimum extent necessary so that these Terms of Service will otherwise remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">14. Contact Information</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us:
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
