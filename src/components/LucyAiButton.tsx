import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LucyAi } from "./LucyAi";
import lucyLogo from "@/assets/lucy-logo.png";

export const LucyAiButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-110 p-0 overflow-hidden"
        size="icon"
      >
        <img 
          src={lucyLogo} 
          alt="Lucy AI Assistant" 
          className="w-full h-full object-cover"
        />
      </Button>
      
      <LucyAi isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
