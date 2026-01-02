import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BedDouble, Bath, Car, Maximize, Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Import Assets
import property2 from "@/assets/Casa Aurora/Academia Casa Aurora.jpeg";
import property3 from "@/assets/Casa Aurora/Sála de estar Casa Aurora.jpeg";
import property4 from "@/assets/Casa Aurora/Área de lazer e picina Casa Aurora.jpeg";
import property5 from "@/assets/Casa Aurora/sauna Casa Aurora.jpeg";
import property6 from "@/assets/Casa Aurora/Foto 1 Prédio Casa Aurora.jpeg";
import video01 from "@/assets/Casa Aurora/video 01 Casa Aurora.mp4";
import videoElevadorIfood from "@/assets/Casa Aurora/video apartamento com elevador ifood Casa Aurora.mp4";
import videoComentado from "@/assets/Casa Aurora/video comentado Casa Aurora.mp4";
import ScheduleVisitForm from "@/components/ScheduleVisitForm";
import linaFoto01 from "@/assets/line/foto 01.jpeg";
import linaFoto02 from "@/assets/line/foto 02.jpeg";
import linaFoto03 from "@/assets/line/foto 03.jpeg";
import linaVideo03 from "@/assets/line/video 03.mp4";
import linaVideo04 from "@/assets/line/video 04.mp4";
import linaVideo05 from "@/assets/line/video 05.mp4";
import aysuImg1831 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.18 (1).jpeg";
import aysuImg1832 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.18 (2).jpeg";
import aysuImg1833 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.18 (3).jpeg";
import aysuImg1830 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.18.jpeg";
import aysuImg1931 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.19 (1).jpeg";
import aysuImg1932 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.19 (2).jpeg";
import aysuImg1930 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.19.jpeg";
import aysuImg2031 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.20 (1).jpeg";
import aysuImg2030 from "@/assets/aysú/WhatsApp Image 2025-12-27 at 14.38.20.jpeg";
import aysuVideo from "@/assets/aysú/WhatsApp Video 2025-12-27 at 14.38.17.mp4";

// Import New Component
import { PropertyCard, Property } from "@/components/PropertyCard";

