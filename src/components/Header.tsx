import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Início", id: "top" },
    { label: "Imóveis", id: "imoveis" },
    { label: "Oportunidades", id: "contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-charcoal/95 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-cream-muted hover:text-primary tracking-widest uppercase transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="goldOutline"
              size="sm"
              onClick={() => scrollToSection("contato")}
              data-track-cta="Header Oportunidades"
            >
              Receber Lista VIP
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-6 pb-4 border-t border-border pt-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-cream-muted hover:text-primary tracking-widest uppercase transition-colors duration-300 py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="gold"
              className="w-full mt-4"
              onClick={() => scrollToSection("contato")}
              data-track-cta="Mobile Receber Oportunidade"
            >
              Receber Oportunidade
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
