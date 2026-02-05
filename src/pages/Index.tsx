import FloatingHearts from "@/components/FloatingHearts";
import BackgroundMusic from "@/components/BackgroundMusic";
import ValentineGame from "@/components/ValentineGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-valentine-gradient overflow-hidden">
      <FloatingHearts />
      <BackgroundMusic label="Play Gracie" />
      <main className="relative z-10 min-h-screen flex items-center justify-center py-12">
        <ValentineGame />
      </main>
    </div>
  );
};

export default Index;
