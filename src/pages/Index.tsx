import Header from "@/components/Header";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnimatedSection from "@/components/AnimatedSection";
import Hero from "@/components/sections/Hero";
import Properties from "@/components/sections/Properties";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <main id="top" className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <AnimatedSection animation="fade-up">
        <Properties />
      </AnimatedSection>
      <AnimatedSection animation="fade-up" delay={100}>
        <ContactForm />
      </AnimatedSection>
      <Footer />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
