import { api } from "@/services/api";
import { useQuery } from "react-query";

export function useTransactionsSummarys(year: string, month: string) {
  const {
    data: transactionsSummary,
    isLoading: transactionsSumaryLoading,
    refetch: getTransactionsSummary,
  } = useQuery(
    ["transactions-summary", { year, month }],
    async ({ queryKey }) => {
      const [, params] = queryKey as [string, { year: string; month: string }];
      const response = await api.get(`/get-transactions-summary`, {
        params: {
          year: params.year,
          month: params.month,
        },
      });
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  const {
    data: transactionsPercentage,
    isLoading: transactionsPercentageLoading,
    refetch: getTransactionsPercentage,
  } = useQuery(
    ["transactions-percentage", { year, month }],
    async ({ queryKey }) => {
      const [, params] = queryKey as [string, { year: string; month: string }];
      const response = await api.get(`/get-transactions-percentage`, {
        params: {
          year: params.year,
          month: params.month,
        },
      });
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  const {
    data: percentageExpensesPerCategory,
    isLoading: percentageExpensesPerCategoryLoading,
    refetch: getPercentageExpensesPerCategory,
  } = useQuery(
    ["percentage-expenses-per-category", { year, month }],
    async ({ queryKey }) => {
      const [, params] = queryKey as [string, { year: string; month: string }];
      const response = await api.get(`/get-percentage-expanses-per-category`, {
        params: {
          year: params.year,
          month: params.month,
        },
      });
      return response.data;
    },
    {
      refetchOnWindowFocus: true,
    }
  );

  return {
    transactionsSummary,
    transactionsSumaryLoading,
    getTransactionsSummary,
    transactionsPercentage,
    transactionsPercentageLoading,
    getTransactionsPercentage,
    percentageExpensesPerCategory,
    percentageExpensesPerCategoryLoading,
    getPercentageExpensesPerCategory,
  };
}
