import { MongoClient } from 'mongodb';

async function initializeDatabase() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nftsongs';
  const client = new MongoClient(uri);

  try {
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db();
    
    // Create indexes for better performance
    console.log('Creating indexes...');
    
    // Users collection indexes
    await db.collection('users').createIndex({ address: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true, sparse: true });
    await db.collection('users').createIndex({ createdAt: -1 });
    await db.collection('users').createIndex({ lastLogin: -1 });

    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    // Users collection
    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log('Created "users" collection');
    }

    // NFTs collection (for future use)
    if (!collectionNames.includes('nfts')) {
      await db.createCollection('nfts');
      console.log('Created "nfts" collection');
      
      // Create indexes for NFTs collection
      await db.collection('nfts').createIndex({ contractAddress: 1, tokenId: 1 }, { unique: true });
      await db.collection('nfts').createIndex({ owner: 1 });
      await db.collection('nfts').createIndex({ collectionId: 1 });
      await db.collection('nfts').createIndex({ createdAt: -1 });
    }

    // Collections collection (for future use)
    if (!collectionNames.includes('collections')) {
      await db.createCollection('collections');
      console.log('Created "collections" collection');
      
      // Create indexes for collections collection
      await db.collection('collections').createIndex({ creator: 1 });
      await db.collection('collections').createIndex({ createdAt: -1 });
      await db.collection('collections').createIndex({ name: 1, creator: 1 }, { unique: true, sparse: true });
    }

    // Transactions collection (for future use)
    if (!collectionNames.includes('transactions')) {
      await db.createCollection('transactions');
      console.log('Created "transactions" collection');
      
      // Create indexes for transactions collection
      await db.collection('transactions').createIndex({ from: 1 });
      await db.collection('transactions').createIndex({ to: 1 });
      await db.collection('transactions').createIndex({ nftId: 1 });
      await db.collection('transactions').createIndex({ createdAt: -1 });
    }

    console.log('Database initialization completed successfully!');
    console.log('\nCollections created:');
    console.log('- users (for user authentication and profiles)');
    console.log('- nfts (for NFT metadata and ownership)');
    console.log('- collections (for NFT collections)');
    console.log('- transactions (for transaction history)');

    console.log('\nIndexes created for optimal performance');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('Database connection closed');
    process.exit(0);
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase();
}

export { initializeDatabase };