import FloatingHearts from "@/components/FloatingHearts";
import ValentineGame from "@/components/ValentineGame";

const Index = () => {
  return (
    <div className="min-h-screen bg-valentine-gradient overflow-hidden">
      <FloatingHearts />
      <main className="relative z-10 min-h-screen flex items-center justify-center py-12">
        <ValentineGame />
      </main>
    </div>
  );
};

export default Index;
