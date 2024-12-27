export const formatDateValue = (date: Date, monthType = "long") => {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: monthType === "long" ? "long" : "short",
    year: "numeric",
  });
};
