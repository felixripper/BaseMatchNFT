import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

interface FarcasterProviderProps {
  children: React.ReactNode;
}

export function FarcasterProvider({ children }: FarcasterProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const initializeFarcaster = async () => {
      try {
        // Initialize the SDK
        await sdk.actions.ready();

        // Get the context (user info, etc.)
        const appContext = await sdk.context;
        setContext(appContext);

        setIsReady(true);
        console.log('Farcaster miniapp initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Farcaster miniapp:', error);
        // If Farcaster initialization fails, continue without it
        setIsReady(true);
      }
    };

    initializeFarcaster();
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing Farcaster...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {children}
      {context && (
        <div className="fixed bottom-4 right-4 bg-card border rounded-lg p-3 shadow-lg max-w-xs">
          <div className="text-xs text-muted-foreground mb-1">Farcaster User</div>
          <div className="text-sm font-medium">
            {context.user?.displayName || context.user?.username || 'Anonymous'}
          </div>
          {context.user?.pfp && (
            <img
              src={context.user.pfp}
              alt="Profile"
              className="w-8 h-8 rounded-full mt-2"
            />
          )}
        </div>
      )}
    </>
  );
}

// Hook to access Farcaster context
export function useFarcaster() {
  const [context, setContext] = useState<any>(null);

  useEffect(() => {
    const getContext = async () => {
      try {
        const appContext = await sdk.context;
        setContext(appContext);
      } catch (error) {
        console.error('Failed to get Farcaster context:', error);
      }
    };

    getContext();
  }, []);

  const shareToFarcaster = async (text: string, url?: string) => {
    try {
      await sdk.actions.openUrl(`https://warpcast.com/~/compose?text=${encodeURIComponent(text)}${url ? `&url=${encodeURIComponent(url)}` : ''}`);
    } catch (error) {
      console.error('Failed to share to Farcaster:', error);
    }
  };

  return {
    context,
    shareToFarcaster,
    isInFarcaster: !!context,
  };
}