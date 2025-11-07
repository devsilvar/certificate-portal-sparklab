import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Child } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowLeftIcon,
  SparklesIcon,
  CheckCircleIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';

const EnrollmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { child, nextStageCourse } = location.state as {
    child: Child;
    nextStageCourse: string;
  };

  const review_url = import.meta.env.VITE_REVIEW_API_URL;

  const [enrollmentForm, setEnrollmentForm] = useState({
    parentName: '',
    parentEmail: child?.emailAdress || '',
    parentPhone: child?.phone || '',
    childName: child?.name || '',
    childAge: child?.age || '',
    notes: '',
    selectedCourse: child?.course || '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const mutation = useMutation({
    mutationFn: async (enrollmentData: typeof enrollmentForm) => {
      const params = new URLSearchParams();
      params.append('action', 'enrollment');
      params.append('parentName', enrollmentData.parentName);
      params.append('childName', enrollmentData.childName);
      params.append('childAge', String(enrollmentData.childAge));
      params.append('phoneNumber', enrollmentData.parentPhone);
      params.append('email', enrollmentData.parentEmail);
      params.append('track', enrollmentData.selectedCourse);
      params.append('notes', enrollmentData.notes);

      const response = await fetch(getReviewUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: params.toString(),
      });

      return response.json();
    },
    onSuccess: (result) => {
      if (result.success == true) {
        setIsSubmitted(true);
        toast.success('Enrollment submitted successfully!', {
          description: 'Our team will contact you within 2 hours.',
        });
      }
    },
    onError: (error) => {
      console.error('Enrollment submission failed:', error);
      toast.error('Error Submitting Enrollment', {
        description: 'Enrollment submission failed. Please try again later.',
      });
    },
  });

  const getReviewUrl = () => `${review_url}?nocache=${new Date().getTime()}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(enrollmentForm);
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-white'>
        <div className='container mx-auto px-6 py-16'>
          <div className='max-w-2xl mx-auto text-center space-y-8'>
            <div className='flex justify-center'>
              <div className='h-20 w-20 rounded-full bg-green-100 flex items-center justify-center'>
                <CheckCircleIcon className='h-12 w-12 text-green-600' />
              </div>
            </div>

            <div className='space-y-4'>
              <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
                Enrollment Submitted!
              </h1>
              <p className='text-base md:text-lg text-gray-600'>
                Thank you for enrolling {child?.name} in the next stage of their
                tech journey.
              </p>
            </div>

            <div className='bg-gray-50 border border-gray-200 rounded-xl p-4 md:p-6 space-y-4'>
              <h3 className='font-medium text-gray-900 text-sm md:text-base'>What happens next?</h3>
              <div className='text-left space-y-2 text-sm text-gray-600'>
                <p>✓ Our enrollment team will contact you within 2 hours</p>
                <p>✓ We'll confirm your spot and discuss payment options</p>
                <p>✓ You'll receive a welcome package with course materials</p>
                <p>✓ {child?.name} will be ready to start next month!</p>
              </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <Button
                onClick={() => navigate('/')}
                className='bg-sparklab-blue hover:bg-blue-700 text-white px-4 md:px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base'
              >
                Return to Home
              </Button>
              <Button
                onClick={() => navigate(-1)}
                variant='outline'
                className='border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 md:px-6 py-3 rounded-lg font-medium transition-colors duration-200 text-sm md:text-base'
              >
                Back to Certificate
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white border-b border-gray-100'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 group'
            >
              <ArrowLeftIcon className='h-5 w-5 group-hover:-translate-x-0.5 transition-transform duration-200' />
              <span className='font-medium text-sm tracking-wide uppercase'>
                Back
              </span>
            </button>
            <div className='flex items-center gap-4'>
              <img src='/sparklogo.png' alt='Sparklab' className='h-8 w-auto' />
              <span className='font-medium text-lg text-gray-900 tracking-tight'>
                Enrollment
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-6 py-12'>
        <div className='max-w-2xl mx-auto space-y-8'>
          {/* Hero Section */}
          <div className='text-center space-y-6'>
            <div className='flex justify-center'>
              <div className='h-16 w-16 rounded-2xl bg-gradient-to-br from-sparklab-blue to-purple-600 flex items-center justify-center shadow-lg'>
                <AcademicCapIcon className='h-8 w-8 text-white' />
              </div>
            </div>

            <div className='space-y-4'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900'>
                Enroll {child?.name} for Next Stage
              </h1>
              <p className='text-base md:text-lg text-gray-600'>
                Continue the success story! Secure {child?.name}'s spot in our
                advanced {nextStageCourse} program.
              </p>
            </div>
          </div>

          {/* Enrollment Form */}
          <div className='bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-xl'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Key Contact Info */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-900'>
                    Parent Full Name
                  </label>
                  <Input
                    type='text'
                    placeholder='Parent/Guardian name'
                    value={enrollmentForm.parentName}
                    onChange={(e) =>
                      setEnrollmentForm((prev) => ({
                        ...prev,
                        parentName: e.target.value,
                      }))
                    }
                    className='h-10 text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200'
                    disabled={mutation.isPending}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-900'>
                    Phone Number
                  </label>
                  <Input
                    type='tel'
                    placeholder='+234 xxx xxx xxxx'
                    value={enrollmentForm.parentPhone}
                    onChange={(e) =>
                      setEnrollmentForm((prev) => ({
                        ...prev,
                        parentPhone: e.target.value,
                      }))
                    }
                    className='h-10 text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200'
                    disabled={mutation.isPending}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-900'>
                  Email Address
                </label>
                <Input
                  type='email'
                  placeholder='your.email@example.com'
                  value={enrollmentForm.parentEmail}
                  onChange={(e) =>
                    setEnrollmentForm((prev) => ({
                      ...prev,
                      parentEmail: e.target.value,
                    }))
                  }
                  className='h-10 text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200'
                  disabled={mutation.isPending}
                  required
                />
              </div>

              {/* Child Information */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-900'>
                  Child Name
                </label>
                <Input
                  type='text'
                  placeholder='Child name'
                  value={enrollmentForm.childName}
                  onChange={(e) =>
                    setEnrollmentForm((prev) => ({
                      ...prev,
                      childName: e.target.value,
                    }))
                  }
                  className='h-10 text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200'
                  disabled={mutation.isPending}
                  required
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-900'>
                    Child Age
                  </label>
                  <Input
                    type='number'
                    placeholder='Age'
                    value={enrollmentForm.childAge}
                    onChange={(e) =>
                      setEnrollmentForm((prev) => ({
                        ...prev,
                        childAge: e.target.value,
                      }))
                    }
                    className='h-10 text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200'
                    disabled={mutation.isPending}
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm font-medium text-gray-900'>
                    Notes
                  </label>
                  <Textarea
                    placeholder='Any additional notes...'
                    value={enrollmentForm.notes}
                    onChange={(e) =>
                      setEnrollmentForm((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className='min-h-24 resize-none text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200'
                    disabled={mutation.isPending}
                  />
                </div>
              </div>

              {/* Course Selection */}
              <div className='space-y-2'>
                <label className='text-sm font-medium text-gray-900'>
                  Program Selection
                </label>
                <select
                  value={enrollmentForm.selectedCourse}
                  onChange={(e) =>
                    setEnrollmentForm((prev) => ({
                      ...prev,
                      selectedCourse: e.target.value,
                    }))
                  }
                  className='w-full h-10 text-sm rounded-lg border border-gray-300 focus:border-gray-900 focus:ring-0 transition-colors duration-200 bg-white'
                  disabled={mutation.isPending}
                  required
                >
                  <option value={child?.course}>
                    Continue with {child?.course} ⭐ (Current Program)
                  </option>
                  <option value='Web Development'>Web Development</option>
                  <option value='Python and AI'>Python and AI</option>
                  <option value='Robotics'>Robotics</option>
                </select>
              </div>

              {/* Value Proposition Banner */}
              <div className='bg-gradient-to-r from-sparklab-blue/10 to-purple-50/50 border border-sparklab-blue/20 rounded-xl p-4 md:p-6'>
                <div className='flex items-center gap-3 mb-4'>
                  <AcademicCapIcon className='h-5 w-5 text-sparklab-blue' />
                  <span className='font-medium text-gray-900 text-sm md:text-base'>
                    Early Enrollment Benefit
                  </span>
                </div>
                <div className='flex items-start gap-3'>
                  <div>
                    <p className='font-medium text-gray-900 text-sm'>
                      Free Makeup Classes
                    </p>
                    <p className='text-gray-700 text-sm'>
                      Up to two missed classes can be made up free of charge
                      during the program duration
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type='submit'
                disabled={mutation.isPending}
                className='w-full h-10 bg-black hover:bg-gray-900 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base'
              >
                {mutation.isPending ? (
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                    <span className='text-sm md:text-base'>Processing Enrollment...</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-3'>
                    <span className='text-sm md:text-base'>Secure {child?.name}'s Spot Now</span>
                  </div>
                )}
              </Button>

              <p className='text-xs text-gray-500 text-center'>
                By enrolling, you agree to our terms. We'll contact you within 2
                hours to complete the process.
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnrollmentPage;
