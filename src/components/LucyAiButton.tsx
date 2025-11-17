import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { LucyAi } from "./LucyAi";

export const LucyAiButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full shadow-2xl shadow-accent/50 hover:shadow-accent/70 transition-all hover:scale-110"
        size="icon"
      >
        <Bot className="h-6 w-6" />
      </Button>
      
      <LucyAi isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
