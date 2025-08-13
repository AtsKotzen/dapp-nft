import clientPromise from '../../../lib/mongodb';
import { ethers } from 'ethers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { address, signature, challenge } = req.body;

    if (!address || !signature || !challenge) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Verify the signature
    const signerAddress = ethers.verifyMessage(challenge, signature);
    
    if (signerAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db();
    
    // Update or create user document
    const result = await db.collection('users').updateOne(
      { walletAddress: address.toLowerCase() },
      { 
        $set: { 
          walletAddress: address.toLowerCase(),
          signature: signature,
          lastAuthenticated: new Date(),
        }
      },
      { upsert: true }
    );

    return res.status(200).json({ 
      success: true,
      walletAddress: address.toLowerCase()
    });

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
