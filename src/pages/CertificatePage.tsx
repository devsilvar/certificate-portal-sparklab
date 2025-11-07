import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Child } from '@/data/mockData';
import ReviewForm from '@/components/ReviewForm';
import { Button } from '@/components/ui/button';
import {
  ArrowDownTrayIcon,
  TrophyIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
  EnvelopeIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';

const CertificatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const child = location.state?.child as Child | undefined;
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  // Function to determine next stage course
  const getNextStageCourse = (currentCourse: string) => {
    const courseMapping: Record<string, string> = {
      'Web Development': 'Advanced Web Development',
      'Python and AI': 'Advanced Python & AI',
      Robotics: 'Advanced Robotics',
    };
    return courseMapping[currentCourse] || 'Advanced Tech Program';
  };

  const review_url = import.meta.env.VITE_REVIEW_API_URL;

  // Curriculum data based on course
  const getCurriculumData = (course: string) => {
    const normalizedCourse = course.toLowerCase().trim();

    const curricula: Record<string, { completed: string[]; next: string[] }> = {
      'web development': {
        completed: [
          'Introduction to HTML and the Web',
          'How to use Anchor tag',
          'Adding Media to Webpages',
          'Tables in HTML',
          'How to add Iframe',
          'BlockElement and inline Element',
        ],
        next: [
          'CSS Styling and Layout',
          'JavaScript Programming',
          'Responsive Web Design',
          'Interactive Web Applications',
        ],
      },
      'python and ai': {
        completed: [
          'Introduction to Python & GUI Programming',
          'Chatbots & Artificial Intelligence (AI) with Gemini',
          'Make Python Talk to AI — Final Project',
        ],
        next: [
          'Advanced Python Programming',
          'Machine Learning Algorithms',
          'Data Science with Python',
          'AI Model Deployment',
        ],
      },
      robotics: {
        completed: [
          'Building an Arduino car',
          'Arduino Programming',
          'Using Potentiometer',
          'Arduino Controller',
        ],
        next: [
          'Advanced Arduino Projects',
          'Sensor Integration',
          'Robotics Control Systems',
          'Autonomous Robotics',
        ],
      },
    };

    // Check for course matches (case-insensitive)
    if (
      normalizedCourse.includes('web') &&
      normalizedCourse.includes('development')
    ) {
      return curricula['web development'];
    } else if (
      (normalizedCourse.includes('python') ||
        normalizedCourse.includes('py')) &&
      (normalizedCourse.includes('ai') ||
        normalizedCourse.includes('artificial'))
    ) {
      return curricula['python and ai'];
    } else if (normalizedCourse.includes('robot')) {
      return curricula['robotics'];
    }

    // Default to Web Development if course not found
    return curricula['web development'];
  };

  const curriculum = child
    ? getCurriculumData(child.course)
    : { completed: [], next: [] };

  const mutation = useMutation({
    mutationFn: async (review: {
      name: string;
      rating: number;
      comments: string;
    }) => {
      const params = new URLSearchParams();
      params.append('action', 'review');
      params.append('name', child?.name || '');
      params.append('reviewerName', review?.name || '');
      params.append('comments', review?.comments || '');

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
        setHasSubmittedReview(true);
        toast.success('Thank you for your feedback!', {
          description: 'Your review has been submitted successfully.',
        });
      }
    },
    onError: (error) => {
      console.error('Review submission failed:', error);
      toast.error('Error Submitting It', {
        description: 'Review submission failed. Please try again later.',
      });
    },
  });

  // Redirect if no child data
  if (!child) {
    navigate('/');
    return null;
  }

  const getReviewUrl = () => `${review_url}?nocache=${new Date().getTime()}`;

  const handleReviewSubmit = (review: {
    name: string;
    rating: number;
    comments: string;
  }) => {
    mutation.mutate(review);
  };

  const handleDownload = () => {
    if (child?.certificateUrl) {
      const link = document.createElement('a');
      link.href = child.certificateUrl;
      link.download = `${child.name}_certificate.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Certificate download started', {
        description: 'Your certificate is being downloaded.',
      });
    } else {
      toast.error('Download link not available', {
        description: 'Please try again later.',
      });
    }
  };

  const handleExit = () => {
    if (!hasSubmittedReview) {
      toast.error('Please submit your review first', {
        description: 'We value your feedback before you exit.',
      });
      return;
    }
    navigate('/');
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Header */}
      <header className='bg-white border-b border-gray-100 sticky top-0 z-10'>
        <div className='container mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <button
              onClick={handleExit}
              className='flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors duration-200 group'
            >
              <ArrowLeftIcon className='h-5 w-5 group-hover:-translate-x-0.5 transition-transform duration-200' />
              <span className='font-medium text-sm tracking-wide uppercase'>
                Back to Search
              </span>
            </button>
            <div className='flex items-center gap-4'>
              <img src='/sparklogo.png' alt='Sparklab' className='h-8 w-auto' />
              <span className='font-semibold text-lg text-gray-900 tracking-tight'>
                Certificate
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-6 py-12 max-w-4xl'>
        <div className='text-center space-y-4 my-10'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>
            Congratulations, {child.name}!
          </h1>
          <p className='text-lg text-gray-600 font-medium'>
            Successfully completed {child.course}
          </p>
        </div>

        {/* Welcome Letter */}
        <div className='bg-white border border-gray-200 rounded-2xl p-6 md:p-10 mb-16 shadow-xl'>
          <div className='flex items-start gap-4 md:gap-6 mb-8'>
            <div className='h-10 w-10 md:h-12 md:w-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0'>
              <EnvelopeIcon className='h-5 w-5 md:h-6 md:w-6 text-gray-600' />
            </div>
            <div>
              <h3 className='text-xl md:text-2xl font-bold text-gray-900 mb-2'>
                Welcome Letter
              </h3>
              <p className='text-gray-600 text-sm'>
                A message from our educational team
              </p>
            </div>
          </div>

          <div className='prose prose-base md:prose-lg max-w-none text-foreground space-y-4 md:space-y-6 leading-relaxed'>
            <p className='text-lg md:text-xl'>
              Dear Proud Parents and Guardians,
            </p>

            <p className='text-base md:text-lg'>
              We are thrilled to celebrate <strong>{child.name}</strong>'s completion of the{' '}
              <span className='text-sparklab-blue font-semibold'>
                First Stage
              </span>{' '}
              in our{' '}
              <span className='text-sparklab-blue font-semibold'>
                {child.course}
              </span>{' '}
              program. This shows <strong>{child.name}</strong>'s hard work and bright future in tech.
            </p>

            <p className='text-base md:text-lg'>
              <strong>{child.name}</strong> has learned key skills in {child.course}, like building projects and solving problems. They now think critically, work well with others, and love creating new things. <strong>{child.name}</strong> has grown so much and is ready for more.
            </p>

            <p className='text-base md:text-lg'>
              In the next stage, <strong>{child.name}</strong> will learn advanced topics, build complex projects, and explore new technologies. This will make <strong>{child.name}</strong> even stronger and prepare them for big opportunities.
            </p>

            <p className='text-base md:text-lg'>
              At Sparklab, we help kids like <strong>{child.name}</strong> succeed with great teachers and support. Your help as parents has made this possible.
            </p>

            <p className='text-base md:text-lg'>
              Keep <strong>{child.name}</strong>'s progress going—enroll them in the next cohort now. Spots are limited, and <strong>{child.name}</strong> deserves to keep learning without a break.
            </p>

            <p className='font-semibold text-base md:text-lg'>
              Sincerely,
              <br />
              The Sparklab Team
              <br />
              Sparklab Tech Training Center
            </p>

            <div className='border-t border-gray-200 pt-6 md:pt-8 mt-6 md:mt-8'>
              <h4 className='text-base md:text-lg font-semibold text-gray-900 mb-4'>
                Curriculum Completed
              </h4>
              <ul className='space-y-2'>
                {curriculum.completed.map((item, index) => (
                  <li
                    key={index}
                    className='text-gray-700 text-sm flex items-start'
                  >
                    <span className='text-sparklab-blue mr-2 mt-1.5'>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className='border-t border-gray-200 pt-6 md:pt-8'>
              <h4 className='text-base md:text-lg font-semibold text-gray-900 mb-4'>
                Assessment Metrics
              </h4>
              <div className='grid grid-cols-1 gap-3'>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-gray-700 text-sm'>
                    Project Completion Rate
                  </span>
                  <span className='font-medium text-sparklab-blue'>100%</span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-gray-700 text-sm'>
                    Average Assessment Score
                  </span>
                  <span className='font-medium text-sparklab-blue'>95%</span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-gray-700 text-sm'>
                    Peer Review Participation
                  </span>
                  <span className='font-medium text-sparklab-blue'>
                    Excellent
                  </span>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-6 md:pt-8'>
              <h4 className='text-base md:text-lg font-semibold text-gray-900 mb-4'>
                Next Stage Curriculum
              </h4>
              <ul className='space-y-2'>
                {curriculum.next.map((item, index) => (
                  <li
                    key={index}
                    className='text-gray-700 text-sm flex items-start'
                  >
                    <span className='text-sparklab-blue mr-2 mt-1.5'>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Strategic Enrollment CTA - After Reading Next Stage Curriculum */}
            <div className='border-t border-gray-200 pt-6 md:pt-8'>
              <div className='bg-gradient-to-r from-sparklab-blue/5 via-purple-50/50 to-sparklab-blue/5 border border-sparklab-blue/20 rounded-xl p-4 md:p-6 text-center'>
                <div className='flex justify-center mb-4'>
                  <div className='h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-sparklab-blue to-purple-600 flex items-center justify-center shadow-lg'>
                    <AcademicCapIcon className='h-5 w-5 md:h-6 md:w-6 text-white' />
                  </div>
                </div>

                <h4 className='text-base md:text-lg font-bold text-gray-900 mb-3'>
                  Keep <strong>{child?.name}</strong>'s Success Going Strong!
                </h4>

                <p className='text-gray-700 text-sm mb-4 leading-relaxed'>
                  <strong>{child?.name}</strong> is ready for the next level. They will learn advanced skills, build bigger projects, and explore new tech. Enroll now to keep their learning on track—spots fill up fast!
                </p>

                <Button
                  onClick={() =>
                    navigate('/enroll', {
                      state: {
                        child,
                        nextStageCourse: getNextStageCourse(
                          child?.course || ''
                        ),
                      },
                    })
                  }
                  className='bg-gradient-to-r from-sparklab-blue to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
                >
                  <AcademicCapIcon className='h-4 w-4 mr-2' />
                  Enroll Now - Don't Miss Out!
                </Button>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-6 md:pt-8'>
              <h5 className='text-base md:text-lg font-semibold text-gray-900 mb-4'>
                Additional Information
              </h5>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-sparklab-blue rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700 text-sm'>
                    Student{' '}
                    <span className='text-sparklab-blue font-medium'>
                      video presentations
                    </span>{' '}
                    are available to view their accomplishments
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-sparklab-blue rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700 text-sm'>
                    Contact{' '}
                    <span className='text-sparklab-blue font-medium'>
                      educators directly
                    </span>{' '}
                    for any questions or concerns
                  </p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-sparklab-blue rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700 text-sm'>
                    <span className='text-sparklab-blue font-medium'>
                      Next stage enrollment
                    </span>{' '}
                    information will be distributed shortly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Section */}
        <div className='mb-16 space-y-12'>
          <div className='text-center space-y-4'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>
              Congratulations, {child.name}!
            </h1>
            <p className='text-lg text-gray-600 font-medium'>
              Here is Your Certificate
            </p>
          </div>

          {/* Certificate Preview Image */}
          <div className='flex justify-center'>
            <div className='relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-300 group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] hover:-translate-y-2'>
              <img
                src='/certificate.png'
                alt='Certificate Preview - Sample certificate'
                className='w-full max-w-sm h-auto filter blur-md group-hover:blur-sm transition-all duration-700'
              />
              {/* Overlay to hide personal information */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none'></div>
              {/* Name obscuring overlay */}
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-16 bg-black/70 rounded-lg flex items-center justify-center shadow-lg'>
                <span className='text-white text-sm font-bold tracking-wide'>
                  [STUDENT NAME]
                </span>
              </div>
              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg backdrop-blur-sm'>
                SAMPLE PREVIEW
              </div>
            </div>
          </div>

          <div className='flex justify-center'>
            <Button
              onClick={handleDownload}
              className='bg-sparklab-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md border border-sparklab-blue hover:border-blue-700'
            >
              <ArrowDownTrayIcon className='h-4 w-4 mr-2' />
              Download Certificate
            </Button>
          </div>
        </div>

        {/* Review Form */}
        {!hasSubmittedReview ? (
          <div className='bg-white border border-gray-200 rounded-2xl p-6 md:p-10 shadow-xl'>
            <ReviewForm
              onSubmit={handleReviewSubmit}
              isSubmitting={mutation.isPending}
            />
          </div>
        ) : (
          <div className='bg-gray-50 border border-gray-300 rounded-2xl p-6 md:p-10 text-center shadow-xl'>
            <div className='flex justify-center mb-6'>
              <div className='h-16 w-16 rounded-xl bg-green-100 flex items-center justify-center'>
                <TrophyIcon className='h-8 w-8 text-green-600' />
              </div>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>
              Thank You!
            </h3>
            <p className='text-gray-600 text-sm mb-6 leading-relaxed'>
              Your review has been submitted successfully. You can now exit or
              download the certificate again.
            </p>
            <Button
              onClick={() => navigate('/')}
              className='bg-sparklab-blue hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors duration-200 shadow-sm hover:shadow-md border border-sparklab-blue hover:border-blue-700'
            >
              Return to Search
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default CertificatePage;
