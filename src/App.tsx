import { ThemeProvider } from "@/components/theme-provider";
import { MyRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { persistUserId } from "./config/constants";

function App() {
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      sessionStorage.setItem(persistUserId, userId); // Persistindo userId no navegador para melhor uso nas requisções da API
    }
  }, [isSignedIn, userId]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
