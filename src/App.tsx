import Router from "./Router";
import { AlertDialogRoot } from "./components/AlertDialogService/AlertDialogRoot";
import { LoadingProvider } from "./components/Loading/LoadingProvider";

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
        <Router />
        <AlertDialogRoot />
      </div>
    </div>
  );
};
export default App;
