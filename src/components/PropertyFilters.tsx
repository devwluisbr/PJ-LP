import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface PropertyFilters {
  search: string;
  type: string;
  location: string;
  minBeds: number | null;
}

interface PropertyFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
  types: string[];
  locations: string[];
}

const PropertyFiltersComponent = ({ filters, onFiltersChange, types, locations }: PropertyFiltersProps) => {
  const hasActiveFilters = filters.search || filters.type || filters.location || filters.minBeds;

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      type: "",
      location: "",
      minBeds: null,
    });
  };

  return (
    <div className="bg-charcoal border border-border p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-serif text-foreground">Filtrar Imóveis</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="ml-auto text-cream-muted hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted" />
          <Input
            type="text"
            placeholder="Buscar por nome..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10 bg-charcoal-800 border-border focus:border-primary"
          />
        </div>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => onFiltersChange({ ...filters, type: e.target.value })}
          className="h-10 px-3 bg-charcoal-800 border border-border rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Todos os tipos</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {/* Location */}
        <select
          value={filters.location}
          onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          className="h-10 px-3 bg-charcoal-800 border border-border rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Todas as localizações</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Min Beds */}
        <select
          value={filters.minBeds || ""}
          onChange={(e) => onFiltersChange({ ...filters, minBeds: e.target.value ? parseInt(e.target.value) : null })}
          className="h-10 px-3 bg-charcoal-800 border border-border rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Quartos</option>
          <option value="1">1+ quartos</option>
          <option value="2">2+ quartos</option>
          <option value="3">3+ quartos</option>
          <option value="4">4+ quartos</option>
          <option value="5">5+ quartos</option>
        </select>
      </div>
    </div>
  );
};

export default PropertyFiltersComponent;
