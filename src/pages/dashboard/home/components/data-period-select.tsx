import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Year_Options = [
  { value: "2024", label: "2024" },
  { value: "2023", label: "2023" },
];

const Month_Options = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Feveiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const DataPeriodSelect = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [month, setMonth] = useState<string | undefined>(undefined);

  const [searchParams] = useSearchParams();
  const defaultYear = searchParams.get("year")?.toString();
  const defaultMonth = searchParams.get("month")?.toString();

  const handleYearSelect = (year: string) => {
    setYear(year);
    setMonth(undefined);
    // navigate(`/dashboard?year=${year}`);

    history.pushState(null, "", `/dashboard?year=${year}`);
  };
  const handleMonthSelect = (year: string, month: string) => {
    //console.log(month);
    if (!year) {
      year = "2024";
    }
    setMonth(month);
    navigate(`/dashboard?year=${year}&month=${month}`);
  };

  useEffect(() => {
    if (defaultYear) {
      setYear(defaultYear);
    }

    if (defaultMonth) {
      setMonth(defaultMonth);
    }
  }, [defaultYear, defaultMonth]);

  return (
    <>
      <Select
        onValueChange={(value) => handleYearSelect(value)}
        value={year || ""}
        // defaultValue={defaultYear || ""}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Selecione o Ano" />
        </SelectTrigger>
        <SelectContent>
          {Year_Options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => handleMonthSelect(year, value)}
        value={month || ""}
        // defaultValue={!defaultMonth ? month : defaultMonth}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Selecione o Mês" />
        </SelectTrigger>
        <SelectContent>
          {Month_Options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default DataPeriodSelect;
