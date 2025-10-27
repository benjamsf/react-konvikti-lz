import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import App from "./App";
import "./index.css";
import "./i18n";

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Remove unnecessary type assertions
const domain = import.meta.env.VITE_KINDE_DOMAIN || "default-domain";
const clientId = import.meta.env.VITE_KINDE_CLIENT_ID || "default-client-id";

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <KindeProvider
      clientId={clientId}
      domain={domain}
      redirectUri={window.location.origin}
      logoutUri={window.location.origin}
      isDangerouslyUseLocalStorage={import.meta.env.MODE === "development"}
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </KindeProvider>
  </React.StrictMode>,
);
