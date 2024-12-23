import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import RippleButton from "@/components/ui/rippleButton";

import {
  Transaction_Payment_Method_Options,
  Transaction_Type_Options,
  TransactionCategory,
} from "@/components/transactions/enums-and-interfaces";

import { useTheme } from "@/components/theme-provider";
import { MoneyInput } from "@/components/money-input";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TransactionFormSchema,
  useTransactions,
} from "@/hooks/dashboard/useTransactions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { Save } from "lucide-react";
import { useCategories } from "@/hooks/dashboard/useCategories";
//import { TransactionProps } from "@/pages/dashboard/transactions/transactionColumns";

interface UpsertTransactionDialogProps {
  dialogIsOpen: boolean;
  setDialogIsOpen: (dialogIsOpen: boolean) => void;
  valuesToEdit?: TransactionFormSchema;
}

const UpsertTransactionDialog = ({
  dialogIsOpen,
  setDialogIsOpen,
  valuesToEdit,
}: UpsertTransactionDialogProps) => {
  const { loading, form, handleTransactionSave } =
    useTransactions(valuesToEdit);
  const { categories } = useCategories();
  const { theme } = useTheme();

  const handleTransactionEditOrCreate = async (
    values: TransactionFormSchema,
  ) => {
    await handleTransactionSave(values, values.transaction_id);
    setDialogIsOpen(false);
  };

  const isToUpdate = Boolean(valuesToEdit);

  return (
    <>
      <Dialog
        open={dialogIsOpen}
        onOpenChange={(open) => {
          setDialogIsOpen(open);
          if (!open) {
            form.reset();
          }
        }}
      >
        <DialogTrigger asChild></DialogTrigger>

        <DialogContent className="w-[90%] rounded-md px-3 sm:max-w-[425px] md:min-w-[480px]">
          <DialogHeader className="px-3">
            <DialogTitle className="text-base">
              {isToUpdate ? "Actualizar" : "Adicionar"} Transação
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[600px] w-auto px-3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleTransactionEditOrCreate)}
                className="flex w-full flex-col items-center gap-2 space-y-2"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        }`}
                      >
                        Nome da Transação
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Digite o nome da Transação."
                          className={`${
                            form.formState.errors.name &&
                            "border-[1.5px] !border-red-500"
                          }`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        }`}
                      >
                        Valor
                      </FormLabel>
                      <FormControl>
                        <MoneyInput
                          placeholder="Digite o Valor da Transção."
                          className={`${
                            form.formState.errors.amount &&
                            "border-[1.5px] !border-red-500"
                          }`}
                          value={field.value}
                          onValueChange={({ floatValue }) =>
                            field.onChange(floatValue)
                          }
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                        />
                        {/* <Input
                          type="number"
                          placeholder="Digite o Valor da Transção."
                          className={`${
                            form.formState.errors.amount &&
                            "border-[1.5px] !border-red-500"
                          }`}
                          {...field}
                        /> */}
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transaction_type"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        }`}
                      >
                        Tipo da Transação
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione o Tipo da Transação" />
                          </SelectTrigger>
                          <SelectContent>
                            {Transaction_Type_Options.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="cursor-pointer hover:bg-slate-50 hover:bg-opacity-10"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        }`}
                      >
                        Categoria da Transação
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={`${
                                form.formState.errors.category &&
                                "border-[1.5px] !border-red-500"
                              }`}
                            >
                              <SelectValue placeholder="Seleccione a Categoria da Transação" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories && categories.length > 0 ? (
                              categories.map((item: TransactionCategory) => (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                  className="cursor-pointer hover:bg-slate-50 hover:bg-opacity-10"
                                >
                                  {item.name}
                                </SelectItem>
                              ))
                            ) : (
                              <>
                                <Loader />
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        }`}
                      >
                        Método de Pagamento
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccione o Método de Pagamento da Transação" />
                          </SelectTrigger>
                          <SelectContent>
                            {Transaction_Payment_Method_Options.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="cursor-pointer hover:bg-slate-50 hover:bg-opacity-10"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel
                        className={`${
                          theme == "light" ? "text-black" : "text-white"
                        }`}
                      >
                        Data da Transação
                      </FormLabel>

                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          classNames={{
                            day_selected: "custom-calendar rdp-day_selected",
                          }}
                          toDate={new Date()}
                          locale={ptBR}
                          styles={{
                            head_cell: {
                              width: "100%",
                              textTransform: "capitalize",
                            },
                            cell: {
                              width: "100%",
                            },
                            button: {
                              width: "100%",
                            },
                            nav_button_previous: {
                              width: "32px",
                              height: "32px",
                            },
                            nav_button_next: {
                              width: "32px",
                              height: "32px",
                            },
                            caption: {
                              textTransform: "capitalize",
                            },
                          }}
                        />
                      </FormControl>

                      <FormMessage className="text-xs text-red-500" />
                    </FormItem>
                  )}
                />

                <DialogFooter className="w-full gap-3 px-1">
                  <DialogClose asChild>
                    <RippleButton type="button" variant="outline">
                      Cancelar
                    </RippleButton>
                  </DialogClose>

                  <RippleButton
                    size={"sm"}
                    type="submit"
                    disabled={loading}
                    className={`${
                      theme === "light"
                        ? "rounded border-[1px] border-gray-300 bg-[#8161ff] text-white hover:bg-[#613cf3]"
                        : ""
                    }`}
                  >
                    {loading ? (
                      <Loader />
                    ) : (
                      <>
                        {<Save className="h-4 w-4" />}
                        {isToUpdate ? "Actualizar" : "Adicionar"}
                      </>
                    )}
                  </RippleButton>
                </DialogFooter>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpsertTransactionDialog;
