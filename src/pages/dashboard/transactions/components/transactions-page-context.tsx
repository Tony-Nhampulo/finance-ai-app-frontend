import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl, persistUserId } from "@/config/constants";
import { TransactionProps } from "../transactionColumns";

interface TransactionsPageContextProps {
  transactions: TransactionProps[]; // Replace `any`[] with your transaction type.
  loading: boolean;
  getTransactions: () => void;
}

const TransactionsPageContext = createContext<
  TransactionsPageContextProps | undefined
>(undefined);

export const TransactionsPageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem(persistUserId);

  const getTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiBaseUrl}/get-transactions`, {
        headers: {
          UserId: userId, // Custom request header
        },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TransactionsPageContext.Provider
      value={{ transactions, loading, getTransactions }}
    >
      {children}
    </TransactionsPageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTransactionsPageContext = (): TransactionsPageContextProps => {
  const context = useContext(TransactionsPageContext);
  if (!context) {
    throw new Error(
      "useTransactionsPageContext must be used within a TransactionsProvider",
    );
  }
  return context;
};
