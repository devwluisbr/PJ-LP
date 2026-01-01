import { Check } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      title: "Exclusividade e Privacidade",
      description: "Imóveis selecionados em localizações que garantem discrição e sofisticação",
    },
    {
      title: "Alto Potencial de Valorização",
      description: "Análise criteriosa de mercado para investimentos com retorno consistente",
    },
    {
      title: "Padrão Construtivo Superior",
      description: "Empreendimentos das melhores construtoras com acabamentos premium",
    },
    {
      title: "Infraestrutura Completa",
      description: "Lazer, segurança e conveniências que elevam a qualidade de vida",
    },
    {
      title: "Segurança e Conforto",
      description: "Sistemas de segurança de última geração e automação residencial",
    },
    {
      title: "Ideal para Morar ou Investir",
      description: "Portfólio versátil que atende tanto moradia quanto investimento",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
              Por que Escolher
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">
              Benefícios de Investir em{" "}
              <span className="text-gradient-gold">Médio e Alto Padrão</span>
            </h2>
            <p className="text-cream-muted text-lg font-light leading-relaxed mb-8">
              Cada imóvel de alto padrão representa não apenas um espaço para viver, 
              mas um patrimônio que se valoriza e proporciona experiências únicas.
            </p>
            
            {/* Decorative Line */}
            <div className="w-24 h-px bg-gradient-to-r from-primary to-transparent" />
          </div>

          {/* Right Content - Benefits List */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-5 bg-charcoal-light/30 border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-cream-muted text-sm font-light">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
