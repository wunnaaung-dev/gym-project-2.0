"use client";

import { Payment } from "@/utils/validations";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DialogFooter } from "./ui/dialog";
import { editMembership } from "@/actions/customerActions";
import { calculateExpireDate } from "@/utils/date";
import { EditProps } from "@/types/editProps";
const formSchema = z.object({
  paymentType: z.nativeEnum(Payment),
});

const EditForm = ({ customerId, customerName }: EditProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentType: Payment.One_Month,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const expireDate = calculateExpireDate(values.paymentType);
    await editMembership({
      customerId: customerId,
      newMembership: values.paymentType,
      expireDate: expireDate,
    });
  }
  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        {form.formState.isSubmitted ? (
          <p className="text-center text-lg text-green-600">Changes added successfully</p>
        ) : (
          <div>
            <div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder={customerName} disabled />
            </div>
            <FormField
              control={form.control}
              name="paymentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">Payment Type</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Payment Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value={Payment.One_Month}>1 month</SelectItem>
                      <SelectItem value={Payment.Three_Month}>
                        3 months
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-blue-500"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </div>
        )}
      </form>
    </Form>
  );
};

export default EditForm;
