import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/Casa Aurora/hero-luxury.jpg";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[44vh] md:min-h-[48vh] lg:min-h-[52vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      >
        <img
          src={heroImage}
          alt="Imóvel de alto padrão em Goiânia"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-background/30" />
      </div>

      {/* Content with inverse parallax (moves slower) */}
      <div
        className="relative z-10 container mx-auto px-6 lg:px-8 text-center max-w-5xl -mt-16 md:-mt-24"
        style={{
          transform: `translateY(${scrollY * 0.15}px)`,
          opacity: Math.max(0, 1 - scrollY / 600),
        }}
      >
        {/* Authority Badge */}
        <div className="animate-fade-up mb-5" style={{ animationDelay: "0.1s" }}>
          <span className="inline-block text-primary font-sans text-sm tracking-[0.3em] uppercase border border-primary/40 px-6 py-2">
            Imóveis de Médio e Alto Padrão
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-up text-xl md:text-3xl lg:text-4xl font-serif font-medium leading-tight mb-5"
          style={{ animationDelay: "0.2s" }}
        >
          Invista em <span className="text-gradient-gold">Goiânia</span>, a cidade mais segura do Brasil, de forma personalizada, com confiança e agilidade.
        </h1>



        {/* Location Tag */}
        <p
          className="animate-fade-up text-sm text-primary tracking-widest uppercase mb-4"
          style={{ animationDelay: "0.4s" }}
        >
          Setor Marista e Bueno
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            variant="hero"
            size="xl"
            onClick={scrollToContact}
            data-track-cta="CTA Hero Oportunidade"
          >
            GOSTARIA DE OBTER MAIS INFORMAÇÕES
          </Button>
          <Button
            variant="elegant"
            size="xl"
            onClick={() => document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" })}
            data-track-cta="CTA Hero Portfólio"
          >
            Ver Mais Oportunidades Exclusivas
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
