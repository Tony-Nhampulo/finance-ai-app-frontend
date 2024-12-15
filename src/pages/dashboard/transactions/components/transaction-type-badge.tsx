import { Badge } from "@/components/ui/badge";
import { TransactionType } from "../transactionColumns";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction_type: TransactionType;
}

const TransactionTypeBadge = ({
  transaction_type,
}: TransactionTypeBadgeProps) => {
  if (transaction_type === TransactionType.Deposit) {
    return (
      <Badge className="rounded-full bg-muted font-bold text-primary hover:bg-muted">
        <CircleIcon className="mr-2 fill-primary" size={10} />
        Depósito
      </Badge>
    );
  }

  if (transaction_type === TransactionType.Expense) {
    return (
      <Badge className="text-error bg-error rounded-full bg-opacity-10 font-bold hover:bg-muted">
        <CircleIcon className="fill-error mr-2" size={10} />
        Despesa
      </Badge>
    );
  }

  return (
    <Badge className="rounded-full bg-white bg-opacity-10 font-bold text-white hover:bg-muted">
      <CircleIcon className="mr-2 fill-white" size={10} />
      Investimento
    </Badge>
  );
};

export default TransactionTypeBadge;
