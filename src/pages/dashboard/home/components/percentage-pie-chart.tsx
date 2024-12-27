import { Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TransactionType } from "@/components/transactions/enums-and-interfaces";
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import PieChartPercentageItem from "./pie-chart-percentage-item";

const chartConfig = {
  [TransactionType.Investment]: {
    label: "Investimento ",
    color: "#FFFFFF",
  },
  [TransactionType.Expense]: {
    label: "Despesa",
    color: "#E93030",
  },
  [TransactionType.Deposit]: {
    label: "Depósito",
    color: "#55B02E",
  },
} satisfies ChartConfig;

interface PercentagePieChartProps {
  transactionsSummary: {
    total_balance: number;
    total_investment: number;
    total_deposit: number;
    total_expense: number;
  };
  transactionsPercentages: {
    investment_percentage: number;
    deposit_percentage: number;
    expense_percentage: number;
  };
}

const PercentagePieChart = ({
  transactionsSummary,
  transactionsPercentages,
}: PercentagePieChartProps) => {
  const chartData = [
    {
      type: TransactionType.Investment,
      amount: Number(transactionsSummary?.total_investment),
      fill: "#FFFFFF",
    },
    {
      type: TransactionType.Expense,
      amount: Number(transactionsSummary?.total_expense),
      fill: "#E93030",
    },
    {
      type: TransactionType.Deposit,
      amount: Number(transactionsSummary?.total_deposit),
      fill: "#55B02E",
    },
  ];
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-6">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PieChartPercentageItem
            icon={<PiggyBankIcon size={16} />}
            title={<p className="opacity-70">Investimento</p>}
            value={transactionsPercentages?.investment_percentage}
          />
          <PieChartPercentageItem
            icon={<TrendingUpIcon className="text-primary" size={16} />}
            title={<p className="text-primary opacity-70">Depósito</p>}
            value={transactionsPercentages?.deposit_percentage}
          />
          <PieChartPercentageItem
            icon={<TrendingDownIcon className="text-error " size={16} />}
            title={<p className="text-sm text-error opacity-70">Despesa</p>}
            value={transactionsPercentages?.expense_percentage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PercentagePieChart;
