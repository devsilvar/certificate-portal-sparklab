import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

const SearchForm = ({ onSearch, isLoading }: SearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto px-6'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
          Find Your Child's Certificate
        </h1>
        <p className='text-lg text-gray-600 mb-4'>
          Enter your child's first name or last name to view their achievement
          certificate
        </p>
        <p className='text-sm text-gray-500'>
          Example: Search for "daniel" or "okoro"
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='relative'>
          <Input
            type='text'
            placeholder='Enter first name or last name (e.g., daniel)'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='h-12 pl-12 pr-4 text-base rounded-lg border border-gray-300 focus:border-sparklab-blue focus:ring-0 transition-colors duration-200 shadow-sm'
            disabled={isLoading}
          />
          <MagnifyingGlassIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
        </div>

        <Button
          type='submit'
          disabled={!searchQuery.trim() || isLoading}
          className='w-full h-12 bg-sparklab-blue hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md'
        >
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
