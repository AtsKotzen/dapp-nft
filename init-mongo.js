db.createUser({
  user: 'admin',
  pwd: 'password123',
  roles: [{ role: 'readWrite', db: 'nftsongs' }]
});

// Create collections
db.createCollection('users');
db.createCollection('nfts');

// Create indexes
db.users.createIndex({ "walletAddress": 1 }, { unique: true });
db.nfts.createIndex({ "tokenId": 1 }, { unique: true });
db.nfts.createIndex({ "owner": 1 });
