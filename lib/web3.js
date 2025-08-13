import { ethers } from 'ethers';

// Web3 configuration
export const web3Config = {
  network: {
    chainId: parseInt(process.env.NEXT_PUBLIC_NETWORK_ID || '11155111'),
    chainName: process.env.NEXT_PUBLIC_NETWORK_NAME || 'Sepolia',
    rpcUrls: [process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID'],
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18
    },
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  }
};

// Check if MetaMask is installed
export const hasMetaMask = () => {
  return typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;
};



// Get provider
export const getProvider = () => {
  if (typeof window === 'undefined') return null;
  
  if (window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  
  return null;
};

// Connect to MetaMask
export const connectToMetaMask = async () => {
  if (!hasMetaMask()) {
    throw new Error('MetaMask is not installed');
  }

  try {
    const provider = getProvider();
    const accounts = await provider.send('eth_requestAccounts', []);
    return accounts[0];
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw error;
  }
};

// Get a signer instance
export const getSigner = async () => {
  const provider = getProvider();
  if (!provider) {
    throw new Error('No provider available');
  }
  return await provider.getSigner();
};

// Format ethereum address to display format (0x1234...5678)
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};



// Generic wallet connection
export const connectWallet = async () => {
  return await connectToMetaMask();
};

// Disconnect wallet
export const disconnectWallet = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.removeAllListeners('accountsChanged');
    window.ethereum.removeAllListeners('chainChanged');
  }
};

// Listen for account changes
export const onAccountChange = (callback) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.on('accountsChanged', callback);
  }
};

// Listen for chain changes
export const onChainChange = (callback) => {
  if (typeof window !== 'undefined' && window.ethereum) {
    window.ethereum.on('chainChanged', callback);
  }
};

// Switch network
export const switchNetwork = async () => {
  if (!hasMetaMask()) {
    throw new Error('MetaMask is not installed');
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${web3Config.network.chainId.toString(16)}` }]
    });
  } catch (error) {
    console.error('Error switching network:', error);
    throw error;
  }
};

// Get current network
export const getCurrentNetwork = async () => {
  const provider = getProvider();
  if (!provider) return null;
  
  const network = await provider.getNetwork();
  return network;
};