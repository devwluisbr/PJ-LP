import { Button } from "@/components/ui/button";
import { Phone, Shield, Clock } from "lucide-react";

const CTA = () => {
  const features = [
    { icon: Shield, text: "Informações Protegidas" },
    { icon: Clock, text: "Contato em até 2h" },
    { icon: Phone, text: "Sem Compromisso" },
  ];

  const scrollToContact = () => {
    document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-background to-charcoal" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.3) 1px, transparent 0)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
            Lista VIP de Oportunidades
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-tight">
            Receba{" "}
            <span className="text-gradient-gold">Oportunidades Exclusivas</span> de Imóveis Premium
          </h2>
          <p className="text-cream-muted text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Imóveis de luxo em Goiânia vendem rápido. Cadastre-se e receba com prioridade
            as oportunidades selecionadas por Adriana Chaves antes de irem ao mercado.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-cream-muted">
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-light">{feature.text}</span>
              </div>
            ))}
          </div>

          <Button
            variant="hero"
            size="xl"
            onClick={scrollToContact}
            data-track-cta="CTA Oportunidade Exclusiva"
          >
            Receber Lista VIP Agora
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
