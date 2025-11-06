import { useNavigate } from 'react-router-dom';
import {
  AcademicCapIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-white'>
      <div className='container mx-auto px-6 py-16'>
        <div className='max-w-5xl mx-auto text-center space-y-16'>
          {/* Header */}
          <div className='space-y-10'>
            <div className='flex justify-center'>
              <div className='p-6 rounded-3xl bg-white shadow-2xl border border-gray-100'>
                <img
                  src='/sparklogo.png'
                  alt='Sparklab Tech Training Center'
                  className='h-24 w-auto'
                />
              </div>
            </div>
            <div className='space-y-6'>
              <h1 className='text-5xl md:text-6xl font-bold text-gray-900 tracking-tight'>
                Sparklab Tech Training Center
              </h1>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
                Certificate Portal - Access and download your child's
                achievement certificates from our educational programs
              </p>
            </div>
          </div>

          {/* Main CTA */}
          <div className='flex justify-center'>
            <button
              onClick={() => navigate('/')}
              className='inline-flex items-center gap-4 bg-sparklab-blue hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border-2 border-sparklab-blue hover:border-blue-700'
            >
              <MagnifyingGlassIcon className='h-6 w-6' />
              Find Certificate
            </button>
          </div>

          {/* Course showcase */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105'>
              <div className='space-y-4'>
                <div className='h-16 w-16 rounded-2xl bg-sparklab-blue/10 flex items-center justify-center mx-auto shadow-lg'>
                  <AcademicCapIcon className='h-8 w-8 text-sparklab-blue' />
                </div>
                <h3 className='text-xl font-bold text-gray-900'>
                  Web Development
                </h3>
                <p className='text-gray-600 leading-relaxed'>
                  HTML, CSS, JavaScript, and modern frameworks
                </p>
              </div>
            </div>

            <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105'>
              <div className='space-y-4'>
                <div className='h-16 w-16 rounded-2xl bg-sparklab-purple/10 flex items-center justify-center mx-auto shadow-lg'>
                  <AcademicCapIcon className='h-8 w-8 text-sparklab-purple' />
                </div>
                <h3 className='text-xl font-bold text-gray-900'>Python & AI</h3>
                <p className='text-gray-600 leading-relaxed'>
                  Programming fundamentals and machine learning
                </p>
              </div>
            </div>

            <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:scale-105'>
              <div className='space-y-4'>
                <div className='h-16 w-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto shadow-lg'>
                  <AcademicCapIcon className='h-8 w-8 text-green-600' />
                </div>
                <h3 className='text-xl font-bold text-gray-900'>Robotics</h3>
                <p className='text-gray-600 leading-relaxed'>
                  Hardware programming and autonomous systems
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
