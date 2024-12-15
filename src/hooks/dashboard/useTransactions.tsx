import axios from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl, persistUserId } from "@/config/constants";

export function useTransactions() {
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const userId = sessionStorage.getItem(persistUserId);

  useEffect(() => {
    getTransactions();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getCategories = async () => {
    try {
      setCategoriesLoading(true);

      const response = await axios.get(`${apiBaseUrl}/transaction-categories`, {
        headers: {
          UserId: userId, // Custom request header
        },
      });

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  return {
    loading,
    transactions,
    categoriesLoading,
    categories,
  };
}
