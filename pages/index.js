import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const walletAddress = localStorage.getItem('walletAddress');
      
      if (walletAddress) {
        // User has a connected wallet, redirect to profile
        router.push('/profile');
      } else {
        // No wallet connected, redirect to connect page
        router.push('/connect');
      }
    };

    checkAuth();
  }, [router]);

  // Render a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-xl">Loading...</div>
    </div>
  );
}
