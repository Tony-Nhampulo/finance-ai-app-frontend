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

  return {
    transactionsSummary,
    transactionsSumaryLoading,
    getTransactionsSummary,
  };
}
