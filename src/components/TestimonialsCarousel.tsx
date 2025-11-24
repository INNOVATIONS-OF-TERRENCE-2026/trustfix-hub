import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Dallas, TX",
    text: "DwaynesCredit.com saved my financial future. I was able to get approved for my dream home!",
    rating: 5
  },
  {
    name: "James T.",
    location: "Houston, TX",
    text: "Professional, fast, and results-driven. Removed 7 negative items in just 4 days!",
    rating: 5
  },
  {
    name: "Maria L.",
    location: "Austin, TX",
    text: "The 4-Day Guaranteed Results is real. Best credit repair service I've ever used!",
    rating: 5
  },
  {
    name: "Robert K.",
    location: "San Antonio, TX",
    text: "They helped me raise my credit score by 120 points. Now I can finally get a car loan!",
    rating: 5
  },
  {
    name: "Jennifer W.",
    location: "Fort Worth, TX",
    text: "Incredible service! My ChexSystems was removed in less than 24 hours. Highly recommended!",
    rating: 5
  },
  {
    name: "Michael P.",
    location: "El Paso, TX",
    text: "After working with them, I was able to open a new bank account. Life-changing experience!",
    rating: 5
  },
  {
    name: "Lisa H.",
    location: "Arlington, TX",
    text: "Professional team that actually delivers on their promises. My score went from 580 to 720!",
    rating: 5
  },
  {
    name: "David R.",
    location: "Plano, TX",
    text: "Best investment I ever made. They removed old collections that were holding me back for years.",
    rating: 5
  },
  {
    name: "Patricia G.",
    location: "Corpus Christi, TX",
    text: "Fast, efficient, and effective. I can now qualify for better interest rates on everything!",
    rating: 5
  },
  {
    name: "Christopher B.",
    location: "Lubbock, TX",
    text: "DwaynesCredit.com is the real deal. They removed my eviction and I got approved for an apartment!",
    rating: 5
  }
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(testimonials.length - 2, 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div 
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full md:w-1/3 flex-shrink-0 px-3">
            <Card className="glass-card border-accent/20 h-full">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-foreground mb-4 min-h-[80px]">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-accent">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
