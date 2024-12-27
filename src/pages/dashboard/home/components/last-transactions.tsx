import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RippleButton from "@/components/ui/rippleButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { TransactionProps } from "../../transactions/transactionColumns";
import { formatDateValue } from "@/components/transactions/format-date-value";
import { formatCurrency } from "@/components/transactions/format-currency";
import {
  Transaction_Payment_Method,
  Transaction_Payment_Method_Icons,
} from "@/components/transactions/enums-and-interfaces";

interface LastTransactionsProps {
  lastTransactions: TransactionProps[];
}

const LastTransactions = ({ lastTransactions }: LastTransactionsProps) => {
  const getAmountColor = (transaction: TransactionProps) => {
    if (transaction.transaction_type === "Expense") {
      return "text-error";
    }

    if (transaction.transaction_type === "Deposit") {
      return "text-primary";
    }

    return "text-white";
  };

  const getAmountPrefix = (transaction: TransactionProps) => {
    if (transaction.transaction_type === "Deposit") {
      return "+";
    }

    return "-";
  };

  return (
    <div className="rounded-lg border">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="font-bold ">Últimas Transacções</CardTitle>

        <RippleButton variant={"outline"} asChild>
          <Link to="/dashboard/transactions">Ver todas</Link>
        </RippleButton>
      </CardHeader>

      <ScrollArea>
        <CardContent className="space-y-6">
          {lastTransactions &&
            lastTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3 ">
                  <div className="bg-white bg-opacity-[3%] p-3 rounded-lg">
                    <img
                      src={
                        Transaction_Payment_Method_Icons[
                          transaction.payment_method
                        ]
                      }
                      width={20}
                      height={20}
                      alt={
                        Transaction_Payment_Method[transaction.payment_method]
                      }
                    />
                  </div>

                  <div>
                    <p className="text-sm font-bold">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDateValue(transaction.date, "short")}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm font-bold ${getAmountColor(transaction)}`}
                >
                  {getAmountPrefix(transaction)}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
        </CardContent>
      </ScrollArea>
    </div>
  );
};

export default LastTransactions;
