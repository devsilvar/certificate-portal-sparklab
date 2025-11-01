import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Find Your Child's Certificate
        </h1>
        <p className="text-lg text-muted-foreground">
          Enter your child's name to view their achievement certificate
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Enter your child's name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-14 pl-14 pr-4 text-lg rounded-xl shadow-card border-2 focus:border-primary"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-6 w-6" />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!searchQuery.trim() || isLoading}
          className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-hero shadow-button hover:opacity-90 transition-opacity"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
