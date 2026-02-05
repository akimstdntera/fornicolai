import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import CelebrationScreen from "./CelebrationScreen";

const ValentineGame = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

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
    "Okay fine... jk! 😜",
    "Catch me if you can! 🏃‍♀️",
  ];

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoHover = () => {
    if (!containerRef.current) return;

    setIsRunning(true);

    const container = containerRef.current.getBoundingClientRect();
    const buttonWidth = 140;
    const buttonHeight = 50;

    // Get current position
    const currentX = noPosition.x || container.width / 2;
    const currentY = noPosition.y || 0;

    // Calculate random jump distance (more dramatic)
    const jumpX = (Math.random() - 0.5) * container.width * 0.8;
    const jumpY = (Math.random() - 0.5) * container.height * 0.6;

    // Calculate new position with bounds
    let newX = currentX + jumpX;
    let newY = currentY + jumpY;

    // Keep within bounds
    newX = Math.max(20, Math.min(newX, container.width - buttonWidth - 20));
    newY = Math.max(-100, Math.min(newY, container.height - buttonHeight + 50));

    setNoPosition({ x: newX, y: newY });
    setNoCount((prev) => prev + 1);

    // Reset running animation
    setTimeout(() => setIsRunning(false), 300);
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
      <div className="relative w-full max-w-lg h-48 flex items-center justify-center">
        {/* Yes Button */}
        <Button
          onClick={handleYesClick}
          className="bg-button-gradient text-primary-foreground font-bold text-xl md:text-2xl px-10 py-7 rounded-full shadow-xl animate-pulse-glow transition-all duration-300 hover:scale-110 z-20"
          style={{
            transform: `scale(${yesButtonSize})`,
          }}
        >
          Yes! 💖
        </Button>

        {/* No Button */}
        <Button
          ref={noButtonRef}
          variant="outline"
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          className={`absolute border-2 border-primary/40 text-muted-foreground font-medium px-6 py-3 rounded-full hover:bg-secondary/50 select-none cursor-pointer z-10 ${
            isRunning ? "scale-90" : "scale-100"
          }`}
          style={{
            position: noCount === 0 ? "relative" : "absolute",
            left: noCount === 0 ? undefined : `${noPosition.x}px`,
            top: noCount === 0 ? undefined : `${noPosition.y}px`,
            marginLeft: noCount === 0 ? "140px" : "0",
            transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            transform: isRunning ? "scale(0.85) rotate(-5deg)" : "scale(1) rotate(0deg)",
          }}
        >
          {getNoButtonText()}
        </Button>
      </div>

      {/* Hint text */}
      {noCount > 2 && (
        <p className="mt-12 text-muted-foreground text-sm animate-fade-in text-center">
          {noCount > 5
            ? "Give up already! The No button doesn't want to be clicked! 💕"
            : "The No button seems to be running away... maybe it's a sign? 😉"}
        </p>
      )}
    </div>
  );
};

export default ValentineGame;