# NFTSongs - Web3 NFT Platform

A modern NFT platform built with Next.js, Web3, and MongoDB that enables users to create, mint, buy, sell, and trade non-fungible tokens on the Ethereum blockchain.

## Features

- 🔐 **Web3 Wallet Authentication** - Connect with MetaMask
- 👤 **User Profiles** - Manage your wallet and account information
- 🎨 **Modern UI** - Built with Tailwind CSS and responsive design
- 🗄️ **MongoDB Integration** - Scalable data storage for users and NFTs
- 🔗 **Ethereum Sepolia** - Deployed on Ethereum Sepolia testnet
- 🚀 **Next.js 13+** - Modern React framework with App Router

## Tech Stack

- **Frontend**: Next.js 13+, React 18, TypeScript
- **Web3**: ethers.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Wallet Support**: MetaMask

## Getting Started

### Prerequisites

- Node.js 22.14.0
- MongoDB (local or Atlas)
- MetaMask wallet

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nftsongs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your configuration:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/nftsongs
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nftsongs

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here



# Ethereum Network Configuration
NEXT_PUBLIC_NETWORK_ID=11155111 # Sepolia testnet
NEXT_PUBLIC_NETWORK_NAME=Sepolia
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── .env.local                # Environment variables
├── .gitignore
├── package.json              # Dependencies and scripts
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── jsconfig.json             # JavaScript configuration
├── README.md
├── pages/                    # Next.js pages and API routes
│   ├── api/                  # Backend API routes
│   │   ├── auth/             
│   │   │   └── connect.js    # Wallet connection endpoint
│   │   └── users/            
│   │       └── me.js         # User profile endpoint
│   ├── _app.js               # App wrapper with global styles
│   ├── _document.js          # Document structure
│   ├── index.js              # Home page (redirects to connect)
│   ├── connect.js            # Wallet connection page
│   └── profile.js            # User profile page
├── lib/                      # Utility libraries
│   ├── mongodb.js            # MongoDB connection
│   ├── auth.js               # Authentication utilities
│   └── web3.js               # Web3 provider configuration
└── styles/                   # Global styles
    └── globals.css
```

## API Endpoints

### Authentication
- `POST /api/auth/connect` - Authenticate with wallet signature
- `GET /api/users/me` - Get current user profile

## Authentication Flow

1. User visits the app and is redirected to `/connect`
2. User selects MetaMask wallet provider
3. User connects their wallet and approves the connection
4. User signs a challenge message to prove ownership
5. Backend verifies the signature and creates a JWT session
6. User is redirected to `/profile` with authenticated session

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

1. **New Pages**: Add files to `pages/` directory
2. **API Routes**: Add files to `pages/api/` directory
3. **Components**: Add reusable components in `components/` directory
4. **Utilities**: Add helper functions in `lib/` directory

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `NEXTAUTH_URL` | Next.js application URL | Yes |

| `NEXT_PUBLIC_NETWORK_ID` | Ethereum network ID | Yes |
| `NEXT_PUBLIC_NETWORK_NAME` | Network name | Yes |
| `NEXT_PUBLIC_RPC_URL` | Ethereum RPC URL | Yes |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Roadmap

- [ ] NFT minting functionality
- [ ] Marketplace for buying/selling NFTs
- [ ] Collection management
- [ ] IPFS integration for NFT storage
- [ ] Smart contract deployment
- [ ] Mobile application