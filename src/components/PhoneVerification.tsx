import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MailIcon } from 'lucide-react';
import {
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import emailjs from '@emailjs/browser';

interface PhoneVerificationProps {
  isOpen: boolean;
  childName: string;
  email: string;
  onVerify: (code: string) => Promise<boolean>;
  onClose: () => void;
}

const PhoneVerification = ({
  isOpen,
  childName,
  email,
  onVerify,
  onClose,
}: PhoneVerificationProps) => {
  const [userEmail, setUserEmail] = useState('');
  const [code, setCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [codeSent, setCodeSent] = useState(false);

  const handleSendCode = async () => {
    setError('');

    if (!userEmail.trim()) {
      setError('Please enter your email address');
      return;
    }

    // Check if user email matches child's email
    if (userEmail.toLowerCase() !== email?.toLowerCase()) {
      setError(
        'The email address does not match the one used during registration.'
      );
      return;
    }

    setIsSending(true);

    try {
      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);

      // Send email using EmailJS
      const templateParams = {
        email: email,
        verification_code: code,
        child_name: childName,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setCodeSent(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code.trim()) {
      setError('Please enter the verification code');
      return;
    }

    // Check if entered code matches generated code
    if (code !== generatedCode) {
      setError('Invalid verification code. Please try again.');
      setCode('');
      return;
    }

    setIsVerifying(true);
    const isValid = await onVerify(code);
    setIsVerifying(false);

    if (!isValid) {
      setError('Verification failed. Please try again.');
      setCode('');
    }
  };

  const handleClose = () => {
    setUserEmail('');
    setCode('');
    setGeneratedCode('');
    setError('');
    setCodeSent(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-md bg-white border border-gray-200 shadow-2xl rounded-2xl'>
        <DialogHeader>
          <div className='flex items-center justify-center mb-6'>
            <div className='h-14 w-14 rounded-2xl bg-sparklab-blue flex items-center justify-center shadow-lg'>
              <ShieldCheckIcon className='h-7 w-7 text-white' />
            </div>
          </div>
          <DialogTitle className='text-center text-2xl font-bold text-gray-900 mb-3'>
            Verify Your Identity
          </DialogTitle>
          <DialogDescription className='text-center text-gray-600 leading-relaxed'>
            To view{' '}
            <span className='font-semibold text-sparklab-blue'>{childName}'s</span>{' '}
            certificate, please verify your identity using the email address you
            used during registration.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6 mt-8'>
          <div className='space-y-4'>
            {!codeSent ? (
              <>
                <p className='text-center text-gray-600 mb-6 leading-relaxed'>
                  Enter the email address you used during registration to
                  receive a verification code
                </p>
                <div className='relative'>
                  <Input
                    type='email'
                    placeholder='Enter your email address'
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className='h-12 pl-12 pr-4 rounded-lg border border-gray-300 focus:border-sparklab-blue focus:ring-sparklab-blue/20 focus:ring-2 transition-colors duration-200 shadow-sm'
                    disabled={isSending}
                  />
                  <MailIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
                <Button
                  type='button'
                  onClick={handleSendCode}
                  className='w-full h-12 bg-sparklab-blue hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md border border-sparklab-blue hover:border-blue-700'
                  disabled={isSending}
                >
                  {isSending ? 'Sending Code...' : 'Send Code'}
                </Button>
              </>
            ) : (
              <>
                <p className='text-center text-gray-600 mb-6 leading-relaxed'>
                  Enter the verification code sent to your email
                </p>
                <div className='relative'>
                  <Input
                    type='text'
                    placeholder='Enter code'
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className='h-12 pl-12 pr-4 rounded-lg border border-gray-300 focus:border-sparklab-blue focus:ring-sparklab-blue/20 focus:ring-2 transition-colors duration-200 shadow-sm'
                    disabled={isVerifying}
                  />
                  <MailIcon className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                </div>
              </>
            )}
            {error && (
              <div className='flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-lg border border-red-200 shadow-sm'>
                <ExclamationTriangleIcon className='h-5 w-5 flex-shrink-0' />
                <span className='font-medium text-sm'>{error}</span>
              </div>
            )}
          </div>

          {codeSent && (
            <div className='flex gap-3'>
              <Button
                type='button'
                variant='outline'
                onClick={handleClose}
                className='flex-1 h-12 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200'
                disabled={isVerifying}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='flex-1 h-12 bg-sparklab-blue hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md border border-sparklab-blue hover:border-blue-700'
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying...' : 'Verify'}
              </Button>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneVerification;
