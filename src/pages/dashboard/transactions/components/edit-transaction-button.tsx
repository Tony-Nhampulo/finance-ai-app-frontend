import UpsertTransactionDialog from "@/components/transactions/upsert-transaction-dialog";
import RippleButton from "@/components/ui/rippleButton";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import { TransactionProps } from "../transactionColumns";

interface EditTransactionButtonProps {
  transaction: TransactionProps;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <RippleButton
        variant={"ghost"}
        size={"icon"}
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </RippleButton>

      <UpsertTransactionDialog
        dialogIsOpen={dialogIsOpen}
        setDialogIsOpen={setDialogIsOpen}
        valuesToEdit={{
          ...transaction,
          category: transaction.category.id.toString(), // Destructuring `category` to get the category id only, and convert it to string.
          transaction_id: transaction.id, // Adding the transaction id to valuesToEdit
        }}
      />
    </>
  );
};

export default EditTransactionButton;
