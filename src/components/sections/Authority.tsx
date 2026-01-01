import { Building2, Users, Award, Clock } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

const Authority = () => {
  const stats = [
    { icon: Clock, value: 10, suffix: "+", label: "Anos de Experiência" },
    { icon: Building2, value: 200, suffix: "+", label: "Imóveis Negociados" },
    { icon: Users, value: 500, suffix: "+", label: "Clientes Satisfeitos" },
    { icon: Award, value: 100, suffix: "%", label: "Comprometimento" },
  ];

  return (
    <section className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Stats */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="group p-8 bg-charcoal border border-border hover:border-primary/50 transition-all duration-500 text-center"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000 + index * 300}
                    className="text-3xl md:text-4xl font-serif text-gradient-gold mb-2"
                  />
                  <div className="text-cream-muted text-sm font-light">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2">
            <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
              Autoridade e Credibilidade
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">
              Seu Especialista em{" "}
              <span className="text-gradient-gold">Alto Padrão</span>
            </h2>
            <div className="space-y-6 text-cream-muted font-light leading-relaxed">
              <p>
                Com mais de uma década de atuação exclusiva no segmento de imóveis de 
                alto padrão em Goiânia, construí uma reputação sólida baseada em 
                confiança, expertise e resultados.
              </p>
              <p>
                Minha atuação se concentra nas regiões mais valorizadas da cidade: 
                Setor Marista, Jardins, Bueno, Oeste e os principais condomínios 
                fechados de alto padrão.
              </p>
              <p>
                Cada negociação é conduzida com a discrição e o profissionalismo 
                que este segmento exige, oferecendo um atendimento verdadeiramente 
                consultivo.
              </p>
            </div>

            {/* Signature */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="text-xl font-serif text-foreground">
                CRECI/GO 00000-F
              </div>
              <div className="text-sm text-cream-muted mt-1">
                Corretor de Imóveis Especializado
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authority;
