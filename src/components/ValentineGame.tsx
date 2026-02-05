import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CelebrationScreen from "./CelebrationScreen";

const ValentineGame = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const yesButtonSize = Math.min(1 + noCount * 0.2, 2.5);

  const phrases = [
    "No 😢",
    "Are you sure? 🥺",
    "Really sure? 😭",
    "Please? 💔",
    "Pretty please? 🙏",
    "With a cherry on top? 🍒",
    "I'll be sad... 😿",
    "Think again! 💭",
    "Last chance! 💕",
    "You're breaking my heart! 💔",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoHover = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 120;
    const buttonHeight = 48;
    
    const maxX = container.width - buttonWidth - 20;
    const maxY = container.height - buttonHeight - 20;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoPosition({ x: newX, y: newY });
    setNoCount((prev) => prev + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  if (yesPressed) {
    return <CelebrationScreen />;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Main Heart */}
      <div className="animate-heartbeat mb-8">
        <span className="text-8xl md:text-9xl drop-shadow-lg">💖</span>
      </div>

      {/* Question */}
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-center mb-4 text-foreground tracking-tight">
        Will you be my
      </h1>
      <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-center mb-12 text-primary font-bold italic">
        Valentine?
      </h2>

      {/* Subtitle */}
      <p className="text-muted-foreground text-lg md:text-xl mb-10 text-center max-w-md">
        I've been waiting to ask you this... 💕
      </p>

      {/* Buttons Container */}
      <div className="relative w-full max-w-md h-32 flex items-center justify-center">
        {/* Yes Button */}
        <Button
          onClick={handleYesClick}
          className="bg-button-gradient text-primary-foreground font-bold text-xl md:text-2xl px-8 py-6 rounded-full shadow-lg animate-pulse-glow transition-all duration-300 hover:scale-110 z-10"
          style={{
            transform: `scale(${yesButtonSize})`,
          }}
        >
          Yes! 💝
        </Button>

        {/* No Button */}
        <Button
          variant="outline"
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          className={`absolute border-2 border-primary/30 text-muted-foreground font-medium px-6 py-3 rounded-full transition-all duration-200 hover:bg-transparent ${
            noCount > 0 ? "animate-wiggle" : ""
          }`}
          style={{
            left: noCount === 0 ? "auto" : `${noPosition.x}px`,
            top: noCount === 0 ? "auto" : `${noPosition.y}px`,
            marginLeft: noCount === 0 ? "120px" : "0",
          }}
        >
          {getNoButtonText()}
        </Button>
      </div>

      {/* Hint text */}
      {noCount > 2 && (
        <p className="mt-8 text-muted-foreground text-sm animate-fade-in">
          The No button seems to be running away... maybe it's a sign? 😉
        </p>
      )}
    </div>
  );
};

export default ValentineGame;