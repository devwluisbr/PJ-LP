import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ImageLightboxCarousel from "@/components/ImageLightboxCarousel";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MapPin, Bed, Bath, Square, Camera } from "lucide-react";
import imgAcademia from "@/assets/Casa Aurora/Academia Casa Aurora.jpeg";
import imgAreaLazerPiscina from "@/assets/Casa Aurora/Área de lazer e picina Casa Aurora.jpeg";
import imgFotoPredio1 from "@/assets/Casa Aurora/Foto 1 Prédio Casa Aurora.jpeg";
import imgSalaEstar from "@/assets/Casa Aurora/Sála de estar Casa Aurora.jpeg";
import imgSauna from "@/assets/Casa Aurora/sauna Casa Aurora.jpeg";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  type: string;
  featured: boolean;
  images: string[];
}

const PropertiesShowcase = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  useEffect(() => {
    // Simulando carregamento de dados de imóveis
    setTimeout(() => {
      const mockProperties: Property[] = [
        {
          id: 1,
          title: "Apartamento de Luxo com Vista Panorâmica",
          location: "Setor Marista, Goiânia",
          price: "R$ 1.850.000",
          bedrooms: 3,
          bathrooms: 4,
          area: "180 m²",
          type: "Apartamento",
          featured: true,
          images: [imgFotoPredio1, imgAcademia, imgAreaLazerPiscina, imgSalaEstar, imgSauna]
        },
        {
          id: 2,
          title: "Cobertura Duplex com Piscina Privativa",
          location: "Jardins, Goiânia",
          price: "R$ 2.450.000",
          bedrooms: 4,
          bathrooms: 5,
          area: "280 m²",
          type: "Cobertura",
          featured: true,
          images: [imgAcademia, imgAreaLazerPiscina, imgSalaEstar]
        },
        {
          id: 3,
          title: "Casa de Alto Padrão em Condomínio Fechado",
          location: "Alphaville, Goiânia",
          price: "R$ 3.200.000",
          bedrooms: 5,
          bathrooms: 6,
          area: "450 m²",
          type: "Casa",
          featured: true,
          images: [imgSalaEstar, imgFotoPredio1, imgSauna]
        },
        {
          id: 4,
          title: "Flat de Luxo com Serviços",
          location: "Bueno, Goiânia",
          price: "R$ 950.000",
          bedrooms: 2,
          bathrooms: 2,
          area: "120 m²",
          type: "Flat",
          featured: false,
          images: [imgSauna]
        }
      ];
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <section className="py-24 lg:py-32 bg-charcoal">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block text-primary font-sans text-sm tracking-[0.3em] uppercase border border-primary/40 px-6 py-2 mb-4">
              Imóveis em Destaque
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
              Conheça Nossos{" "}
              <span className="text-gradient-gold">Imóveis Exclusivos</span>
            </h2>
            <p className="text-cream-muted text-lg font-light max-w-2xl mx-auto">
              Os melhores imóveis de luxo disponíveis no mercado goiano.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-background border border-border rounded-lg p-6 animate-pulse">
                <div className="bg-gray-700 rounded-lg h-48 mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block text-primary font-sans text-sm tracking-[0.3em] uppercase border border-primary/40 px-6 py-2 mb-4">
            Imóveis em Destaque
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Conheça os Imóveis Exclusivos de{" "}
            <span className="text-gradient-gold">Adriana Chaves</span>
          </h2>
          <p className="text-cream-muted text-lg font-light max-w-2xl mx-auto">
            Os melhores imóveis de luxo selecionados por Adriana Chaves no mercado goiano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="bg-background border-border overflow-hidden hover-gold-glow transition-all duration-300">
              <div className="relative">
                {property.images && property.images.length > 0 ? (
                  property.images[0].toLowerCase().endsWith(".mp4") ? (
                    <video
                      src={property.images[0]}
                      className="w-full h-48 object-contain bg-black"
                      controls
                      muted={false}
                      playsInline
                      preload="metadata"
                      onClick={() => {
                        setLightboxTitle(property.title);
                        setLightboxImages(property.images);
                        setLightboxOpen(true);
                      }}
                    />
                  ) : (
                    <img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-48 object-contain bg-black"
                      loading="lazy"
                      decoding="async"
                      onClick={() => {
                        setLightboxTitle(property.title);
                        setLightboxImages(property.images);
                        setLightboxOpen(true);
                      }}
                    />
                  )
                ) : (
                  <div className="bg-gray-800 w-full h-48 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-gray-600" />
                  </div>
                )}
                {property.featured && (
                  <div className="absolute top-4 left-4 bg-gold text-background px-3 py-1 rounded-full text-sm font-medium">
                    Destaque
                  </div>
                )}
                <button className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-serif text-foreground mb-2 line-clamp-2">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-cream-muted mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-4">
                    {property.price}
                  </div>
                </div>
                
                <div className="flex justify-between text-sm text-cream-muted mb-6">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span>{property.location.includes("Setor Marista") ? "3-4 Quartos" : property.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span>{property.location.includes("Setor Marista") ? "2 Suítes" : property.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span>{property.location.includes("Setor Marista") ? "208 - 281m²" : property.area}</span>
                  </div>
                </div>
                
                <Button 
                  variant="gold" 
                  className="w-full"
                  onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
                  data-track-cta="CTA Card Agendar Visita"
                >
                  Agendar Visita
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="gold" size="xl" onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })} data-track-cta="CTA Ver Todos">
            Receber Lista VIP de Imóveis
          </Button>
        </div>
      </div>
      <ImageLightboxCarousel
        images={lightboxImages}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
        title={lightboxTitle}
      />
    </section>
  );
};

export default PropertiesShowcase;
