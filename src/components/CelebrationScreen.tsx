import { useEffect, useState } from "react";

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

  const emojis = ["💕", "💖", "💗", "💓", "💞", "💝", "🌹", "✨", "🎀", "💐"];

  useEffect(() => {
    const newConfetti: Confetti[] = [];
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 4,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }
    setConfetti(newConfetti);

    setTimeout(() => setShowMessage(true), 500);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
        className={`text-center z-10 px-4 transition-all duration-1000 ${
          showMessage
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-10"
        }`}
      >
        {/* Big heart */}
        <div className="animate-celebration mb-8">
          <span className="text-9xl md:text-[12rem] drop-shadow-2xl">💖</span>
        </div>

        {/* Message */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 font-bold">
          Yay! 🎉
        </h1>
        <h2 className="font-display text-2xl md:text-4xl lg:text-5xl text-primary mb-8 italic">
          You made me the happiest person!
        </h2>
        <p className="text-muted-foreground text-xl md:text-2xl max-w-lg mx-auto leading-relaxed">
          I knew you'd say yes! 💕
          <br />
          <span className="text-primary font-medium">
            Can't wait to spend Valentine's Day with you!
          </span>
        </p>

        {/* Floating hearts around the message */}
        <div className="absolute -z-10 inset-0 flex items-center justify-center">
          <div className="animate-float" style={{ animationDelay: "0s" }}>
            <span className="absolute -top-20 -left-20 text-5xl opacity-60">
              💗
            </span>
          </div>
          <div className="animate-float" style={{ animationDelay: "0.5s" }}>
            <span className="absolute -top-10 right-0 text-4xl opacity-50">
              💞
            </span>
          </div>
          <div className="animate-float" style={{ animationDelay: "1s" }}>
            <span className="absolute bottom-0 -left-10 text-6xl opacity-40">
              💓
            </span>
          </div>
          <div className="animate-float" style={{ animationDelay: "1.5s" }}>
            <span className="absolute -bottom-20 right-10 text-5xl opacity-50">
              💕
            </span>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 text-center">
        <p className="text-muted-foreground/60 text-sm">
          Made with 💖 just for you
        </p>
      </div>
    </div>
  );
};

export default CelebrationScreen;