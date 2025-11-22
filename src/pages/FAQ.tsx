import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "What documents do I need to upload?",
      answer: "You'll need to upload: Front & back of your Driver's License or State ID (must be in black & white), Social Security Card (photo is fine)."
    },
    {
      question: "How do I take good photos of my ID?",
      answer: "Lay your ID flat on a solid surface with good lighting. Avoid glare by adjusting your angle. Make sure the entire document is in frame without cropping any edges. Use the camera option in our Upload Documents section for best results."
    },
    {
      question: "When does the 4-day timer start?",
      answer: "The guarantee timer starts once we verify your payment and all required documents (ID, Social Security Card, and signed authorization) are uploaded and pass our verification process."
    },
    {
      question: "What happens if you miss the 4 days?",
      answer: "If we don't complete your case within 4 days, the Guarantee Triggered workflow opens automatically and a refund request is created. You'll be notified immediately via email and SMS, and your refund will be processed within 48 hours."
    },
    {
      question: "Do you store my Social Security Number?",
      answer: "We only store a masked version of your SSN (showing only the last 4 digits) and keep the full number in an encrypted file. We never display the full SSN in our user interface, and all documents are encrypted at rest with server-generated encryption keys."
    },
    {
      question: "How do I connect my credit bureau account?",
      answer: "For security reasons, we do not store external account credentials. You can use our secure connect screen or upload screenshots temporarily. Our support team will guide you through the process step-by-step."
    },
    {
      question: "What items can you remove from my credit report?",
      answer: "We can dispute and remove collections, evictions, repossessions, hard inquiries, late payments, charge-offs, bankruptcies, and other negative items if they're inaccurate, unverified, or improperly reported under FCRA guidelines."
    },
    {
      question: "Is my information secure?",
      answer: "Yes. We use bank-level encryption (256-bit SSL/TLS) for all data transmission and storage. All documents are encrypted at rest, and we never share your information with third parties except as required by law or for credit bureau disputes."
    },
    {
      question: "How does the refund process work?",
      answer: "If we don't meet our 4-day guarantee, a refund request is automatically created. Our admin team reviews and processes the refund within 48 hours. You'll receive confirmation via email once the refund is issued to your original payment method."
    },
    {
      question: "Can I track my case progress?",
      answer: "Yes! Once you're logged in, your Client Portal dashboard shows real-time case status, uploaded documents, messages from our team, and the guarantee timer countdown. You'll also receive email and SMS updates for major milestones."
    },
    {
      question: "Who built this platform?",
      answer: "This platform was engineered by Terrence Milliner Sr., leveraging cutting-edge security and automation technology to provide fast, reliable credit repair services."
    },
    {
      question: "What makes your service different?",
      answer: "Our 4-Day Guaranteed Results is unique in the industry. We combine FCRA-compliant dispute processes with automated workflows and encrypted document handling to deliver fast, secure, and reliable results—or your money back."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 gradient-green">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Everything you need to know about our services
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-20 bg-background">
          <div className="container max-w-4xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass-card border-accent/20 px-6 rounded-lg"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}