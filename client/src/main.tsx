import { createRoot } from "react-dom/client";
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <OnchainKitProvider
    apiKey={import.meta.env.VITE_ONCHAINKIT_API_KEY || "demo-api-key"}
    chain={base}
  >
    <App />
  </OnchainKitProvider>
);
