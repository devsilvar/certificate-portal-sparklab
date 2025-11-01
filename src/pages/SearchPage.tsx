import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchForm from "@/components/SearchForm";
import ResultCard from "@/components/ResultCard";
import PhoneVerification from "@/components/PhoneVerification";
import { Child, searchChildren, verifyPhone } from "@/data/mockData";
import { GraduationCap } from "lucide-react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Child[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    const searchResults = await searchChildren(query);
    setResults(searchResults);
    setIsSearching(false);
  };

  const handleViewCertificate = (child: Child) => {
    setSelectedChild(child);
    setShowVerification(true);
  };

  const handleVerify = async (phone: string): Promise<boolean> => {
    if (!selectedChild) return false;
    
    const isValid = await verifyPhone(selectedChild.id, phone);
    
    if (isValid) {
      setShowVerification(false);
      navigate("/certificate", { state: { child: selectedChild } });
    }
    
    return isValid;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="h-10 w-10" />
            <h1 className="text-2xl md:text-3xl font-bold">EduAchieve Certificate Portal</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 md:py-20">
        {results.length === 0 ? (
          <SearchForm onSearch={handleSearch} isLoading={isSearching} />
        ) : (
          <div className="max-w-4xl mx-auto px-4 space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Search Results</h2>
                <p className="text-muted-foreground mt-1">
                  Found {results.length} {results.length === 1 ? "match" : "matches"}
                </p>
              </div>
              <button
                onClick={() => setResults([])}
                className="text-primary hover:underline font-medium"
              >
                New Search
              </button>
            </div>

            <div className="space-y-4">
              {results.map((child) => (
                <ResultCard
                  key={child.id}
                  child={child}
                  onViewCertificate={handleViewCertificate}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Phone Verification Modal */}
      {selectedChild && (
        <PhoneVerification
          isOpen={showVerification}
          childName={selectedChild.name}
          onVerify={handleVerify}
          onClose={() => {
            setShowVerification(false);
            setSelectedChild(null);
          }}
        />
      )}
    </div>
  );
};

export default SearchPage;
