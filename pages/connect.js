import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  connectToMetaMask, 
  hasMetaMask,
  formatAddress 
} from '../lib/web3';

export default function Connect() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [challenge, setChallenge] = useState('');
  const [signature, setSignature] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    const savedSignature = localStorage.getItem('signature');
    if (savedAddress && savedSignature) {
      router.push('/profile');
    }
  }, [router]);

  useEffect(() => {
    if (walletAddress) {
      // Generate challenge message for signature
      const challengeMessage = `I own the wallet ${walletAddress} and want to authenticate with NFTSongs`;
      setChallenge(challengeMessage);
    }
  }, [walletAddress]);

  const handleConnectWallet = async () => {
    try {
      setIsConnecting(true);
      setError('');
      
      const address = await connectToMetaMask();
      setWalletAddress(address);
    } catch (err) {
      console.error('Connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSignMessage = async () => {
    if (!walletAddress) return;

    try {
      setIsSigning(true);
      setError('');

      const { getSigner } = await import('../lib/web3');
      const signer = await getSigner();
      const sig = await signer.signMessage(challenge);
      setSignature(sig);
    } catch (err) {
      console.error('Signature error:', err);
      setError(err.message || 'Failed to sign message');
    } finally {
      setIsSigning(false);
    }
  };

  const handleAuthenticate = async () => {
    if (!walletAddress || !signature || !challenge) return;

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address: walletAddress,
          signature,
          challenge,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('walletAddress', walletAddress);
        router.push('/profile');
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setError(err.message || 'Failed to authenticate');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Connect Wallet</h1>
          <p className="mt-2 text-gray-600">
            Connect your wallet to access NFTSongs
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6">
          {!walletAddress ? (
            <div className="space-y-4">
              <div className="p-3 border rounded-lg text-center transition-colors border-primary-500 bg-primary-50">
                <div className="font-medium">MetaMask</div>
                <p className="text-sm text-gray-500 mt-1">
                  Connect using your MetaMask wallet
                </p>
                <button
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-sm text-gray-600 mb-1">Connected Wallet</div>
                <div className="font-mono text-lg font-semibold text-primary-600">
                  {formatAddress(walletAddress)}
                </div>
              </div>

              {!signature ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-2">Sign this message to authenticate:</div>
                    <div className="font-mono text-sm bg-white p-3 rounded border border-gray-200">
                      {challenge}
                    </div>
                  </div>

                  <button
                    onClick={handleSignMessage}
                    disabled={isSigning}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isSigning ? 'Signing...' : 'Sign Message'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center text-sm text-gray-600">
                    Message signed successfully!
                  </div>
                  <button
                    onClick={handleAuthenticate}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
