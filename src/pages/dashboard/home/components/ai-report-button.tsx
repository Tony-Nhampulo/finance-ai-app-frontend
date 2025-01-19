import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RippleButton from "@/components/ui/rippleButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGenerateReport } from "@/hooks/dashboard/useGenerateReport";
import { BotIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Markdown from "react-markdown";

const AiReportButton = () => {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year")?.toString() || "";
  const month = searchParams.get("month")?.toString() || "";

  const { handleGenerateReportClick, loading, generatedReport } =
    useGenerateReport();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          Gerar Relatório
          <BotIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] rounded-md">
        <DialogHeader className="space-y-2">
          <DialogTitle>
            Gerar Relatório com Inteligência Artificial (IA)
          </DialogTitle>
          <DialogDescription className="text-justify">
            Relatório detalhado e personalizado gerado por Inteligência
            Artificial com base nos seus dados financeiros.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[450px] prose text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white prose-strong:font-bold prose-p:text-justify prose-ul:text-justify">
          <Markdown>{generatedReport}</Markdown>
        </ScrollArea>

        <DialogFooter className="max-sm:gap-3">
          <DialogClose asChild>
            <RippleButton variant={"outline"}>Cancelar</RippleButton>
          </DialogClose>

          <RippleButton
            onClick={() => handleGenerateReportClick({ year, month })}
          >
            {loading ? (
              <Loader text="Gerando relatório" />
            ) : (
              <> Gerar relatório</>
            )}
          </RippleButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AiReportButton;
