import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { apiBaseUrl, persistUserId } from "@/config/constants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TransactionType,
  PaymentMethod,
} from "@/components/transactions/enums-and-interfaces";
import { format, parseISO } from "date-fns";
import { useTransactionsPageContext } from "@/pages/dashboard/transactions/components/transactions-page-context";
import { useToast } from "@/hooks/use-toast";

interface APIErrorResponse {
  message: string;
}

const formSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Nome da Transação é obrigatório.",
  }),
  amount: z.number({
    required_error: "O valor é obrigatório.",
  }),
  /*.positive({
      message: "Valor da Transação deve ser positivo.",
    })*/ transaction_type: z.nativeEnum(TransactionType, {
    required_error: "Selecione o Tipo da Transação.",
  }),
  category: z
    .string({
      required_error: "Seleccione a Categoria da Transação.",
    })
    .nonempty("Seleccione a Categoria da Transação."),
  payment_method: z.nativeEnum(PaymentMethod, {
    required_error: "Selecione o Método de Pagamento.",
  }),
  date: z.date({
    required_error: "Seleccione a data da Transação.",
  }),
  transaction_id: z.number().optional(), // Optional field for updates
});

export type TransactionFormSchema = z.infer<typeof formSchema>;

export function useTransactions(valuesToEdit?: TransactionFormSchema) {
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const userId = sessionStorage.getItem(persistUserId);
  //const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { toast } = useToast();

  const { getTransactions } = useTransactionsPageContext();

  useEffect(() => {
    //getTransactions();
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 1. Define your form.
  const form = useForm<TransactionFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: valuesToEdit
      ? {
          ...valuesToEdit,
          amount: Number(valuesToEdit.amount),
          date: parseISO(valuesToEdit.date.toString()), // Ensure date is parsed correctly to Date FNS format and convert the date to string
        }
      : {
          name: "",
          // amount: 0,
          transaction_type: TransactionType.Deposit,
          category: "",
          payment_method: PaymentMethod.Credit_Card,
          date: new Date(), // Default to the current date
        },
  });

  // 2. Define a submit handler.
  const handleTransactionSave = async (
    values: TransactionFormSchema,
    transaction_id?: number,
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(transaction_id);

    try {
      setLoading(true);

      const method = transaction_id ? "put" : "post";
      const url = transaction_id
        ? `/update-transaction/${transaction_id}`
        : "/create-transaction";

      await axios[method](
        `${apiBaseUrl + url}`,
        {
          //data: { ...values, userId },
          name: values.name,
          amount: values.amount,
          transaction_type: values.transaction_type,
          category_id: Number(values.category),
          payment_method: values.payment_method,
          date: format(new Date(values.date), "yyyy-MM-dd HH:mm:ss"),
          user_id: userId,
        },
        {
          headers: {
            UserId: userId, // Custom request header
          },
        },
      );

      //setDialogIsOpen(false);
      form.reset();

      getTransactions();

      toast({
        variant: "success",
        title: "Successo",
        description: transaction_id
          ? "Transacção actualizada com sucesso!"
          : "Transacção adicionada com sucesso!",
      });
    } catch (error) {
      console.error(error);
      const axioError = error as AxiosError<APIErrorResponse>;
      const message =
        axioError.response?.data?.message ||
        "Occoreu um erro ao Adicionar a Transacção.";

      toast({
        variant: "destructive",
        title: "Error.",
        //description: axioError.message,
        description: message,
      });
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
    //transactions,
    categoriesLoading,
    categories,
    form,
    handleTransactionSave,
    //dialogIsOpen,
    //setDialogIsOpen,
  };
}
