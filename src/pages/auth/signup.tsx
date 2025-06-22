// pages/auth/signin.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useModal } from '@/context/ModalContext'; // Adjust path
import SignUpForm from '@/components/forms/SignUpForm'; // Adjust path

const SignUpPage = () => {
  const router = useRouter();
  const { openModal } = useModal();

  useEffect(() => {
    // This effect runs only once on mount of this page.
    // Immediately open the modal.
    openModal(
      "Log in to your account",
      <SignUpForm
        onSuccess={() => {
          // After successful sign-in from the modal, redirect to dashboard or desired page
          router.push('/dashboard');
        }}
      />
    );
  }, []);

 
  return (
    <div className="flex justify-center items-center h-screen bg-transparent">
      <p>Loading login...</p>
      {/* The Modal component is rendered globally in _app.tsx, so it will appear */}
    </div>
  );
};

export default SignUpPage;