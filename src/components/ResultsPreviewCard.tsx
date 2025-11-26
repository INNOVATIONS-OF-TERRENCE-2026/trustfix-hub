import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import creditScore658 from "@/assets/results/credit-score-658.jpg";
import creditScore714 from "@/assets/results/credit-score-714.png";
import creditScore681 from "@/assets/results/credit-score-681.jpg";
import creditScore741 from "@/assets/results/credit-score-741.jpg";
import creditScore723 from "@/assets/results/credit-score-723.jpg";
import creditScore769 from "@/assets/results/credit-score-769.jpg";

export const ResultsPreviewCard = () => {
  const previewImages = [
    { src: creditScore714, alt: "Client Experian Score 714 Good - Increased 228 Points" },
    { src: creditScore741, alt: "Client Experian Score 741 Very Good - Increased 173 Points" },
    { src: creditScore723, alt: "Client Experian Score 723 Good - Increased 158 Points" },
    { src: creditScore769, alt: "Client Experian Score 769 Very Good" },
  ];

  return (
    <section className="py-16 bg-secondary/10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            View Full Results Gallery
          </h2>
          <p className="text-lg text-muted-foreground mb-8">See real client transformations and verified results.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {previewImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[3/4] rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-elegant hover:scale-[1.02] transition-all duration-300"
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>

          <Button asChild size="lg" className="font-semibold">
            <Link to="/results">View Full Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
