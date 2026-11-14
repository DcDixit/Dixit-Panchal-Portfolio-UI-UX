import { useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";

interface ImageGalleryLightboxProps {
  images: string[];
  index: number | null;
  onIndexChange: (next: number | null) => void;
  /** Used for screen readers / fallback alt text */
  label?: string;
}

export function ImageGalleryLightbox({
  images,
  index,
  onIndexChange,
  label = "Design work",
}: ImageGalleryLightboxProps) {
  const open = index !== null && images.length > 0;
  const safeIndex = index ?? 0;
  const src = images[safeIndex];

  const close = useCallback(() => onIndexChange(null), [onIndexChange]);

  const showPrev = useCallback(() => {
    if (index === null || images.length < 2) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [images.length, index, onIndexChange]);

  const showNext = useCallback(() => {
    if (index === null || images.length < 2) return;
    onIndexChange((index + 1) % images.length);
  }, [images.length, index, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, showPrev, showNext]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && close()}>
      <DialogContent className="max-h-[92vh] w-[min(96vw,1120px)] max-w-[calc(100vw-1.5rem)] translate-x-[-50%] translate-y-[-50%] gap-0 overflow-hidden border border-white/10 bg-[#0a0a0a] p-0 pr-10 pt-10 shadow-2xl sm:max-w-[calc(100vw-2rem)]">
        <div className="relative flex max-h-[85vh] items-center justify-center bg-black">
          {src ? (
            <img
              src={src}
              alt={`${label} — frame ${safeIndex + 1} of ${images.length}`}
              className="max-h-[85vh] w-full object-contain"
            />
          ) : null}

          {images.length > 1 ? (
            <>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 h-11 w-11 -translate-y-1/2 rounded-full border border-white/15 bg-black/50 text-white hover:bg-black/70"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          ) : null}

          <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 text-xs text-white/85 backdrop-blur-sm">
            {safeIndex + 1} / {images.length}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
