import { useEffect, useState, useRef } from "react";

// Placeholder photos - replace these URLs with your actual couple photos
const photos = [
  // Option A (recommended): put files in /public/photos and use paths like "/photos/01.jpg"
  // Option B: use any full URL (https://...) if you host images elsewhere
  { id: 1, caption: "First Photobooth", src: "/photos/01.jpg" },
  { id: 2, caption: "First Monthsary", src: "/photos/02.jpg" },
  { id: 3, caption: "First Valentines", src: "/photos/03.jpg" },
  { id: 4, caption: "My Birthday", src: "/photos/04.jpg" },
  { id: 5, caption: "Your Birthday", src: "/photos/05.jpg" },
  { id: 6, caption: "Laguna", src: "/photos/06.jpg" },
  { id: 7, caption: "UPLB date", src: "/photos/07.jpg" },
  { id: 8, caption: "Fave Digi Pic", src: "/photos/08.jpg" },
  { id: 9, caption: "Movie Night", src: "/photos/09.jpg" },
  { id: 10, caption: "Look like a Happy Married Couple", src: "/photos/10.jpg" },
  { id: 11, caption: "Chickchicken all time fave", src: "/photos/11.jpg" },
  { id: 12, caption: "Night dates", src: "/photos/12.jpg" },
  { id: 13, caption: "Pretty AF!", src: "/photos/13.jpg" },
  { id: 14, caption: "Fave Pic", src: "/photos/14.jpg" },
  { id: 15, caption: "First Pride Walk", src: "/photos/15.jpg" },
  { id: 16, caption: "Random Trips", src: "/photos/16.jpg" },
  { id: 17, caption: "Holloween", src: "/photos/17.jpg" },
  { id: 18, caption: "First long trip", src: "/photos/18.jpg" },
    { id: 19, caption: "Latest Date", src: "/photos/19.jpg" },
  { id: 20, caption: "Latest Photobooth", src: "/photos/20.jpg" },
];

// Duplicate for seamless loop
const allPhotos = [...photos, ...photos];

const FilmStrip = () => {
  const [visiblePhotos, setVisiblePhotos] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  const sprocketCount = 7;

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
          Our Story in Photos
        </h3>
        <p className="text-muted-foreground text-sm">
          A little film roll of us...
        </p>
      </div>

      {/* Film strip container */}
      <div className="relative overflow-hidden pb-4">
        {/* Edge vignette */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent" />

        <div
          ref={stripRef}
          className={`flex items-start gap-4 px-4 ${isAnimating ? "animate-film-roll" : ""}`}
          style={{
            width: "fit-content",
          }}
        >
          {allPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className={`flex shrink-0 flex-col items-center w-[10.75rem] md:w-[12.75rem] transition-all duration-500 ${
                visiblePhotos.includes(index % photos.length)
                  ? "opacity-100 transform translate-y-0 scale-100"
                  : "opacity-0 transform translate-y-8 scale-95"
              }`}
            >
              {/* Film cell */}
              <div className="relative w-full shrink-0 overflow-hidden film-grain film-pink-stock rounded-lg shadow-2xl ring-1 ring-primary/20 border border-white/10">
                {/* Film edge shine */}
                <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-white/18 via-transparent to-black/35" />

                {/* Side rails */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-[6px] rounded-l-lg bg-gradient-to-b from-white/15 via-white/5 to-black/35" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[6px] rounded-r-lg bg-gradient-to-b from-white/15 via-white/5 to-black/35" />

                {/* Sprocket holes (top) */}
                <div
                  aria-hidden="true"
                  className="absolute top-2 left-4 right-4 grid grid-cols-7 place-items-center gap-2 relative"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-sm bg-black/25 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
                  {Array.from({ length: sprocketCount }).map((_, i) => (
                    <div
                      key={i}
                      className="relative z-10 h-[10px] w-[14px] rounded-[3px] bg-background shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35),inset_0_6px_10px_rgba(0,0,0,0.35)]"
                    />
                  ))}
                </div>

                {/* Inner frame */}
                <div className="relative p-3 pt-7 pb-7">
                  <div className="pointer-events-none absolute inset-x-3 top-4 h-px bg-white/10" />
                  <div className="pointer-events-none absolute inset-x-3 bottom-4 h-px bg-white/10" />

                  {/* Photo area */}
                  <div className="w-36 h-44 md:w-44 md:h-56 bg-black/25 rounded-sm overflow-hidden flex items-center justify-center relative group ring-1 ring-white/12 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.55)]">
                    {/* Photo (if provided) */}
                    {photo.src ? (
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover saturate-[1.02] contrast-[1.08]"
                      />
                    ) : (
                      <div className="relative z-10 text-center p-3">
                        <span className="text-4xl md:text-5xl mb-2 block">
                          {["💑", "💏", "🥰", "😍", "💕", "❤️"][index % photos.length]}
                        </span>
                        <p className="text-foreground/80 text-xs font-medium mt-2">
                          Add your photo here
                        </p>
                      </div>
                    )}

                    {/* Soft tint so photos match the theme */}
                    <div className="absolute inset-0 bg-gradient-to-br from-valentine-soft via-valentine-rose to-valentine-deep opacity-20 mix-blend-overlay" />

                    {/* Film dust/scratches */}
                    <div className="pointer-events-none absolute inset-0 film-scratches film-scratches-pink opacity-65" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Tiny edge markings */}
                  <div className="mt-2 flex items-center justify-between text-[10px] tracking-[0.22em] text-white/70 select-none font-mono">
                    <span>PINK 400</span>
                    <span>#{String(photo.id).padStart(2, "0")}</span>
                  </div>
                </div>

                {/* Sprocket holes (bottom) */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-2 left-4 right-4 grid grid-cols-7 place-items-center gap-2 relative"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-sm bg-black/25 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
                  {Array.from({ length: sprocketCount }).map((_, i) => (
                    <div
                      key={i}
                      className="relative z-10 h-[10px] w-[14px] rounded-[3px] bg-background shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35),inset_0_6px_10px_rgba(0,0,0,0.35)]"
                    />
                  ))}
                </div>
              </div>

              {/* Caption */}
              <p className="mt-3 h-8 w-full overflow-hidden text-center text-muted-foreground text-xs font-medium leading-4 tracking-wide uppercase">
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