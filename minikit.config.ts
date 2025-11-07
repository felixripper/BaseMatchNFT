// Minikit configuration for BaseMatchNFT Farcaster miniapp
export interface MinikitConfig {
  app: {
    id: string;
    name: string;
    version: string;
    description: string;
  };
  frames: {
    version: string;
    pages: Array<{
      path: string;
      title: string;
      description: string;
    }>;
  };
  wallet: {
    chains: Array<{
      id: number;
      name: string;
      network: string;
      nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
      };
      rpcUrls: {
        default: { http: string[] };
        public: { http: string[] };
      };
      blockExplorers: {
        default: {
          name: string;
          url: string;
        };
      };
      testnet?: boolean;
    }>;
    defaultChain: number;
    connectors: Array<{
      id: string;
      name: string;
      type: string;
    }>;
  };
  api: {
    baseUrl: string;
    endpoints: Record<string, string>;
  };
  features: {
    nftVerification: boolean;
    messaging: boolean;
    matching: boolean;
    notifications: boolean;
  };
  ui: {
    theme: string;
    primaryColor: string;
    borderRadius: string;
    animations: boolean;
  };
  environment: {
    development: {
      debug: boolean;
      mockData: boolean;
    };
    production: {
      debug: boolean;
      mockData: boolean;
    };
  };
}

export const minikitConfig: MinikitConfig = {
  // App configuration
  app: {
    id: 'basematch-nft',
    name: 'BaseMatchNFT',
    version: '1.0.0',
    description: 'Exclusive NFT-gated dating platform on Base Network',
  },

  // Frame configuration
  frames: {
    version: '1',
    pages: [
      {
        path: '/',
        title: 'BaseMatchNFT - Elite Connections',
        description: 'Find your perfect match in the exclusive NFT community on Base',
      },
      {
        path: '/discover',
        title: 'Discover - BaseMatchNFT',
        description: 'Swipe through curated profiles of NFT holders',
      },
      {
        path: '/matches',
        title: 'Matches - BaseMatchNFT',
        description: 'Your perfect matches await',
      },
      {
        path: '/profile',
        title: 'Profile - BaseMatchNFT',
        description: 'Manage your dating profile and NFT verification',
      },
      {
        path: '/messages',
        title: 'Messages - BaseMatchNFT',
        description: 'Chat with your matches',
      },
    ],
  },

  // Wallet and chain configuration
  wallet: {
    // Base network configuration
    chains: [
      {
        id: 8453, // Base mainnet
        name: 'Base',
        network: 'base',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ['https://mainnet.base.org'],
          },
          public: {
            http: ['https://mainnet.base.org'],
          },
        },
        blockExplorers: {
          default: {
            name: 'BaseScan',
            url: 'https://basescan.org',
          },
        },
      },
      {
        id: 84532, // Base Sepolia testnet
        name: 'Base Sepolia',
        network: 'base-sepolia',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
        },
        rpcUrls: {
          default: {
            http: ['https://sepolia.base.org'],
          },
          public: {
            http: ['https://sepolia.base.org'],
          },
        },
        blockExplorers: {
          default: {
            name: 'BaseScan',
            url: 'https://sepolia.basescan.org',
          },
        },
        testnet: true,
      },
    ],

    // Default chain
    defaultChain: 8453,

    // Wallet connection options
    connectors: [
      {
        id: 'coinbaseWallet',
        name: 'Coinbase Wallet',
        type: 'wallet',
      },
      {
        id: 'metaMask',
        name: 'MetaMask',
        type: 'wallet',
      },
      {
        id: 'walletConnect',
        name: 'WalletConnect',
        type: 'wallet',
      },
    ],
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      discover: '/api/discover',
      matches: '/api/matches',
      messages: '/api/messages',
      nft: '/api/nft',
    },
  },

  // Feature flags
  features: {
    nftVerification: true,
    messaging: true,
    matching: true,
    notifications: false, // Can be enabled later
  },

  // UI/UX configuration
  ui: {
    theme: 'dark',
    primaryColor: '#8B5CF6', // Purple theme
    borderRadius: '0.5rem',
    animations: true,
  },

  // Environment-specific settings
  environment: {
    development: {
      debug: true,
      mockData: true,
    },
    production: {
      debug: false,
      mockData: false,
    },
  },
};

export default minikitConfig;