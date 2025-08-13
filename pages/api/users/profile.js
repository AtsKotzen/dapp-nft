import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const walletAddress = req.query.address;

    if (!walletAddress) {
      return res.status(400).json({ message: 'Wallet address is required' });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const user = await db.collection('users').findOne(
      { walletAddress: walletAddress.toLowerCase() },
      { projection: { signature: 0 } } // Exclude signature from response
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
