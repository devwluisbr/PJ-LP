import { Shield, Search, Users, TrendingUp } from "lucide-react";

const Problems = () => {
  const painPoints = [
    {
      icon: Search,
      pain: "Dificuldade em encontrar imóveis realmente exclusivos",
      solution: "Curadoria personalizada de empreendimentos premium",
    },
    {
      icon: Shield,
      pain: "Insegurança na escolha do investimento certo",
      solution: "Análise criteriosa de valorização e potencial",
    },
    {
      icon: Users,
      pain: "Atendimento genérico e despersonalizado",
      solution: "Consultoria dedicada e confidencial",
    },
    {
      icon: TrendingUp,
      pain: "Falta de orientação sobre o mercado de alto padrão",
      solution: "Expertise em localizações nobres de Goiânia",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
            Entendemos Suas Necessidades
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Sofisticação, Segurança e{" "}
            <span className="text-gradient-gold">Valorização</span>
          </h2>
          <p className="text-cream-muted text-lg font-light leading-relaxed">
            Compreendemos que a aquisição de um imóvel de alto padrão vai além da transação. 
            Trata-se de um investimento em qualidade de vida e patrimônio.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {painPoints.map((item, index) => (
            <div
              key={index}
              className="group p-8 bg-charcoal-light/50 border border-border hover:border-primary/50 transition-all duration-500 hover-gold-glow"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 flex items-center justify-center border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-cream-muted text-sm mb-2 line-through opacity-60">
                    {item.pain}
                  </p>
                  <p className="text-foreground font-medium">
                    {item.solution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problems;
