import { api } from "@/services/api";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from "../use-toast";
import { AxiosError } from "axios";
// import { isMatch } from "date-fns";
// import { z } from "zod";

interface APIErrorResponse {
  message: string;
}

interface generateReportProps {
  year: string;
  month: string;
}

// const generateReportSchema = z.object({
//   year: z.string().refine((value) => isMatch(value, "yyyy")),
//   month: z.string().refine((value) => isMatch(value, "MM")),
// });

// type generateReportProps = z.infer<typeof generateReportSchema>; // É a mesma tipagem com a interface

export function useGenerateReport() {
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const { user } = useUser();
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === "premium";

  const handleGenerateReportClick = async ({
    year,
    month,
  }: generateReportProps) => {
    if (!year || !month) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Seleccione o ano e o mês.",
      });

      throw new Error("Seleccione o ano e mês.");
    }

    // generateReportSchema.parse({ year, month }); // Validando o ano para que seja do tipo "yyyy" e o mês para que seja do tipo "MM"

    if (!hasPremiumPlan) {
      toast({
        variant: "destructive",
        title: "Erro",
        description:
          "Você precisa ter o Plano Premium para gerar Relatórios! Adquira o Plano Premium para poder gerar Relatórios.",
      });

      throw new Error(
        "Você precisa ter o Plano Premium para gerar Relatórios! Adquira o Plano Premium para poder gerar Relatórios."
      );
    }

    try {
      setLoading(true);

      const response = await api.post(`/generate-report`, {
        year: year,
        month: month,
      });

      setGeneratedReport(response.data);
    } catch (error) {
      const axioError = error as AxiosError<APIErrorResponse>;
      const message = axioError.response?.data?.message || "Occoreu um erro.";

      toast({
        variant: "destructive",
        title: "Erro",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return { handleGenerateReportClick, loading, generatedReport };
}
