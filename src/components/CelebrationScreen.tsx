import { useEffect, useState } from "react";
import FilmStrip from "./FilmStrip";

interface Confetti {
  id: number;
  left: number;
  delay: number;
  duration: number;
  emoji: string;
}

const CelebrationScreen = () => {
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [showFilm, setShowFilm] = useState(false);

  const emojis = ["💕", "💖", "💗", "💓", "💞", "💝", "🌹", "✨", "🎀", "💐"];

  useEffect(() => {
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 40; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 5,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }
    setConfetti(newConfetti);

    setTimeout(() => setShowMessage(true), 400);
    setTimeout(() => setShowFilm(true), 1000);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-x-hidden overflow-y-auto py-8">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {confetti.map((item) => (
          <div
            key={item.id}
            className="absolute animate-fall"
            style={{
              left: `${item.left}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`,
              fontSize: "24px",
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div
        className={`text-center z-10 px-4 transition-all duration-700 ${
          showMessage
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-10"
        }`}
      >
        {/* Big heart */}
        <div className="animate-celebration mb-4">
          <span className="text-7xl md:text-8xl drop-shadow-2xl">💖</span>
        </div>

        {/* Message */}
        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-foreground mb-3 font-bold">
          BANG!! 
        </h1>
        <h2 className="font-display text-xl md:text-3xl lg:text-4xl text-primary mb-4 italic">
          YARI KA SAKIN SA 14!!
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto leading-relaxed mb-6">
          Mag ready kana nicolai..
        </p>
      </div>

      {/* Film Strip */}
      <div
        className={`w-full z-10 transition-all duration-1000 ${
          showFilm
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-20"
        }`}
      >
        <FilmStrip />
      </div>

      {/* Bottom message */}
      <div
        className={`text-center z-10 mt-8 px-4 transition-all duration-700 delay-500 ${
          showFilm ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-primary font-display text-xl md:text-2xl italic">
         To more chicken this year!!
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="mt-auto pt-8 text-center">
        <p className="text-muted-foreground/60 text-sm">
          Made for you baby! love u
        </p>
      </div>
    </div>
  );
};

export default CelebrationScreen;