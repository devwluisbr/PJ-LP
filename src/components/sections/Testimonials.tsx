import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
}

const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Silva",
      role: "Comprador",
      content: "A Premium Living me ajudou a encontrar o apartamento dos meus sonhos no Setor Marista. O atendimento foi excepcional e todo o processo foi muito bem conduzido.",
      rating: 5,
      date: "Março de 2024"
    },
    {
      id: 2,
      name: "Fernanda Oliveira",
      role: "Investidora",
      content: "Como investidora, encontrei oportunidades incríveis através da Premium Living. O conhecimento de mercado e as oportunidades exclusivas fizeram toda a diferença.",
      rating: 5,
      date: "Abril de 2024"
    },
    {
      id: 3,
      name: "Roberto Santos",
      role: "Vendedor",
      content: "Vendi meu imóvel rapidamente com a Premium Living. O processo foi transparente e o valor de venda superou minhas expectativas. Recomendo fortemente!",
      rating: 5,
      date: "Maio de 2024"
    }
  ];

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block text-primary font-sans text-sm tracking-[0.3em] uppercase border border-primary/40 px-6 py-2 mb-4">
            Depoimentos
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
            O Que Nossos{" "}
            <span className="text-gradient-gold">Clientes Dizem</span>
          </h2>
          <p className="text-cream-muted text-lg font-light max-w-2xl mx-auto">
            A satisfação dos clientes de Adriana Chaves é a nossa maior conquista.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-charcoal p-8 rounded-lg border border-border hover-gold-glow transition-all duration-300"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-gold fill-gold' : 'text-cream-muted'}`} 
                  />
                ))}
              </div>
              <p className="text-cream-muted font-light mb-6 italic">
                "{testimonial.content}"
              </p>
              <div>
                <h4 className="font-serif text-foreground text-lg mb-1">
                  {testimonial.name}
                </h4>
                <p className="text-cream-muted text-sm">
                  {testimonial.role}
                </p>
                <p className="text-cream-muted text-xs mt-2">
                  {testimonial.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-charcoal px-8 py-4 rounded-full border border-border">
            <div className="text-3xl font-bold text-foreground">250+</div>
            <div>
              <div className="text-cream-muted text-sm">Imóveis Vendidos</div>
              <div className="text-cream-muted text-sm">em 2024</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;