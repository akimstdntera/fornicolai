import { useEffect, useState } from "react";

// Placeholder photos - replace these URLs with your actual couple photos
const photos = [
  { id: 1, caption: "Our first date 💕" },
  { id: 2, caption: "That special moment ✨" },
  { id: 3, caption: "Adventures together 🌸" },
  { id: 4, caption: "My favorite memory 💖" },
  { id: 5, caption: "Us being us 💗" },
  { id: 6, caption: "Forever & always 💞" },
];

const FilmStrip = () => {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);

  useEffect(() => {
    // Animate photos appearing one by one
    photos.forEach((_, index) => {
      setTimeout(() => {
        setVisiblePhotos((prev) => [...prev, index]);
      }, index * 300);
    });
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
      <div className="relative overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex gap-4 px-4 md:px-8 min-w-max md:justify-center">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`film-frame transition-all duration-500 ${
                visiblePhotos.includes(index)
                  ? "opacity-100 transform translate-y-0 scale-100"
                  : "opacity-0 transform translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
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
                      {["💑", "💏", "🥰", "😍", "💕", "❤️"][index]}
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

      {/* Scroll hint on mobile */}
      <p className="text-center text-muted-foreground/50 text-xs mt-2 md:hidden">
        ← Swipe to see more →
      </p>
    </div>
  );
};

export default FilmStrip;