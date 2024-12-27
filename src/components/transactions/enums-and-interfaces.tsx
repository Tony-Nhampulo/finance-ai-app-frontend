// Traduzindo os enums do metodo de pagamentos de Inglês para Portugês
export const Transaction_Payment_Method = {
  Credit_Card: "Cartão de Crédito",
  Debit_Card: "Cartão de Débito",
  Bank_Transfer: "Transferência Bancária",
  Cash: "Numerário",
  Other: "Outro",
};

// Definindo os enums para os tipos de transações:
export enum TransactionType {
  Deposit = "Deposit",
  Expense = "Expense",
  Investment = "Investment",
}

export enum PaymentMethod {
  Credit_Card = "Credit_Card",
  Debit_Card = "Debit_Card",
  Bank_Transfer = "Bank_Transfer",
  Cash = "Cash",
  Other = "Other",
}

export interface TransactionCategory {
  id: number;
  name: string;
}

// Traduzindo os enums do Tipo de Transações de Inglês para Portugês
export const Transaction_Type_Options = [
  {
    value: TransactionType.Deposit,
    label: "Depósito",
  },
  {
    value: TransactionType.Expense,
    label: "Despesa",
  },
  {
    value: TransactionType.Investment,
    label: "Investimento",
  },
];

export const Transaction_Payment_Method_Options = [
  {
    value: PaymentMethod.Credit_Card,
    label: "Cartão de Crédito",
  },
  {
    value: PaymentMethod.Debit_Card,
    label: "Cartão de Débito",
  },
  {
    value: PaymentMethod.Bank_Transfer,
    label: "Transferência Bancária",
  },
  {
    value: PaymentMethod.Cash,
    label: "Numerário",
  },
  {
    value: PaymentMethod.Other,
    label: "Outro",
  },
];

export const Transaction_Payment_Method_Icons = {
  [PaymentMethod.Credit_Card]: "src/assets/credit-card.svg",
  [PaymentMethod.Debit_Card]: "src/assets/debit-card.svg",
  [PaymentMethod.Bank_Transfer]: "src/assets/bank-transfer.svg",
  [PaymentMethod.Cash]: "src/assets/cash.svg",
  [PaymentMethod.Other]: "src/assets/other.svg",
};
