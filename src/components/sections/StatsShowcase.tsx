const StatsShowcase = () => {
  const stats = [
    {
      value: "250+",
      label: "Imóveis Vendidos",
      description: "em 2024"
    },
    {
      value: "98%",
      label: "Taxa de Satisfação",
      description: "dos nossos clientes"
    },
    {
      value: "15+",
      label: "Anos de Experiência",
      description: "no mercado imobiliário"
    },
    {
      value: "50M+",
      label: "Valor Negociado",
      description: "em imóveis de luxo"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-charcoal">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2 group-hover:text-gold-light transition-colors">
                {stat.value}
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2">
                {stat.label}
              </h3>
              <p className="text-cream-muted text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            Por Que Escolher a{" "}
            <span className="text-gradient-gold">Adriana Chaves</span>?
          </h2>
          <p className="text-cream-muted text-lg font-light max-w-3xl mx-auto">
            Com anos de experiência no mercado imobiliário de Goiânia,
            Adriana Chaves é especialista em conectar compradores e vendedores
            aos melhores imóveis de luxo da cidade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsShowcase;