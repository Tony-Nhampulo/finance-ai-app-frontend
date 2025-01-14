import UpsertTransactionDialog from "./transactions/upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDown01Icon } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddTransactionButtonProps {
  canUserAddTransactions: boolean | undefined;
}

const AddTransactionButton = ({
  canUserAddTransactions,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  // console.log(canUserAddTransactions);
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full"
              onClick={() => setDialogIsOpen(true)}
              disabled={!canUserAddTransactions}
            >
              Adicionar Transação
              <ArrowDown01Icon />
            </Button>
          </TooltipTrigger>

          {!canUserAddTransactions && (
            <TooltipContent className="bg-zinc-900">
              Atingiu o limite máximo de transações, actualize para o Plano
              <br />
              Premium para adicionar transações ilimitadas.
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <UpsertTransactionDialog
        dialogIsOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
