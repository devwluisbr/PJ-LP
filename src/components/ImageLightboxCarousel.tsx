import { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ImageLightboxCarouselProps {
  images: string[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

const ImageLightboxCarousel = ({ images, open, onOpenChange, title }: ImageLightboxCarouselProps) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const apiRef = useRef<CarouselApi | null>(null);

  useEffect(() => {
    if (api) {
      apiRef.current = api;
    }
  }, [api]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-charcoal border-border p-0 overflow-hidden">
        <div className="relative">
          {title && (
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-lg font-serif text-foreground">{title}</h3>
            </div>
          )}
          <div className={cn("p-2")}>
            <Carousel setApi={setApi} opts={{ loop: true }}>
              <CarouselContent className="items-center">
                {images.map((src, index) => (
                  <CarouselItem key={index} className="basis-full">
                    {src.toLowerCase().endsWith(".mp4") ? (
                      <video
                        src={src}
                        controls
                        muted={false}
                        playsInline
                        preload="metadata"
                        className="w-full h-auto max-h-[70vh] object-contain bg-black"
                      />
                    ) : (
                      <img
                        src={src}
                        alt={title ? `${title} - ${index + 1}` : `Imagem ${index + 1}`}
                        className="w-full h-auto max-h-[70vh] object-contain bg-black"
                        loading="eager"
                        decoding="async"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center z-20">
                <ArrowLeft className="w-7 h-7 text-foreground" />
              </CarouselPrevious>
              <CarouselNext className="right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-primary hover:border-primary transition-all duration-300 flex items-center justify-center z-20">
                <ArrowRight className="w-7 h-7 text-foreground" />
              </CarouselNext>
            </Carousel>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightboxCarousel;
