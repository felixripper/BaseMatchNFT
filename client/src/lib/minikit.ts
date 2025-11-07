import { minikitConfig } from '../../../minikit.config';

export { minikitConfig };

// Utility functions for accessing configuration
export const getCurrentEnvironment = () => {
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

export const getEnvironmentConfig = () => {
  const env = getCurrentEnvironment() as keyof typeof minikitConfig.environment;
  return minikitConfig.environment[env];
};

export const getApiUrl = (endpoint: keyof typeof minikitConfig.api.endpoints) => {
  return `${minikitConfig.api.baseUrl}${minikitConfig.api.endpoints[endpoint]}`;
};

export const isFeatureEnabled = (feature: keyof typeof minikitConfig.features) => {
  return minikitConfig.features[feature];
};

export const getDefaultChain = () => {
  return minikitConfig.wallet.chains.find((chain: any) => chain.id === minikitConfig.wallet.defaultChain);
};