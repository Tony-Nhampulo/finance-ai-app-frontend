import { TransactionCategory } from "@/components/transactions/enums-and-interfaces";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CategoryWithTotalAmountAndPercentage {
  category: TransactionCategory;
  total_amount: number;
  percentage: number;
}

interface PercentageExpensesPerCategoryProps {
  ExpensePerCategory: CategoryWithTotalAmountAndPercentage[];
}

const PercentageExpensesPerCategory = ({
  ExpensePerCategory,
}: PercentageExpensesPerCategoryProps) => {
  return (
    <div className="md:col-span-1 xl:col-span-2 rounded-md border">
      <CardHeader>
        <CardTitle className="font-bold text-error">
          Despesa por Categoria
        </CardTitle>
      </CardHeader>
      <ScrollArea className="lg:h-[300px] lg:w-auto lg:pb-6">
        <CardContent className="space-y-5">
          {ExpensePerCategory.map((item, index: number) => (
            <div key={index} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">{item.category.name}</p>
                <p className="text-sm font-bold">{item.percentage}%</p>
              </div>

              <Progress value={item.percentage} />
            </div>
          ))}
        </CardContent>
      </ScrollArea>
    </div>
  );
};

export default PercentageExpensesPerCategory;
