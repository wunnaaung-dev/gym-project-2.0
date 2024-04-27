"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "./ui/button";
import { DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { createNewCustomer } from "@/actions/customerActions";
import { Customer, Gender, Payment } from "@/utils/validations";

export const MemberForm = () => {
  const [shouldCloseForm, setShouldCloseForm] = useState(false);
  const form = useForm<z.infer<typeof Customer>>({
    resolver: zodResolver(Customer),
    defaultValues: {
      customer_name: "Wunna",
      gender: Gender.Male,
    },
  });

  const onSubmit = async (values: z.infer<typeof Customer>) => {
    await createNewCustomer({
      name: values.customer_name,
      gender: values.gender,
      phone: values.phoneNumber,
      address: values.address,
      paymentType: values.paymentType,
    });
    setShouldCloseForm(true);
  };

  return (
    <Form {...form}>
      {form.formState.isSubmitted ? (
        <p className="text-center font-bold text-xl text-green-700">Data added successfully</p>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={shouldCloseForm ? "hidden" : ""}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              Add Member Information
            </DialogTitle>
            <DialogDescription>
              Enter requierd information to add new member to the New Life Gym
            </DialogDescription>
          </DialogHeader>
          <FormField
            control={form.control}
            name="customer_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Name</FormLabel>
                <FormControl className="border border-slate-500 rounded-xl">
                  <Input placeholder="Enter member name here" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Gender</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="border border-slate-500 rounded-xl">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value={Gender.Male}>Male</SelectItem>
                    <SelectItem value={Gender.Female}>Female</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Phone</FormLabel>
                <FormControl className="border border-slate-500 rounded-xl">
                  <Input placeholder="Enter your number here" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Address</FormLabel>
                <FormControl className="border border-slate-500 rounded-xl">
                  <Textarea placeholder="Enter your address here" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Payment Type</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl className="border border-slate-500 rounded-xl">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Payment" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value={Payment.One_Month}>1 month</SelectItem>
                    <SelectItem value={Payment.Three_Month}>
                      3 months
                    </SelectItem>
                    <SelectItem value={Payment.Twelve_Month}>1 year</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <DialogFooter className="mt-5">
            <Button
              type="submit"
              className="bg-violet-600 hover:bg-violet-700 rounded-xl text-white"
              size="lg"
              disabled={form.formState.isSubmitting}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      )}
    </Form>
  );
};
