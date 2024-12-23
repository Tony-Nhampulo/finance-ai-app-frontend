import { Loader2 } from "lucide-react";

interface LoaderProps {
  text: string;
}

export default function Loader({ text }: LoaderProps) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {text}...
    </div>
  );
}
