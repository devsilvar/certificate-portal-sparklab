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
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'sonner';

const CertificatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const child = location.state?.child as Child | undefined;
  const [hasSubmittedReview, setHasSubmittedReview] = useState(false);

  const review_url = import.meta.env.VITE_REVIEW_API_URL;

  // Curriculum data based on course
  const getCurriculumData = (course: string) => {
    const curricula: Record<string, { completed: string[], next: string[] }> = {
      'Web Development': {
        completed: [
          'HTML Fundamentals and Semantic Structure',
          'CSS Styling and Responsive Design',
          'JavaScript Programming Basics',
          'Version Control with Git'
        ],
        next: [
          'Advanced JavaScript and Frameworks (React/Vue)',
          'Backend Development with Node.js',
          'Database Design and Management',
          'API Development and Integration'
        ]
      },
      'Python and AI': {
        completed: [
          'Python Programming Fundamentals',
          'Data Structures and Algorithms',
          'Introduction to Machine Learning',
          'Data Analysis with Pandas'
        ],
        next: [
          'Advanced Machine Learning Algorithms',
          'Deep Learning with TensorFlow',
          'Computer Vision Applications',
          'Natural Language Processing'
        ]
      },
      'Robotics': {
        completed: [
          'Introduction to Robotics',
          'Arduino Programming Basics',
          'Sensor Integration and Control',
          'Basic Electronics and Circuits'
        ],
        next: [
          'Advanced Robotics Systems',
          'Computer Vision for Robotics',
          'Autonomous Navigation',
          'AI Integration in Robotics'
        ]
      }
    };

    // Default to Web Development if course not found
    return curricula[course] || curricula['Web Development'];
  };

  const curriculum = child ? getCurriculumData(child.course) : { completed: [], next: [] };

  const mutation = useMutation({
    mutationFn: async (review: { name: string; rating: number; comments: string }) => {
      const params = new URLSearchParams();
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
              <span className='font-medium text-sm tracking-wide uppercase'>Back to Search</span>
            </button>
            <div className='flex items-center gap-4'>
              <img
                src='/sparklogo.png'
                alt='Sparklab'
                className='h-8 w-auto'
              />
              <span className='font-semibold text-lg text-gray-900 tracking-tight'>Certificate</span>
            </div>
          </div>
        </div>
      </header>

      <main className='container mx-auto px-6 py-12 max-w-4xl'>
        {/* Certificate Section */}
        <div className='mb-16 space-y-12'>
          <div className='text-center space-y-4'>
            <h1 className='text-3xl md:text-4xl font-bold text-gray-900 tracking-tight'>
              Congratulations, {child.name}!
            </h1>
            <p className='text-lg text-gray-600 font-medium'>
              Successfully completed {child.course}
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
                <span className='text-white text-sm font-bold tracking-wide'>[STUDENT NAME]</span>
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

        {/* Welcome Letter */}
        <div className='bg-white border border-gray-200 rounded-2xl p-10 mb-16 shadow-xl'>
          <div className='flex items-start gap-6 mb-8'>
            <div className='h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0'>
              <EnvelopeIcon className='h-6 w-6 text-gray-600' />
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 mb-2'>
                Welcome Letter
              </h3>
              <p className='text-gray-600 text-sm'>
                A message from our educational team
              </p>
            </div>
          </div>

          <div className='prose prose-lg md:prose-xl max-w-none text-foreground space-y-6 leading-relaxed'>
            <p className='text-xl'>Dear Parents and Guardians,</p>

            <p className='text-lg'>
              We are thrilled to announce the successful completion of the <span className='text-sparklab-blue font-semibold'>First Stage</span> in the <span className='text-sparklab-blue font-semibold'>Web Development</span> education program. This significant milestone marks a period of substantial growth, dedicated learning, and remarkable achievement for each of our students.
            </p>

            <p className='text-lg'>
              Throughout this cohort, students have demonstrated exceptional commitment, resilience, and curiosity. They have not only mastered the curriculum but have also developed <span className='text-sparklab-blue font-semibold'>critical thinking skills</span>, <span className='text-sparklab-blue font-semibold'>collaborative spirit</span>, and a passion for lifelong learning. We are incredibly proud of their accomplishments and the progress they have made.
            </p>

            <p className='text-lg'>
              The tech program is designed to foster a nurturing and challenging environment where students can thrive academically, socially, and emotionally. The dedication of our educators, coupled with the unwavering support from our parents and guardians, has been instrumental in the success of our students.
            </p>

            <p className='text-lg'>
              We invite you to celebrate this momentous occasion with us as we look forward to the <span className='text-sparklab-blue font-semibold'>next stage</span> of their educational journey. Your continued involvement and support are invaluable as we work together to empower these young minds to reach their full potential.
            </p>

            <p className='font-semibold text-lg'>
              Sincerely,
              <br />
              The Sparklab Team
              <br />
              Sparklab Tech Training Center
            </p>

            <div className='border-t border-gray-200 pt-8 mt-8'>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>Curriculum Completed</h4>
              <ul className='space-y-2'>
                {curriculum.completed.map((item, index) => (
                  <li key={index} className='text-gray-700 text-sm flex items-start'>
                    <span className='text-sparklab-blue mr-2 mt-1.5'>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className='border-t border-gray-200 pt-8'>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>Assessment Metrics</h4>
              <div className='grid grid-cols-1 gap-3'>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-gray-700 text-sm'>Project Completion Rate</span>
                  <span className='font-medium text-sparklab-blue'>100%</span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-gray-700 text-sm'>Average Assessment Score</span>
                  <span className='font-medium text-sparklab-blue'>95%</span>
                </div>
                <div className='flex justify-between items-center py-2'>
                  <span className='text-gray-700 text-sm'>Peer Review Participation</span>
                  <span className='font-medium text-sparklab-blue'>Excellent</span>
                </div>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-8'>
              <h4 className='text-lg font-semibold text-gray-900 mb-4'>Next Stage Curriculum</h4>
              <ul className='space-y-2'>
                {curriculum.next.map((item, index) => (
                  <li key={index} className='text-gray-700 text-sm flex items-start'>
                    <span className='text-sparklab-blue mr-2 mt-1.5'>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className='border-t border-gray-200 pt-8'>
              <h5 className='text-lg font-semibold text-gray-900 mb-4'>Additional Information</h5>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-sparklab-blue rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700 text-sm'>Student <span className='text-sparklab-blue font-medium'>video presentations</span> are available to view their accomplishments</p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-sparklab-blue rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700 text-sm'>Contact <span className='text-sparklab-blue font-medium'>educators directly</span> for any questions or concerns</p>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-1.5 h-1.5 bg-sparklab-blue rounded-full mt-2 flex-shrink-0'></div>
                  <p className='text-gray-700 text-sm'><span className='text-sparklab-blue font-medium'>Next stage enrollment</span> information will be distributed shortly</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form */}
        {!hasSubmittedReview ? (
          <div className='bg-white border border-gray-200 rounded-2xl p-10 shadow-xl'>
            <ReviewForm
              onSubmit={handleReviewSubmit}
              isSubmitting={mutation.isPending}
            />
          </div>
        ) : (
          <div className='bg-gray-50 border border-gray-300 rounded-2xl p-10 text-center shadow-xl'>
            <div className='flex justify-center mb-6'>
              <div className='h-16 w-16 rounded-xl bg-green-100 flex items-center justify-center'>
                <TrophyIcon className='h-8 w-8 text-green-600' />
              </div>
            </div>
            <h3 className='text-xl font-semibold text-gray-900 mb-3'>
              Thank You!
            </h3>
            <p className='text-gray-600 text-sm mb-6 leading-relaxed'>
              Your review has been submitted successfully. You can now exit or download the certificate again.
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
