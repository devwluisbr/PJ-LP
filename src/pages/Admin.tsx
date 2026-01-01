import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOut, RefreshCw, User, Phone, Target, Calendar, Download, Filter, X, Search } from "lucide-react";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Lead {
  id: string;
  nome: string;
  telefone: string;
  interesse: string;
  created_at: string;
}

const interestLabels: Record<string, string> = {
  morar: "Morar",
  investir: "Investir",
  ambos: "Morar e Investir",
};

const Admin = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterInterest, setFilterInterest] = useState<string>("all");
  const [filterDateFrom, setFilterDateFrom] = useState<string>("");
  const [filterDateTo, setFilterDateTo] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (!currentSession?.user) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (!currentSession?.user) {
        navigate("/auth");
      } else {
        fetchLeads();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: unknown) {
      toast({
        title: "Erro ao carregar leads",
        description: error instanceof Error ? error.message : "Ocorreu um erro.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Filter by name search
      if (searchName && !lead.nome.toLowerCase().includes(searchName.toLowerCase())) {
        return false;
      }

      // Filter by interest
      if (filterInterest !== "all" && lead.interesse !== filterInterest) {
        return false;
      }

      // Filter by date range
      const leadDate = new Date(lead.created_at);
      
      if (filterDateFrom) {
        const fromDate = new Date(filterDateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (leadDate < fromDate) return false;
      }

      if (filterDateTo) {
        const toDate = new Date(filterDateTo);
        toDate.setHours(23, 59, 59, 999);
        if (leadDate > toDate) return false;
      }

      return true;
    });
  }, [leads, filterInterest, filterDateFrom, filterDateTo, searchName]);

  const clearFilters = () => {
    setFilterInterest("all");
    setFilterDateFrom("");
    setFilterDateTo("");
    setSearchName("");
  };

  const hasActiveFilters = filterInterest !== "all" || filterDateFrom || filterDateTo || searchName;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const exportToCSV = () => {
    if (filteredLeads.length === 0) {
      toast({
        title: "Nenhum lead para exportar",
        variant: "destructive",
      });
      return;
    }

    const headers = ["Nome", "Telefone", "Interesse", "Data de Cadastro"];
    const csvContent = [
      headers.join(";"),
      ...filteredLeads.map((lead) =>
        [
          lead.nome,
          lead.telefone,
          interestLabels[lead.interesse] || lead.interesse,
          formatDate(lead.created_at),
        ].join(";")
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leads_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Exportação concluída",
      description: `${filteredLeads.length} leads exportados com sucesso.`,
    });
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-cream-muted">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-charcoal-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif text-foreground">
              Painel <span className="text-gradient-gold">Administrativo</span>
            </h1>
            <p className="text-cream-muted text-xs mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="goldOutline"
              size="sm"
              onClick={exportToCSV}
              disabled={isLoading || filteredLeads.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
            <Button
              variant="goldOutline"
              size="sm"
              onClick={fetchLeads}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-charcoal border border-border p-6">
            <p className="text-cream-muted text-sm mb-1">Total de Leads</p>
            <p className="text-3xl font-serif text-primary">{leads.length}</p>
          </div>
          <div className="bg-charcoal border border-border p-6">
            <p className="text-cream-muted text-sm mb-1">Interesse em Morar</p>
            <p className="text-3xl font-serif text-foreground">
              {leads.filter((l) => l.interesse === "morar" || l.interesse === "ambos").length}
            </p>
          </div>
          <div className="bg-charcoal border border-border p-6">
            <p className="text-cream-muted text-sm mb-1">Interesse em Investir</p>
            <p className="text-3xl font-serif text-foreground">
              {leads.filter((l) => l.interesse === "investir" || l.interesse === "ambos").length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-charcoal border border-border p-4 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Filtros</h3>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                Limpar filtros
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-cream-muted mb-1 block">Buscar por nome</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted" />
                <Input
                  type="text"
                  placeholder="Digite o nome..."
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                  className="bg-charcoal-800 border-border pl-9"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-cream-muted mb-1 block">Interesse</label>
              <Select value={filterInterest} onValueChange={setFilterInterest}>
                <SelectTrigger className="bg-charcoal-800 border-border">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="morar">Morar</SelectItem>
                  <SelectItem value="investir">Investir</SelectItem>
                  <SelectItem value="ambos">Morar e Investir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-cream-muted mb-1 block">Data inicial</label>
              <Input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className="bg-charcoal-800 border-border"
              />
            </div>
            <div>
              <label className="text-xs text-cream-muted mb-1 block">Data final</label>
              <Input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className="bg-charcoal-800 border-border"
              />
            </div>
          </div>
          {hasActiveFilters && (
            <p className="text-xs text-cream-muted mt-3">
              Exibindo {filteredLeads.length} de {leads.length} leads
            </p>
          )}
        </div>

        {/* Leads Table */}
        <div className="bg-charcoal border border-border">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-serif text-foreground">Leads Cadastrados</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-cream-muted">Carregando...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-8 text-center text-cream-muted">
              {hasActiveFilters ? "Nenhum lead encontrado com os filtros aplicados." : "Nenhum lead cadastrado ainda."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-charcoal-800">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-medium text-cream-muted uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Nome
                      </div>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-cream-muted uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" /> Telefone
                      </div>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-cream-muted uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4" /> Interesse
                      </div>
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-cream-muted uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Data
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-charcoal-800/50 transition-colors">
                      <td className="px-4 py-4 text-foreground">{lead.nome}</td>
                      <td className="px-4 py-4">
                        <a
                          href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {lead.telefone}
                        </a>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {interestLabels[lead.interesse] || lead.interesse}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-cream-muted text-sm">
                        {formatDate(lead.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <a href="/" className="text-cream-muted hover:text-primary transition-colors text-sm">
            ← Voltar ao site
          </a>
        </div>
      </main>
    </div>
  );
};

export default Admin;