const Properties = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  
  const galleryRef = useRef<HTMLDivElement>(null);
  const currentMediaSrc = selectedProperty?.images[currentImageIndex] ?? "";
  const isCurrentMediaVideo = currentMediaSrc.toLowerCase().endsWith(".mp4");

  // Consolidate Data
  const propertiesData = useMemo<Property[]>(() => [
    {
      images: [property6, property2, property4, property3, property5, video01, videoElevadorIfood, videoComentado],
      title: "Casa Aurora",
      location: "Setor Marista",
      type: "LANÇAMENTO",
      specs: { beds: "3-4", baths: "3-4", cars: "3", area: "208 - 281m²" },
      highlight: "OPORTUNIDADE PARA INVESTIDORES OU PARA O CONFORTO DA SUA FAMÍLIA",
      description: "Apartamento exclusivo com acabamento de primeira linha, ampla sala de estar com pé-direito duplo, cozinha gourmet integrada, varanda com churrasqueira e vista deslumbrante para a cidade. Localizado em uma das regiões mais nobres de Goiânia."
    },
    {
      images: [aysuImg1832, aysuImg1830, aysuImg1831, aysuImg1833, aysuImg1931, aysuImg1932, aysuImg1930, aysuImg2031, aysuImg2030, aysuVideo],
      title: "Fr. Aysú",
      location: "Setor Bueno",
      type: "",
      specs: { beds: "1-3", baths: "1-3", cars: "2", area: "67 - 217m²" },
      highlight: "ENTREGA BREVE",
      description: "Empreendimento moderno no Setor Bueno, unindo design biofílico e sofisticação. Apartamentos compactos de luxo e plantas espaçosas, ideal para quem busca rentabilidade ou moradia com qualidade de vida."
    },
    {
      images: [linaFoto01, linaFoto02, linaFoto03, linaVideo03, linaVideo04, linaVideo05],
      title: "Fr. Lina",
      location: "Praça do Sol",
      type: "",
      specs: { beds: "3", baths: "3", cars: "2", area: "121 - 256m²" },
      highlight: "JÁ ENTREGUE",
      description: "Localizado na charmosa Praça do Sol, o Fr. Lina oferece o equilíbrio perfeito entre a vida urbana e a tranquilidade. Plantas inteligentes e lazer completo no rooftop com vista panorâmica."
    }
  ], []);

  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  const openPropertyAtIndex = useCallback((property: Property, index: number) => {
    setSelectedProperty(property);
    setCurrentImageIndex(index);
    setImageLoading(true);
    setIsZoomed(false);
    setActiveTab("details");
    setLoadingProgress(0);
  }, []);

  const toggleZoom = () => {
    if (!isFullscreen) {
      setIsZoomed(!isZoomed);
    }
  };

  // Handle Loading Progress Simulation for Modal
  useEffect(() => {
    if (imageLoading) {
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [imageLoading]);

  return (
    <section id="imoveis" className="pt-4 pb-14 lg:pt-8 lg:pb-20 bg-background relative -mt-20 md:-mt-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left max-w-3xl mb-10">
          <span className="text-primary text-xs md:text-sm tracking-[0.3em] uppercase block mb-3">
            Portfólio Exclusivo
          </span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif mb-3">
            Imóveis{" "}
            <span className="text-gradient-gold">Selecionados</span>
          </h2>
          <p className="hidden md:block text-cream-muted text-lg font-light leading-relaxed">
            Uma seleção cuidadosa dos melhores empreendimentos de médio e alto padrão em Goiânia
          </p>
        </div>

        {/* Properties Grid - Replaced with New Card Component */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-4">
          {propertiesData.map((property, index) => (
            <PropertyCard 
              key={index} 
              property={property} 
              onOpen={openPropertyAtIndex} 
            />
          ))}
        </div>


      </div>

      {/* Property Detail Modal (Mantido com lógica simplificada) */}
      <Dialog open={!!selectedProperty} onOpenChange={() => setSelectedProperty(null)}>
        <DialogContent className="max-w-4xl bg-charcoal border-border p-0 overflow-hidden h-[90vh] md:h-auto flex flex-col md:block">
          {selectedProperty && (
            <>
              {/* Modal Content */}
              <div className="relative h-[40vh] md:h-[500px] w-full bg-black">
                 {imageLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-charcoal">
                    <Skeleton className="w-full h-full absolute inset-0 opacity-20" />
                    <div className="z-20 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div 
                  className={`w-full h-full flex items-center justify-center ${isCurrentMediaVideo ? "cursor-pointer" : "cursor-zoom-in"}`}
                  onClick={toggleZoom}
                >
                  {isCurrentMediaVideo ? (
                    <video
                      src={currentMediaSrc}
                      controls
                      className="h-auto max-h-[50%] w-auto max-w-[50%] object-contain"
                      onClick={(e) => e.stopPropagation()}
                      onLoadedData={() => setImageLoading(false)}
                    />
                  ) : (
                    <img
                      src={currentMediaSrc}
                      alt={selectedProperty.title}
                      className="w-full h-full object-contain object-center bg-black"
                      onLoad={() => setImageLoading(false)}
                    />
                  )}
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <DialogHeader>
                  <div className="flex items-center gap-2 text-primary text-sm uppercase tracking-wider mb-2">
                    <span className="font-bold">{selectedProperty.location}</span>
                  </div>
                  <DialogTitle className="text-3xl font-serif text-foreground mb-4">
                    {selectedProperty.title}
                  </DialogTitle>
                </DialogHeader>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-2">
                  <TabsList className="w-full grid grid-cols-2 bg-charcoal-800">
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                    <TabsTrigger value="schedule"><Calendar className="w-4 h-4 mr-2"/> Agendar Visita</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="mt-6 space-y-6">
                    <DialogDescription className="text-cream-muted text-base leading-relaxed">
                      {selectedProperty.description}
                    </DialogDescription>

                    <div className="grid grid-cols-4 gap-4 p-4 bg-charcoal-800 rounded-lg border border-white/5">
                      <div className="text-center">
                        <BedDouble className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-white">{selectedProperty.specs.beds}</div>
                        <div className="text-xs text-cream-muted uppercase">Quartos</div>
                      </div>
                      <div className="text-center">
                        <Bath className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-white">{selectedProperty.specs.baths}</div>
                        <div className="text-xs text-cream-muted uppercase">Banheiros</div>
                      </div>
                      <div className="text-center">
                        <Car className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-white">{selectedProperty.specs.cars}</div>
                        <div className="text-xs text-cream-muted uppercase">Vagas</div>
                      </div>
                      <div className="text-center">
                        <Maximize className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-white">{selectedProperty.specs.area}</div>
                        <div className="text-xs text-cream-muted uppercase">Área</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="schedule">
                    <div className="mt-4">
                      <ScheduleVisitForm
                        propertyTitle={selectedProperty.title}
                        propertyLocation={selectedProperty.location}
                        onSuccess={() => setActiveTab("details")}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      {/* Fullscreen Zoom Overlay */}
      {isZoomed && selectedProperty && (
        <div 
          className="fixed inset-0 z-[100] bg-black h-screen w-screen flex items-center justify-center animate-in fade-in duration-300"
          onClick={toggleZoom}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
            className="absolute top-4 right-4 z-[110] text-white p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
          >
            <X className="w-8 h-8" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center p-0 md:p-4">
            {isCurrentMediaVideo ? (
              <video
                src={currentMediaSrc}
                controls
                className="h-auto max-h-[70%] w-auto max-w-[70%] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={currentMediaSrc}
                alt={selectedProperty.title}
                className="w-full h-full object-contain object-center max-h-screen max-w-screen"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Properties;
