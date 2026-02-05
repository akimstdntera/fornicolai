import { useEffect, useState, useRef } from "react";

// Placeholder photos - replace these URLs with your actual couple photos
const photos = [
  { id: 1, caption: "Our first date 💕" },
  { id: 2, caption: "That special moment ✨" },
  { id: 3, caption: "Adventures together 🌸" },
  { id: 4, caption: "My favorite memory 💖" },
  { id: 5, caption: "Us being us 💗" },
  { id: 6, caption: "Forever & always 💞" },
];

// Duplicate for seamless loop
const allPhotos = [...photos, ...photos];

const FilmStrip = () => {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate photos appearing one by one
    photos.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePhotos((prev) => [...prev, index]);
      }, index * 300);
    });

    // Start rolling animation after all photos appear
    setTimeout(() => {
      setIsAnimating(true);
    }, photos.length * 300 + 500);
  }, []);

  return (
    <div className="w-full py-6">
      {/* Film strip header */}
      <div className="text-center mb-6">
        <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">
          Our Memories 🎬
        </h3>
        <p className="text-muted-foreground text-sm">
          A little film roll of us...
        </p>
      </div>

      {/* Film strip container */}
      <div className="relative overflow-hidden pb-4">
        <div
          ref={stripRef}
          className={`flex gap-6 px-4 ${isAnimating ? "animate-film-roll" : ""}`}
          style={{
            width: "fit-content",
          }}
        >
          {allPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className={`film-frame transition-all duration-500 ${
                visiblePhotos.includes(index % photos.length)
                  ? "opacity-100 transform translate-y-0 scale-100"
                  : "opacity-0 transform translate-y-8 scale-95"
              }`}
            >
              {/* Film frame */}
              <div className="relative bg-foreground/90 p-2 rounded-sm shadow-xl">
                {/* Film holes top */}
                <div className="absolute -top-1 left-0 right-0 flex justify-between px-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-background rounded-full"
                    />
                  ))}
                </div>

                {/* Photo area */}
                <div className="w-36 h-44 md:w-44 md:h-56 bg-secondary/20 rounded-sm overflow-hidden flex items-center justify-center relative group">
                  {/* Placeholder for photo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-valentine-soft via-valentine-blush to-valentine-medium opacity-60" />
                  <div className="relative z-10 text-center p-3">
                    <span className="text-4xl md:text-5xl mb-2 block">
                      {["💑", "💏", "🥰", "😍", "💕", "❤️"][index % photos.length]}
                    </span>
                    <p className="text-foreground/80 text-xs font-medium mt-2">
                      Add your photo here
                    </p>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Film holes bottom */}
                <div className="absolute -bottom-1 left-0 right-0 flex justify-between px-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-background rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Caption */}
              <p className="text-center text-muted-foreground text-sm mt-3 font-medium">
                {photo.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmStrip;