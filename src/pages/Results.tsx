import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import promo4Day from "@/assets/results/promo-4day.png";
import promoChex from "@/assets/results/promo-chexsystems.png";
import creditScore658 from "@/assets/results/credit-score-658.jpg";
import creditScore714 from "@/assets/results/credit-score-714.png";
import creditScore681 from "@/assets/results/credit-score-681.jpg";
import creditScore741 from "@/assets/results/credit-score-741.jpg";
import creditScore723 from "@/assets/results/credit-score-723.jpg";
import creditScore769 from "@/assets/results/credit-score-769.jpg";

export default function Results() {
  const results = [
    {
      image: creditScore714,
      alt: "Client Experian Score 714 Good - Credit Increased 228 Points",
    },
    {
      image: creditScore741,
      alt: "Client Experian Score 741 Very Good - Credit Increased 173 Points",
    },
    {
      image: creditScore723,
      alt: "Client Experian Score 723 Good - Credit Increased 158 Points",
    },
    {
      image: creditScore681,
      alt: "Client Experian Score 681 Good - Credit Increased 178 Points",
    },
    {
      image: creditScore658,
      alt: "Client Experian Score 658 Fair - Credit Increased 133 Points",
    },
    {
      image: creditScore769,
      alt: "Client Experian Score 769 Very Good - Verified Result",
    },
    {
      image: promo4Day,
      alt: "4-Day Credit Removal Service - Remove Collections, Evictions, Repossessions",
    },
    {
      image: promoChex,
      alt: "24-Hour ChexSystems Removal - Restore Bank Account Access",
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
                  className="glass-card border-accent/20 rounded-xl overflow-hidden hover:shadow-elegant hover:scale-[1.02] transition-all duration-300 group"
                >
                  <img
                    src={result.image}
                    alt={result.alt}
                    className="w-full h-auto object-cover max-h-[700px]"
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
