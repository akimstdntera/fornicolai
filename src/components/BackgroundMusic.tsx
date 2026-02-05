import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Music, Pause, X } from "lucide-react";

type BackgroundMusicProps = {
  /** YouTube video id (the part after v=) */
  videoId?: string;
  label?: string;
};

const BackgroundMusic = ({
  videoId = "puR_jL6Tbf8",
  label = "Play song",
}: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const embedUrl = useMemo(() => {
    const params = new URLSearchParams({
      autoplay: "1",
      playsinline: "1",
      rel: "0",
      modestbranding: "1",
    });

    return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
  }, [videoId]);

  const handlePlay = () => {
    // Autoplay generally requires a user gesture — this click counts.
    setIsOpen(true);
    setIsPlaying(true);
    setIframeKey((k) => k + 1);
  };

  const handlePause = () => {
    // Without the YouTube IFrame API, the most reliable “pause” is removing the iframe.
    setIsPlaying(false);
    setIframeKey((k) => k + 1);
  };

  const handleClose = () => {
    setIsPlaying(false);
    setIsOpen(false);
    setIframeKey((k) => k + 1);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      <div className="flex items-center gap-2">
        {!isPlaying ? (
          <Button
            onClick={handlePlay}
            className="bg-button-gradient text-primary-foreground shadow-xl"
          >
            <Music className="mr-2 h-4 w-4" />
            {label}
          </Button>
        ) : (
          <Button
            onClick={handlePause}
            variant="secondary"
            className="shadow-xl"
          >
            <Pause className="mr-2 h-4 w-4" />
            Pause
          </Button>
        )}

        {isOpen && (
          <Button
            onClick={handleClose}
            variant="outline"
            className="bg-background/70 backdrop-blur"
            aria-label="Close music player"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && isPlaying && (
        <div className="w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-primary/15 bg-background/80 shadow-2xl backdrop-blur">
          <div className="px-3 py-2 text-xs text-muted-foreground">
            Audio via YouTube
          </div>
          <div className="aspect-video w-full">
            <iframe
              key={iframeKey}
              className="h-full w-full"
              src={embedUrl}
              title="Background music"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundMusic;
