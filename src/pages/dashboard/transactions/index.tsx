import { Button } from "@/components/ui/button";
import { useTransactions } from "@/hooks/dashboard/useTransactions";
import { ArrowDown01Icon, Loader } from "lucide-react";
import { DataTable } from "./data-table";
import { transactionColumns } from "./transactionColumns";

const TransactionsPage = () => {
  const { transactions, loading } = useTransactions();
  return (
    <div className="space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <Button className="rounded-full">
          Adicionar Transação
          <ArrowDown01Icon />
        </Button>
      </div>
      <div>
        {loading ? (
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
