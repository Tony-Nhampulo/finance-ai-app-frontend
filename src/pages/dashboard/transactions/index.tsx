import { Loader } from "lucide-react";
import { DataTable } from "./data-table";
import { transactionColumns } from "./transactionColumns";
import AddTransactionButton from "@/components/add-transaction-button";
//import { useTransactionsPageContext } from "@/pages/dashboard/transactions/components/transactions-page-context";
import { useTransactions } from "@/hooks/dashboard/useTransactions";

const TransactionsPage = () => {
  // const { transactions, loading } = useTransactionsPageContext();
  const { transactions, transactionsLoading } = useTransactions();

  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>
      <div>
        {transactionsLoading ? (
          <div className="flex h-5 items-center justify-center">
            <>
              <Loader className="mr-2 h-5 w-5 animate-spin" /> Carregando...
            </>
          </div>
        ) : (
          <DataTable columns={transactionColumns} data={transactions} />
        )}
      </div>
    </div>
  );
};

export default TransactionsPage;
