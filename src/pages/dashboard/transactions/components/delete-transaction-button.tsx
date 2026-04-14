import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import RippleButton from "@/components/ui/rippleButton";
import { Trash, Trash2 } from "lucide-react";

interface DeleteTransactionButtonProps {
  transactionId: number;
}

const DeleteTransactionButton = ({
  transactionId,
}: DeleteTransactionButtonProps) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <RippleButton
            variant={"ghost"}
            size={"icon"}
            className="text-muted-foreground"
          >
            <Trash />
          </RippleButton>
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[90%] rounded-md px-3 sm:max-w-[425px] md:min-w-[480px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que pretende eliminar a Transação?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Uma vez eliminada a Transação, não será possível recuperá-la.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {}}>
              <Trash2 /> Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteTransactionButton;
