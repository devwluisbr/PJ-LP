import { Eye, UserCheck, FileCheck, Lock } from "lucide-react";

const Differentials = () => {
  const differentials = [
    {
      icon: Eye,
      title: "Portfólio Exclusivo",
      description: "Acesso antecipado aos melhores imóveis de luxo antes mesmo de serem anunciados no mercado",
    },
    {
      icon: UserCheck,
      title: "Consultoria Premium",
      description: "Atendimento especializado com base em seu perfil e objetivos imobiliários",
    },
    {
      icon: FileCheck,
      title: "Negociação Inteligente",
      description: "Estratégias avançadas para garantir os melhores preços e condições",
    },
    {
      icon: Lock,
      title: "Confidencialidade Total",
      description: "Proteção completa de suas informações e negociações",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
            Nossos Diferenciais
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Por que Escolher a{" "}
            <span className="text-gradient-gold">Adriana Chaves</span>
          </h2>
          <p className="text-cream-muted text-lg font-light leading-relaxed">
            A experiência e exclusividade que seu investimento merece
          </p>
        </div>

        {/* Differentials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {differentials.map((item, index) => (
            <div
              key={index}
              className="group relative p-8 bg-background border border-border hover:border-primary transition-all duration-500 hover-gold-glow"
            >
              {/* Number */}
              <div className="absolute top-4 right-4 text-6xl font-serif text-primary/10 group-hover:text-primary/20 transition-colors">
                0{index + 1}
              </div>

              <div className="relative z-10">
                <div className="w-14 h-14 mb-6 flex items-center justify-center border border-primary/30 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <item.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-serif mb-3 text-foreground">
                  {item.title}
                </h3>

                <p className="text-cream-muted font-light text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;
