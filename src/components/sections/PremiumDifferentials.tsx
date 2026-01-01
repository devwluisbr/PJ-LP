import { Building2, Award, Users, Scale } from "lucide-react";

const PremiumDifferentials = () => {
  const differentials = [
    {
      icon: Building2,
      title: "Portfólio Exclusivo",
      description: "Acesso antecipado aos melhores imóveis de luxo antes mesmo de serem anunciados no mercado."
    },
    {
      icon: Award,
      title: "Experiência de Mercado",
      description: "Mais de 15 anos de experiência especializada em imóveis de alto padrão em Goiânia."
    },
    {
      icon: Users,
      title: "Rede de Contatos",
      description: "Conexões exclusivas com proprietários e investidores dos imóveis mais cobiçados."
    },
    {
      icon: Scale,
      title: "Negociação Inteligente",
      description: "Estratégias de negociação que garantem os melhores preços e condições para você."
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block text-primary font-sans text-sm tracking-[0.3em] uppercase border border-primary/40 px-6 py-2 mb-4">
            Diferenciais
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Por Que Somos{" "}
            <span className="text-gradient-gold">Diferentes</span>
          </h2>
          <p className="text-cream-muted text-lg font-light max-w-2xl mx-auto">
            A abordagem exclusiva de Adriana Chaves para a venda e compra de imóveis de luxo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((differential, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-charcoal rounded-full mb-6 group-hover:bg-gold/10 transition-colors">
                <differential.icon className="w-8 h-8 text-gold group-hover:text-gold-light transition-colors" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-4">
                {differential.title}
              </h3>
              <p className="text-cream-muted font-light">
                {differential.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-charcoal p-12 rounded-lg border border-border text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-6">
            Garantia de{" "}
            <span className="text-gradient-gold">Satisfação</span>
          </h3>
          <p className="text-cream-muted text-lg font-light max-w-3xl mx-auto mb-8">
            Nossa missão é superar as expectativas em cada negociação. 
            Se você não estiver 100% satisfeito com o processo, 
            faremos o que for necessário para resolver.
          </p>
          <div className="inline-flex items-center gap-8 text-cream-muted">
            <div>
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-sm">Taxa de Sucesso</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">250+</div>
              <div className="text-sm">Imóveis Vendidos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">15+</div>
              <div className="text-sm">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumDifferentials;