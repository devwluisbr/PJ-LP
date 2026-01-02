import whatsappLogo from "@/assets/Casa Aurora/logo whatsaap.png";

const WhatsAppButton = () => {
  const phoneNumber = "5562981252950";
  const message = "Olá, gostaria receber mais informações.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contato via WhatsApp"
    >
      <img src={whatsappLogo} alt="WhatsApp" className="w-12 h-12" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-charcoal-800 text-cream text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        Fale conosco
      </span>
      
      {/* Pulse animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
    </a>
  );
};

export default WhatsAppButton;
