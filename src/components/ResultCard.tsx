import { Child } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import {
  TrophyIcon,
  CalendarDaysIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

interface ResultCardProps {
  child: Child;
  onViewCertificate: (child: Child) => void;
}

const ResultCard = ({ child, onViewCertificate }: ResultCardProps) => {
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center'>
            <UserIcon className='h-6 w-6 text-gray-600' />
          </div>
          <div>
            <h3 className='text-lg font-semibold text-gray-900'>
              {child.name}
            </h3>
            <p className='text-sm text-gray-600'>
              Age {child.age} • {child.course}
            </p>
            <p className='text-sm text-gray-500'>
              Completed {child.completionDate}
            </p>
          </div>
        </div>

        <Button
          onClick={() => onViewCertificate(child)}
          className='bg-sparklab-blue hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md'
        >
          View Certificate
        </Button>
      </div>
    </div>
  );
};

export default ResultCard;
