import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate dark:prose-invert">
          <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              DeWayne's Credit Repair & Solutions ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our services. Please read this policy 
              carefully to understand our practices regarding your personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-4">We collect several types of information to provide and improve our services:</p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Full name and contact information (email, phone, address)</li>
              <li>Social Security Number (encrypted and securely stored)</li>
              <li>Date of birth</li>
              <li>Government-issued identification documents</li>
              <li>Credit report information</li>
              <li>Financial account information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Usage data and analytics</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Providing credit repair and improvement services</li>
              <li>Communicating with credit bureaus on your behalf</li>
              <li>Sending service updates, newsletters, and marketing communications</li>
              <li>Processing payments and preventing fraud</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Responding to customer support inquiries</li>
              <li>Analyzing usage patterns to enhance user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-muted-foreground mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies 
              are files with small amounts of data that may include an anonymous unique identifier.
            </p>
            <p className="text-muted-foreground mb-4">Types of cookies we use:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong>Marketing Cookies:</strong> Track visitors across websites to display relevant advertisements</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not 
              accept cookies, you may not be able to use some portions of our service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-4">We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>With Credit Bureaus:</strong> To dispute inaccurate information on your behalf</li>
              <li><strong>With Service Providers:</strong> Third-party vendors who assist in providing our services</li>
              <li><strong>For Legal Compliance:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">6. Your Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong>Access:</strong> Request copies of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Restriction:</strong> Request restriction of processing your information</li>
              <li><strong>Portability:</strong> Request transfer of your information to another service</li>
              <li><strong>Objection:</strong> Object to our processing of your information</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us using the information provided at the end of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">7. Data Retention</h2>
            <p className="text-muted-foreground">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required or permitted by law. We will retain and use your information to comply with 
              legal obligations, resolve disputes, and enforce our agreements. After the retention period expires, we will securely 
              delete or anonymize your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">8. Data Security</h2>
            <p className="text-muted-foreground mb-4">
              We implement industry-standard security measures to protect your information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>256-bit AES encryption for sensitive data</li>
              <li>Secure Socket Layer (SSL) technology</li>
              <li>Regular security audits and assessments</li>
              <li>Restricted access to personal information</li>
              <li>Employee training on data protection</li>
              <li>Secure backup systems</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use 
              commercially acceptable means to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">9. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from 
              children. If you are a parent or guardian and believe your child has provided us with personal information, please contact 
              us immediately, and we will take steps to remove that information from our systems.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">10. Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these 
              external sites. We encourage you to read the privacy policies of any third-party sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">11. California Privacy Rights</h2>
            <p className="text-muted-foreground mb-4">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Right to know what personal information is collected</li>
              <li>Right to know if personal information is sold or disclosed</li>
              <li>Right to opt-out of the sale of personal information</li>
              <li>Right to deletion of personal information</li>
              <li>Right to non-discrimination for exercising CCPA rights</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy 
              on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any 
              changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-display font-semibold mb-4">13. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
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
