import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Phone, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ScheduleVisitFormProps {
  propertyTitle: string;
  propertyLocation: string;
  onSuccess?: () => void;
}

const ScheduleVisitForm = ({ propertyTitle, propertyLocation, onSuccess }: ScheduleVisitFormProps) => {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    data: "",
    horario: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome.trim() || !formData.telefone.trim() || !formData.data || !formData.horario) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setIsSubmitting(true);

    try {
      const interesse = `Visita agendada: ${propertyTitle} - ${propertyLocation} | Data: ${formData.data} às ${formData.horario}`;
      
      const { error } = await supabase.from("leads").insert({
        nome: formData.nome.trim(),
        telefone: formData.telefone.trim(),
        interesse: interesse,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Visita agendada com sucesso! Entraremos em contato para confirmar.");
      onSuccess?.();
    } catch (error) {
      console.error("Error scheduling visit:", error);
      toast.error("Erro ao agendar visita. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-primary/10 border border-primary/30 p-6 text-center">
        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-6 h-6 text-primary-foreground" />
        </div>
        <h4 className="text-lg font-serif text-foreground mb-2">Visita Agendada!</h4>
        <p className="text-cream-muted text-sm">
          Entraremos em contato para confirmar sua visita.
        </p>
      </div>
    );
  }

  // Gerar data mínima (amanhã)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Gerar data máxima (30 dias)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="schedule-nome" className="text-cream-muted text-sm flex items-center gap-2">
            <User className="w-4 h-4" />
            Nome
          </Label>
          <Input
            id="schedule-nome"
            type="text"
            placeholder="Seu nome"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            className="bg-charcoal-800 border-border focus:border-primary"
            maxLength={100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule-telefone" className="text-cream-muted text-sm flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Telefone
          </Label>
          <Input
            id="schedule-telefone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
            className="bg-charcoal-800 border-border focus:border-primary"
            maxLength={20}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="schedule-data" className="text-cream-muted text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Data da Visita
          </Label>
          <Input
            id="schedule-data"
            type="date"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            min={minDate}
            max={maxDateStr}
            className="bg-charcoal-800 border-border focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule-horario" className="text-cream-muted text-sm flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Horário
          </Label>
          <select
            id="schedule-horario"
            value={formData.horario}
            onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
            className="w-full h-10 px-3 bg-charcoal-800 border border-border rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Selecione</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </div>
      </div>
      <Button
        type="submit"
        variant="gold"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Agendando..." : "Agendar Visita"}
      </Button>
    </form>
  );
};

export default ScheduleVisitForm;
