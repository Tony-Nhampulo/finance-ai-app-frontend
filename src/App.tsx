import { ThemeProvider } from "@/components/theme-provider";
import { MyRoutes } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
