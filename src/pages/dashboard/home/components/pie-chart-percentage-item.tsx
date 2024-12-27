import { ReactNode } from "react";

interface PieChartPercentageItemProps {
  icon: ReactNode;
  title: ReactNode;
  value: number;
}

const PieChartPercentageItem = ({
  icon,
  title,
  value,
}: PieChartPercentageItemProps) => {
  return (
    <div className="flex justify-between items-center">
      {/* Icone e texto */}
      <div className="flex items-center gap-2">
        {icon}
        {title}
      </div>

      {/* Porcentagem */}
      <p className="text-sm text-muted-foreground font-bold">{value}%</p>
    </div>
  );
};

export default PieChartPercentageItem;
