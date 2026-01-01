import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Interface para os dados do lead
interface LeadData {
  name: string;
  phone: string;
  source: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const formatPhone = (value: string): string => {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 2) {
    return numbers.length ? `(${numbers}` : "";
  }
  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

const isValidPhone = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, "");
  return numbers.length >= 10 && numbers.length <= 11;
};

// Função para obter parâmetros UTM da URL
const getUTMParams = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
  };
};

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
  return undefined;
};

const sendLeadToMeta = async (leadData: LeadData, eventId: string, value?: number, currency?: string) => {
  try {
    const fbp = getCookie("_fbp");
    const fbc = getCookie("_fbc");
    const response = await fetch("/api/meta-events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: leadData.name,
        phone: leadData.phone,
        event_id: eventId,
        event_source_url: window.location.href,
        action_source: "website",
        fbp,
        fbc,
        value,
        currency,
      }),
    });
    if (!response.ok) {
      return { success: false };
    }
    return { success: true, data: await response.json() };
  } catch (error) {
    console.error("Erro ao enviar lead para Meta:", error);
    return { success: false, error };
  }
};

// Função para enviar lead para o CRM
const sendLeadToCRM = async (leadData: LeadData) => {
  try {
    // Simulando chamada para API do CRM
    console.log("Enviando lead para CRM:", leadData);

    // Em produção, você substituiria isso pela API do seu CRM
    // Exemplos: Pipedrive, HubSpot, Salesforce, etc.
    // Exemplo com HubSpot:
    /*
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_HUBSPOT_TOKEN}`
      },
      body: JSON.stringify({
        properties: {
          firstname: leadData.name.split(' ')[0],
          lastname: leadData.name.split(' ').slice(1).join(' '),
          phone: leadData.phone,
          lead_source: leadData.source,
          utm_source: leadData.utm_source || '',
          utm_medium: leadData.utm_medium || '',
          utm_campaign: leadData.utm_campaign || '',
        }
      })
    });
    */

    // Exemplo com Pipedrive:
    /*
    const response = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${import.meta.env.VITE_PIPEDRIVE_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: leadData.name,
        phone: [{ label: 'phone', value: leadData.phone }],
        utm_source: leadData.utm_source,
        utm_medium: leadData.utm_medium,
        utm_campaign: leadData.utm_campaign,
      })
    });
    */

    // Exemplo com API genérica
    const crmEndpoint = import.meta.env.VITE_CRM_ENDPOINT || '';
    if (crmEndpoint) {
      const response = await fetch(crmEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_CRM_TOKEN || ''}`
        },
        body: JSON.stringify({
          name: leadData.name,
          phone: leadData.phone,

          source: leadData.source,
          utm_source: leadData.utm_source,
          utm_medium: leadData.utm_medium,
          utm_campaign: leadData.utm_campaign,
          created_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na resposta do CRM: ${response.status}`);
      }

      return { success: true, data: await response.json() };
    }

    // Se não houver endpoint do CRM configurado, apenas retornar sucesso
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar lead para CRM:", error);
    return { success: false, error };
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: "morar",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData({ ...formData, phone: formatted });
    setPhoneError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhone(formData.phone)) {
      setPhoneError("Digite um telefone válido com DDD");
      return;
    }

    setIsSubmitting(true);

    try {
      // Obter parâmetros UTM
      const utmParams = getUTMParams();
      const defaultValue = Number(import.meta.env.VITE_META_CONVERSION_VALUE ?? "0");
      const defaultCurrency = import.meta.env.VITE_META_CONVERSION_CURRENCY ?? "BRL";
      let mappedValue = defaultValue > 0 ? defaultValue : undefined;
      const mappedCurrency = defaultCurrency;
      const rawMap = import.meta.env.VITE_META_CONVERSION_MAP;
      let map: Record<string, number> | undefined;
      if (rawMap) {
        try {
          map = JSON.parse(rawMap as string) as Record<string, number>;
        } catch {
          map = undefined;
        }
      }
      if (utmParams.utm_campaign && map && map[utmParams.utm_campaign] && map[utmParams.utm_campaign] > 0) {
        mappedValue = map[utmParams.utm_campaign];
      }

      // Dados do lead
      const leadData: LeadData = {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        source: "landing_page_form",
        ...utmParams
      };

      // Enviar para Supabase (banco de dados local)
      const { error: supabaseError } = await supabase.from("leads").insert({
        nome: leadData.name,
        telefone: leadData.phone,
        interesse: formData.interest,
      });

      if (supabaseError) throw supabaseError;

      const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const hasConsent = typeof window !== "undefined" && localStorage.getItem("consent_marketing") === "true";
      if (hasConsent) {
        const w = window as Window & { fbq?: (event: string, ...args: unknown[]) => void };
        if (w.fbq) {
          w.fbq("track", "Lead", { event_id: eventId });
        }
        const metaResult = await sendLeadToMeta(leadData, eventId, mappedValue, mappedCurrency);
        if (!metaResult.success) {
          console.error("Falha ao enviar lead para Meta Ads:", metaResult.error);
        }
      }
      // Não interrompe o fluxo se Meta não tiver consentimento/falhar

      // Enviar para CRM
      const crmResult = await sendLeadToCRM(leadData);
      if (!crmResult.success) {
        console.error("Falha ao enviar lead para CRM:", crmResult.error);
        // Não interrompe o fluxo se o envio para CRM falhar
      }

      toast({
        title: "Solicitação Recebida",
        description: "Em breve entraremos em contato para um atendimento exclusivo.",
      });

      setFormData({ name: "", phone: "", interest: "morar" });
    } catch (error) {
      console.error("Erro ao enviar lead:", error);
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 lg:py-32 bg-background relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-primary text-sm tracking-[0.3em] uppercase block mb-4">
              Acesso Exclusivo - Adriana Chaves
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">
              Seja o Primeiro a Saber{" "}
              <span className="text-gradient-gold">Das Oportunidades</span>
            </h2>
            <p className="text-cream-muted text-lg font-light leading-relaxed">
              Cadastre-se agora e receba as melhores oportunidades imobiliárias
              selecionadas por Adriana Chaves antes mesmo de serem anunciadas.
              Nossos imóveis de luxo são raros e vendem rapidamente.
            </p>
          </div>

          {/* Form */}
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-light text-cream-muted mb-2 tracking-wide"
              >
                Nome Completo
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 bg-charcoal border border-border text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
                placeholder="Seu nome"
              />
            </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-light text-cream-muted mb-2 tracking-wide"
            >
              Telefone / WhatsApp
            </label>
            <input
              type="tel"
              id="phone"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full px-5 py-4 bg-charcoal border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 transition-all duration-300 ${
                phoneError
                  ? "border-destructive focus:border-destructive focus:ring-destructive"
                  : "border-border focus:border-primary focus:ring-primary"
              }`}
              placeholder="(00) 00000-0000"
            />
            {phoneError && (
              <p className="text-destructive text-xs mt-1">{phoneError}</p>
            )}
          </div>

          {/* Interest */}
          <div>
            <label
              htmlFor="interest"
              className="block text-sm font-light text-cream-muted mb-2 tracking-wide"
            >
              Interesse
            </label>
            <select
              id="interest"
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              className="w-full px-5 py-4 bg-charcoal border border-border text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
            >
              <option value="morar">Morar</option>
              <option value="investir">Investir</option>
              <option value="ambos">Morar e Investir</option>
            </select>
          </div>



            {/* Submit */}
            <Button
              type="submit"
              variant="gold"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
              data-track-cta="Formulário de Oportunidade"
            >
              {isSubmitting ? "Enviando..." : "Receber Lista VIP de Oportunidades"}
            </Button>

            {/* Privacy Note */}
            <p className="text-center text-cream-muted text-xs font-light">
              Ao enviar este formulário, você concorda com a nossa Política de Privacidade
              e autoriza o contato por nossos corretores.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
