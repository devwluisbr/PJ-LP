import { CheckCircle2 } from "lucide-react";

const Objections = () => {
  const reassurances = [
    {
      title: "Negociação Segura",
      description: "Toda a documentação é verificada e a transação acompanhada por profissionais qualificados",
    },
    {
      title: "Transparência Total",
      description: "Informações claras e precisas sobre cada imóvel, sem surpresas ou omissões",
    },
    {
      title: "Acompanhamento Completo",
      description: "Suporte em todas as etapas: visita, análise, negociação, documentação e entrega",
    },
    {
      title: "Sem Pressão",
      description: "Decisões no seu tempo, com todas as informações necessárias para escolher com confiança",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-charcoal relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
              Sua Tranquilidade
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
              Comprar com{" "}
              <span className="text-gradient-gold">Confiança</span>
            </h2>
            <p className="text-cream-muted text-lg font-light leading-relaxed">
              Entendemos que a aquisição de um imóvel de alto valor exige segurança 
              e profissionalismo. Por isso, garantimos:
            </p>
          </div>

          {/* Reassurances */}
          <div className="grid md:grid-cols-2 gap-6">
            {reassurances.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-background/50 border border-border"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-foreground font-medium mb-2">
                    {item.title}
                  </h4>
                  <p className="text-cream-muted text-sm font-light leading-relaxed">
                    {item.description}
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

export default Objections;
