import Header from "@/components/Header";
import SummaryCards from "./components/summary-cards";
import DataPeriodSelect from "./components/data-period-select";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTransactionsSummarys } from "@/hooks/dashboard/useTransactionsSummarys";
import { isMatch } from "date-fns";
import PercentagePieChart from "./components/percentage-pie-chart";
import PercentageExpensesPerCategory from "./components/percentage-expenses-per-category";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year")?.toString();
  const month = searchParams.get("month")?.toString();
  const {
    transactionsSummary,
    transactionsPercentage,
    percentageExpensesPerCategory,
  } = useTransactionsSummarys(String(year), String(month));

  const isInvalidYear = !isMatch(String(year), "yyyy");
  const isInvalidMonth = !isMatch(String(month), "MM");

  if ((year && isInvalidYear) || (month && isInvalidMonth)) {
    navigate(`/dashboard`);
  }

  return (
    <>
      <Header />

      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <DataPeriodSelect />
          </div>
        </div>

        <div className=" grid grid-cols-[2fr,1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards transactionsSummary={transactionsSummary} />

            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <PercentagePieChart
                transactionsSummary={transactionsSummary}
                transactionsPercentages={transactionsPercentage}
              />

              {percentageExpensesPerCategory && (
                <PercentageExpensesPerCategory
                  ExpensePerCategory={percentageExpensesPerCategory}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
