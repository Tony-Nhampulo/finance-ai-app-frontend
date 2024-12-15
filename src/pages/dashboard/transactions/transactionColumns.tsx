"use client";

import { ColumnDef } from "@tanstack/react-table";
import TransactionTypeBadge from "./components/transaction-type-badge";
import RippleButton from "@/components/ui/rippleButton";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  PaymentMethod,
  Transaction_Payment_Method,
  TransactionCategory,
  TransactionType,
} from "@/components/transactions/enums-and-interfaces";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionProps = {
  id: number;
  name: string;
  amount: number;
  transaction_type: TransactionType;
  payment_method: PaymentMethod;
  date: Date;
  category: TransactionCategory;
  user_id: number;
};

export const transactionColumns: ColumnDef<TransactionProps>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "transaction_type",
    header: "Tipo da Transação",
    cell: ({ row: { original: transactionRow } }) => {
      return (
        <TransactionTypeBadge
          transaction_type={transactionRow.transaction_type}
        />
      );
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transactionRow } }) => {
      // Mapping `category` to the category name
      return transactionRow.category.name;
    },
  },
  {
    accessorKey: "payment_method",
    header: "Método de Pagamento",
    cell: ({ row: { original: transactionRow } }) => {
      return <>{Transaction_Payment_Method[transactionRow.payment_method]}</>;
    },
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transactionRow } }) => {
      return new Date(transactionRow.date).toLocaleDateString("pt-MZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    },
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transactionRow } }) => {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "MTN",
        useGrouping: true,
      }).format(transactionRow.amount);
    },
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => {
      return (
        <div>
          <RippleButton
            variant={"ghost"}
            size={"icon"}
            className="text-muted-foreground"
          >
            <PencilIcon />
          </RippleButton>

          <RippleButton
            variant={"ghost"}
            size={"icon"}
            className="text-muted-foreground"
          >
            <TrashIcon />
          </RippleButton>
        </div>
      );
    },
  },
];
