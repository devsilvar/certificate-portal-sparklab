import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import SearchForm from '@/components/SearchForm';
import ResultCard from '@/components/ResultCard';
import PhoneVerification from '@/components/PhoneVerification';
import { Child } from '@/data/mockData';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  const get_url = import.meta.env.VITE_SEARCH_API_URL;

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: async () => {
      const response = await fetch(
        `${get_url}?name=${encodeURIComponent(searchQuery!)}&nocache=${Date.now()}`
      );
      if (!response.ok) {
        throw new Error('Search failed');
      }
      return response.json();
    },
    enabled: !!searchQuery,
  });

  const results = data?.data || [];
  const isSearching = isLoading;
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setHasSearched(true);
  };

  const handleViewCertificate = (child: Child) => {
    setSelectedChild(child);
    setShowVerification(true);
  };

  const handleVerify = async (code: string): Promise<boolean> => {
    if (!selectedChild) return false;

    // For demo purposes, accept any 6-digit code
    const isValid = /^\d{6}$/.test(code);

    if (isValid) {
      setShowVerification(false);
      navigate('/certificate', { state: { child: selectedChild } });
    }

    return isValid;
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white border-b border-gray-100'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-center gap-4'>
            <img
              src='/sparklogo.png'
              alt='Sparklab'
              className='h-8 w-auto'
            />
            <span className='font-semibold text-lg text-gray-900'>Certificate Search</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-6 py-12'>
        {!hasSearched ? (
          // Initial state - show search form
          <SearchForm onSearch={handleSearch} isLoading={isSearching} />
        ) : isSearching ? (
          // Searching state
          <div className='max-w-2xl mx-auto text-center'>
            <div className='mb-8'>
              <div className='inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-sparklab-blue/10 mb-4'>
                <div className='w-6 h-6 md:w-8 md:h-8 border-4 border-sparklab-blue border-t-transparent rounded-full animate-spin'></div>
              </div>
              <h2 className='text-lg md:text-xl font-semibold text-gray-900 mb-2'>Searching...</h2>
              <p className='text-gray-600 text-sm md:text-base'>Looking for certificates matching "{searchQuery}"</p>
            </div>
          </div>
        ) : results.length > 0 ? (
          // Results found
          <div className='max-w-4xl mx-auto space-y-6 md:space-y-8'>
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
              <div>
                <h2 className='text-xl md:text-2xl font-bold text-gray-900'>
                  Search Results
                </h2>
                <p className='text-gray-600 mt-1 text-sm md:text-base'>
                  Found {results.length} {results.length === 1 ? 'match' : 'matches'} for "{searchQuery}"
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery(null);
                  setHasSearched(false);
                }}
                className='text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200'
              >
                New Search
              </button>
            </div>

            <div className='space-y-4'>
              {results.map((child) => (
                <ResultCard
                  key={child.id}
                  child={child}
                  onViewCertificate={handleViewCertificate}
                />
              ))}
            </div>
          </div>
        ) : (
          // No results found
          <div className='max-w-2xl mx-auto text-center space-y-6 md:space-y-8'>
            <div className='space-y-4'>
              <div className='inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 mb-4'>
                <svg className='w-6 h-6 md:w-8 md:h-8 text-red-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                </svg>
              </div>
              <h2 className='text-xl md:text-2xl font-bold text-gray-900'>No Results Found</h2>
              <p className='text-gray-600 leading-relaxed text-sm md:text-base'>
                We couldn't find any certificates for "{searchQuery}". Please check the spelling and try again,
                or contact Sparklab support if you believe this is an error.
              </p>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => setHasSearched(false)}
                className='px-6 py-3 bg-sparklab-blue hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md'
              >
                Try Another Search
              </button>
              <button
                onClick={() => navigate('/')}
                className='px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200'
              >
                Return to Home
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Phone Verification Modal */}
      {selectedChild && (
        <PhoneVerification
          isOpen={showVerification}
          childName={selectedChild.name}
          email={selectedChild.emailAdress}
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
