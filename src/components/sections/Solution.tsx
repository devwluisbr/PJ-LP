import { MapPin, Award, Home, Gem } from "lucide-react";

const Solution = () => {
  const highlights = [
    {
      icon: MapPin,
      title: "Localizações Nobres",
      description: "Setores Marista, Bueno, Oeste, Jardins e condomínios fechados de alto padrão",
    },
    {
      icon: Award,
      title: "Padrão Construtivo Superior",
      description: "Acabamentos premium, arquitetura contemporânea e tecnologia de ponta",
    },
    {
      icon: Home,
      title: "Mais que um Imóvel",
      description: "Um estilo de vida exclusivo e um ativo de valorização consistente",
    },
    {
      icon: Gem,
      title: "Curadoria Exclusiva",
      description: "Acesso a oportunidades antes mesmo de chegarem ao mercado",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
            A Solução Ideal
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Imóveis que Representam{" "}
            <span className="text-gradient-gold">Seu Patrimônio</span>
          </h2>
          <p className="text-cream-muted text-lg font-light leading-relaxed">
            Cada imóvel em nosso portfólio é criteriosamente selecionado para atender 
            às expectativas de quem busca excelência em todos os detalhes.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="group text-center p-8 relative"
            >
              {/* Decorative Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-primary to-transparent" />
              
              <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                <item.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-serif mb-3 text-foreground">
                {item.title}
              </h3>
              
              <p className="text-cream-muted font-light text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solution;
