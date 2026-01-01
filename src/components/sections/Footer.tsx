import { Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 bg-charcoal border-t border-border">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Final Message */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-serif mb-4">
              Transformando Sonhos em{" "}
              <span className="text-gradient-gold">Realidade</span>
            </h3>
          </div>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-cream-muted">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-sm font-light">(62) 98125-2950</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />

          {/* Copyright */}
          <div className="text-center">
            <p className="text-cream-muted text-xs font-light tracking-wide">
              CRECI/GO 46381 · Adriana Chaves · Consultor Imobiliário em Goiânia-GO
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
