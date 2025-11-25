import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import promo4Day from "@/assets/results/promo-4day.png";
import promoChex from "@/assets/results/promo-chexsystems.png";
import creditScore from "@/assets/results/credit-score-769.jpg";

export default function Results() {
  const results = [
    {
      image: promo4Day,
      alt: "4-Day Credit Removal Service - Remove Collections, Evictions, Repossessions, Hard Inquiries",
    },
    {
      image: promoChex,
      alt: "24-Hour ChexSystems Removal - Get your bank account access back",
    },
    {
      image: creditScore,
      alt: "Client Experian Credit Score Result - 769 Very Good",
    },
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
                Client Results Gallery
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Real results from real clients. See how we've helped thousands improve their credit.
              </p>
            </div>
          </div>
        </section>

        {/* Results Gallery */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="glass-card border-accent/20 rounded-lg overflow-hidden hover:shadow-elegant transition-all duration-300"
                >
                  <img
                    src={result.image}
                    alt={result.alt}
                    className="w-full h-auto object-contain max-h-[600px]"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
