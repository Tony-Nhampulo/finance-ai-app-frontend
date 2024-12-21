import UpsertTransactionDialog from "./transactions/upsert-transaction-dialog";
import { Button } from "./ui/button";
import { ArrowDown01Icon } from "lucide-react";
import { useState } from "react";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button className="rounded-full" onClick={() => setDialogIsOpen(true)}>
        Adicionar Transação
        <ArrowDown01Icon />
      </Button>

      <UpsertTransactionDialog
        dialogIsOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
      />
    </>
  );
};

export default AddTransactionButton;
