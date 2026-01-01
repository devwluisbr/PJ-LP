
import { cn } from "@/lib/utils";
import logoFinal from "@/assets/Casa Aurora/LOGO FINAL.png";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 text-left">
      <img
        src={logoFinal}
        alt="Logo AC"
        className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
        decoding="async"
        loading="eager"
      />
      <div className="leading-tight">
        <div className="text-2xl md:text-3xl font-serif tracking-widest text-foreground">
          <span className="text-gradient-gold">Adriana</span> Chaves
        </div>
        <div className="text-xs md:text-sm text-cream-muted tracking-[0.3em] uppercase">
          Consultor Imobiliário
        </div>
      </div>
    </div>
  );
};

export default Logo;
