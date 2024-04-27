"use client";
import { getCurrentDate, getCurrentMonth } from "@/utils/date";
import { bodyMeasurementsSchema } from "@/utils/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateBodyMeasurements } from "@/actions/customerActions";
import { usePathname } from "next/navigation";
interface Params {
  customerID: string
  showForm: boolean
  setShowForm: (value: boolean) => void;
}
const BodyMeasurementsForm = ({ customerID,showForm, setShowForm }: Params) => {
  const currentMonth = getCurrentMonth();
  const currentDate = getCurrentDate();
  const pathname = usePathname()

  const form = useForm<z.infer<typeof bodyMeasurementsSchema>>({
    resolver: zodResolver(bodyMeasurementsSchema),
    defaultValues: {},
  });
  async function onSubmit(values: z.infer<typeof bodyMeasurementsSchema>) {
    try {
      await updateBodyMeasurements({
        customerID: customerID,
        month: currentMonth,
        path: pathname,
        weight: values.weight,
        neck: values.neck,
        chest: values.chest,
        waist: values.waist,
        left_arm: values.arms.left,
        right_arm: values.arms.right,
        left_thight: values.thight.left,
        right_thight: values.thight.right,
        left_calf: values.calf.left,
        right_calf: values.calf.right
      })
    } catch (error) {
      console.log(error)
    } finally {
      form.reset()
      setShowForm(false)
    }
    // console.log(values);
    // form.reset()
    // setShowForm(false)
  }
  return (
    <div
      className={`bg-white p-3 rounded-md w-72 mt-3 flex flex-col items-center ${
        showForm ? "block" : "hidden"
      }`}
    >
      <h3 className="text-black">{currentMonth}</h3>
      <p className="text-slate-400">{currentDate}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-2">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <div className="body-form-field">
                  <FormLabel className="w-14">Weight</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="pound"
                      type="number"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="neck"
            render={({ field }) => (
              <FormItem>
                <div className="body-form-field">
                  <FormLabel className="w-14">Neck</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="inches"
                      type="number"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chest"
            render={({ field }) => (
              <FormItem>
                <div className="body-form-field">
                  <FormLabel className="w-14">Chest</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="inches"
                      type="number"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="waist"
            render={({ field }) => (
              <FormItem>
                <div className="body-form-field">
                  <FormLabel className="w-14">Waist</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="inches"
                      type="number"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="body-form-field">
            <FormLabel className="w-12">Arms</FormLabel>
            <div className="flex justify-between w-full">
              <FormField
                control={form.control}
                name="arms.left"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Left"
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="arms.right"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Right"
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="body-form-field">
            <FormLabel className="w-12">Thight</FormLabel>
            <div className="flex justify-between w-full">
              <FormField
                control={form.control}
                name="thight.left"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="Left"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thight.right"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Right"
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="body-form-field">
            <FormLabel className="w-12">Calf</FormLabel>
            <div className="flex justify-between w-full">
              <FormField
                control={form.control}
                name="calf.left"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Left"
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="calf.right"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Right"
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button disabled={!form.formState.isValid} type="submit" className="w-full bg-blue-600">
            Save
          </Button>
          <Button onClick={()=>setShowForm(false)} className="w-full bg-slate-100 text-black">
            Cancel
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BodyMeasurementsForm;
