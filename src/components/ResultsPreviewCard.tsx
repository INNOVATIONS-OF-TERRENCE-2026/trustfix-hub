import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import promo4Day from "@/assets/results/promo-4day.png";
import promoChex from "@/assets/results/promo-chexsystems.png";
import creditScore from "@/assets/results/credit-score-769.jpg";
import testimonial from "@/assets/results/client-testimonial.png";

export const ResultsPreviewCard = () => {
  const previewImages = [
    { src: promo4Day, alt: "4-Day Credit Removal Service" },
    { src: promoChex, alt: "24-Hour ChexSystems Removal" },
    { src: creditScore, alt: "Client Credit Score Result" },
    { src: testimonial, alt: "Client Testimonial" }
  ];

  return (
    <section className="py-16 bg-secondary/10">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            View Full Results Gallery
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            See real client transformations and verified results.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {previewImages.map((image, index) => (
              <div 
                key={index}
                className="aspect-square rounded-lg overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-shadow"
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
            <Link to="/results">
              View Full Gallery
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
