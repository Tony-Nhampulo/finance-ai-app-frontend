import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="text-primary flex items-center justify-center gap-2 text-center text-2xl font-bold">
        <p>Finance AI app</p>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
