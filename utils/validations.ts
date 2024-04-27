import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
}

export enum Payment {
  One_Month = "1 month",
  Three_Month = "3 month",
  Twelve_Month = "12 month",
}

export enum QueryString {
  All_Members = 'all-members',
  New_Members = 'new-members',
}

export const Customer = z.object({
  customer_name: z.string().regex(/^[a-zA-Z\s]+$/, {
    message:
      "Name must contain only letters (no numbers or special characters)",
  }),
  gender: z.nativeEnum(Gender),
  phoneNumber: z
    .string()
    .min(6)
    .refine((value) => /^[0-9]+$/.test(value), {
      message: "Phone number must only contain numeric characters",
    }),
  address: z.string().max(150),
  paymentType: z.nativeEnum(Payment),
});

export const FilterProps = z.object({
  customer_name: z.string().nullable(),
  query_string: z.nativeEnum(QueryString).nullable()
})

export const bodyMeasurementsSchema = z.object({
  weight: z.number().min(2, { message: "Wrong data format" }),
  neck: z.number().refine((value) => value >= 0 && value <= 99, {
    message: "Wrong data format. Please enter a number between 0 and 99.",
  }),
  chest: z.number().refine((value) => value >= 0 && value <= 99, {
    message: "Wrong data format. Please enter a number between 0 and 99.",
  }),
  waist: z.number().refine((value) => value >= 0 && value <= 99, {
    message: "Wrong data format. Please enter a number between 0 and 99.",
  }),
  arms: z.object({
    left: z.number().refine((value) => value >= 0 && value <= 99, {
      message: "Wrong data format. Please enter a number between 0 and 99.",
    }),
    right: z.number().refine((value) => value >= 0 && value <= 99, {
      message: "Wrong data format. Please enter a number between 0 and 99.",
    }),
  }),
  thight: z.object({
    left: z.number().refine((value) => value >= 0 && value <= 99, {
      message: "Wrong data format. Please enter a number between 0 and 99.",
    }),
    right: z.number().refine((value) => value >= 0 && value <= 99, {
      message: "Wrong data format. Please enter a number between 0 and 99.",
    }),
  }),
  calf: z.object({
    left: z.number().refine((value) => value >= 0 && value <= 99, {
      message: "Wrong data format. Please enter a number between 0 and 99.",
    }),
    right: z.number().refine((value) => value >= 0 && value <= 99, {
      message: "Wrong data format. Please enter a number between 0 and 99.",
    }),
  }),
});