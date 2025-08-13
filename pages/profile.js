import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { formatAddress } from '../lib/web3';

export default function Profile() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const address = localStorage.getItem('walletAddress');
      
      if (!address) {
        router.push('/connect');
        return;
      }

      try {
        const response = await fetch(`/api/users/profile?address=${address}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const userData = await response.json();
        setWalletAddress(userData.walletAddress);
        setLoading(false);
      } catch (err) {
        console.error('Profile fetch error:', err);
        router.push('/connect');
      }
    };

    checkAuth();
  }, [router]);

  const handleDisconnect = () => {
    localStorage.removeItem('walletAddress');
    router.push('/connect');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Disconnect Wallet
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Connected Wallet</div>
                <div className="font-mono text-lg font-semibold text-gray-900">
                  {formatAddress(walletAddress)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
