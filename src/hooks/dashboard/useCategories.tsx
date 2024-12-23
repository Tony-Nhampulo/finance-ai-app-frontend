import { AxiosError } from "axios";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { useQuery } from "react-query";
import { persistUserId } from "@/config/constants";

interface APIErrorResponse {
  message: string;
}

const formSchema = z.object({
  name: z.string().trim().min(3, {
    message: "Nome da Categoria é obrigatório.",
  }),
  category_id: z.number().optional(), // Optional field for updates
});

export type CategoryFormSchema = z.infer<typeof formSchema>;

export function useCategories(valuesToEdit?: CategoryFormSchema) {
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem(persistUserId);
  const { toast } = useToast();

  const {
    data: categories,
    isLoading: categoriesLoading,
    refetch: getCategories,
  } = useQuery("categories", async () => {
    const response = await api.get(`/transaction-categories`);
    return response.data;
  });

  // 1. Define your form.
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: valuesToEdit ?? {
      name: "",
    },
  });

  // 2. Define a submit handler.
  const handleCategorySave = async (
    values: CategoryFormSchema,
    category_id?: number,
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //console.log(category_id);

    try {
      setLoading(true);

      const method = category_id ? "put" : "post";
      const url = category_id
        ? `/update-transaction/${category_id}`
        : "/create-transaction";

      await api[method](url, {
        //data: { ...values, userId },
        name: values.name,
        user_id: userId,
      });

      //setDialogIsOpen(false);
      form.reset();

      getCategories();

      toast({
        variant: "success",
        title: "Successo",
        description: category_id
          ? "Categoria actualizada com sucesso!"
          : "Categoria adicionada com sucesso!",
      });
    } catch (error) {
      console.error(error);
      const axioError = error as AxiosError<APIErrorResponse>;
      const message =
        axioError.response?.data?.message ||
        "Occoreu um erro ao Adicionar a Categoria.";

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

  return {
    loading,
    categoriesLoading,
    categories,
    form,
    handleCategorySave,
  };
}
