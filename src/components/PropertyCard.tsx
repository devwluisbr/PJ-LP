import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Play, Maximize, BedDouble, Bath, Car, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { safeMediaSrc } from "@/lib/utils";

export interface Property {
  images: string[];
  title: string;
  location: string;
  type: string;
  specs: { beds: number | string; baths: number | string; cars: number | string; area: string };
  highlight: string;
  description: string;
}

interface PropertyCardProps {
  property: Property;
  onOpen: (property: Property, index: number) => void;
}

export function PropertyCard({ property, onOpen }: PropertyCardProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const isVideo = (src: string) => src.toLowerCase().endsWith(".mp4");

  return (
    <div className="group relative h-[500px] w-full overflow-hidden rounded-xl bg-charcoal border border-white/10 shadow-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-primary/10 hover:-translate-y-1">
      {/* Carousel */}
      <Carousel setApi={setApi} className="h-full w-full">
        <CarouselContent className="h-full ml-0">
          {property.images.map((src, i) => (
            <CarouselItem key={i} className="h-full pl-0 relative basis-full">
               <div 
                className="h-full w-full cursor-pointer"
                onClick={() => onOpen(property, i)}
               >
                  {isVideo(src) ? (
                    <div className="relative h-full w-full bg-black flex items-center justify-center">
                       <video
                          src={safeMediaSrc(src)}
                          className="h-auto max-h-[96%] w-auto max-w-[96%] object-contain pointer-events-none"
                          muted
                          playsInline
                          preload="auto"
                          onError={() => { /* ignore errors in dev */ }}
                        />
                         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <button 
                              className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white px-6 py-2 rounded-full font-medium text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-3 pointer-events-auto"
                              onClick={(e) => { e.stopPropagation(); onOpen(property, i); }}
                            >
                               <Play className="h-4 w-4 text-white fill-white" />
                               Ver Detalhes
                            </button>
                          </div>
                    </div>
                  ) : (
                    <img
                      src={safeMediaSrc(src)}
                      alt={property.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={() => { /* ignore errors in dev */ }}
                    />
                  )}
               </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation - Only visible on hover */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-30">
           <Button
             variant="ghost"
             size="icon"
             className="h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 pointer-events-auto"
             onClick={(e) => { e.stopPropagation(); api?.scrollPrev(); }}
           >
             <ChevronLeft className="h-6 w-6" />
           </Button>
           <Button
             variant="ghost"
             size="icon"
             className="h-10 w-10 rounded-full bg-black/40 text-white backdrop-blur-sm hover:bg-black/60 pointer-events-auto"
             onClick={(e) => { e.stopPropagation(); api?.scrollNext(); }}
           >
             <ChevronRight className="h-6 w-6" />
           </Button>
        </div>
      </Carousel>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none z-10" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 items-start">
         {property.highlight && (
           <span className="inline-block bg-primary text-primary-foreground text-[8px] sm:text-[10px] tracking-wider uppercase px-3 py-1.5 font-bold shadow-lg rounded-sm max-w-[90%] leading-tight text-left">
             {property.highlight}
           </span>
         )}
         {property.type && (
           <span className="inline-block bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs tracking-wider uppercase px-3 py-1 font-medium rounded-sm">
              {property.type}
           </span>
         )}
      </div>
      
       {/* Image Counter */}
       <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-md px-3 py-1 text-xs font-medium text-white border border-white/10 rounded-full">
          {current} / {count}
       </div>

      {/* Content (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8">
        <div className="mb-6 transform transition-all duration-500 group-hover:-translate-y-2">
          <div className="flex items-center gap-2 text-primary mb-2">
            <MapPin className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">{property.location}</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2 leading-tight drop-shadow-lg">
            {property.title}
          </h3>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-4 gap-2 border-t border-white/10 pt-4 text-white/90">
           <div className="flex flex-col gap-1 items-center text-center">
              <BedDouble className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">{property.specs.beds}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-70">Quartos</span>
           </div>
           <div className="flex flex-col gap-1 items-center text-center">
              <Bath className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">{property.specs.baths}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-70">Banheiros</span>
           </div>
            <div className="flex flex-col gap-1 items-center text-center">
              <Car className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">{property.specs.cars}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-70">Vagas</span>
           </div>
           <div className="flex flex-col gap-1 items-center text-center">
              <Maximize className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">{property.specs.area}</span>
              <span className="text-[10px] uppercase tracking-wider opacity-70">Área</span>
           </div>
        </div>
      </div>
    </div>
  );
}
