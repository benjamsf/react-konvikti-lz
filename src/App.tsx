import Router from "./Router";
import { AlertDialogRoot } from "./components/AlertDialogService/AlertDialogRoot";
import { LoadingProvider } from "./components/Loading/LoadingProvider";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";

function App() {
  return (
    <LoadingProvider>
      <Content />
    </LoadingProvider>
  );
}

const Content = () => {
  return (
    <div className="relative">
      <div className="opacity-100">
        <KindeProvider
          clientId={import.meta.env.VITE_KINDE_CLIENT_ID || ""}
          domain={import.meta.env.VITE_KINDE_DOMAIN || ""}
          redirectUri={window.location.origin}
          logoutUri={window.location.origin}
          isDangerouslyUseLocalStorage={import.meta.env.MODE === "development"}
        >
          <Router />
          <AlertDialogRoot />
        </KindeProvider>
      </div>
    </div>
  );
};
export default App;
