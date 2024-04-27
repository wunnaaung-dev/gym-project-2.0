"use server";

import Customer from "@/models/customer";
import { connectToDB } from "@/utils/database";
import { calculateExpireDate } from "@/utils/date";
import { revalidatePath } from "next/cache";

export const createNewCustomer = async ({
  name,
  gender,
  phone,
  address,
  paymentType,
}: NewLifeGymMember) => {
  try {
    await connectToDB();
    const newCustomer = new Customer({
      name: name,
      gender: gender,
      phoneNumber: phone,
      address: address,
      paymentType: paymentType,
      expireDate: calculateExpireDate(paymentType),
    });

    await newCustomer.save();
    revalidatePath("/Admin");
  } catch (error) {
    console.log(error);
  }
};

export const getCustomersInfo = async () => {
  try {
    await connectToDB();
    const customers = await Customer.find()
      .sort({ createdAt: -1 })
      .populate("name")
      .limit(30);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

export const getCustomersByQueryType = async (queryType: string) => {
  try {
    let customers;

    switch (queryType) {
      case "one-month":
        customers = await Customer.find({
          paymentType: "1 month",
        });
        break;
      case "three-months":
        customers = await Customer.find({
          paymentType: "3 month",
        });
        break;
      case "new-members":
        const startDateNew = new Date();
        startDateNew.setDate(startDateNew.getDate() - 30);
        customers = await Customer.find({
          createdAt: { $gte: startDateNew },
        }).sort({ createdAt: -1 });
        break;
      case "all-members":
        customers = await Customer.find().sort({ createdAt: -1 });
        break;
      case "expire-soon":
        const endDateExpire = new Date();
        endDateExpire.setDate(endDateExpire.getDate() + 7); // Adjust timeframe as needed
        customers = await Customer.find({
          expireDate: { $lte: endDateExpire },
        });
        break;
      default:
        throw new Error("Invalid query type");
    }

    return customers;
  } catch (error) {
    console.error("Error fetching customers by query type:", error);
    throw error;
  }
};

export const getCustomersByName = async (name: string) => {
  try {
    await connectToDB();
    // Use regular expression to match names containing the provided value
    const customers = await Customer.find({ name: { $regex: name, $options: 'i' } })
      .sort({ createdAt: -1 })
      .populate("name")
      .limit(20);
    return customers;
  } catch (error) {
    console.error("Error fetching customers by name:", error);
    throw error;
  }
};

export async function getCustomerByID(customerID: string) {
  try {
    await connectToDB()
    const customerInfo = await Customer.findById(customerID)
    return customerInfo
  } catch (error) {
    console.log("can't get customer info", error)
  }
}
interface BodyMeasurementProps {
  customerID: string;
  month: string;
  path: string;
  weight: number;
  neck: number;
  chest: number;
  waist: number;
  left_arm: number;
  right_arm: number;
  left_thight: number;
  right_thight: number;
  left_calf: number;
  right_calf: number;
}
export async function updateBodyMeasurements({
  customerID,
  month,
  path,
  weight,
  neck,
  chest,
  waist,
  left_arm,
  right_arm,
  left_thight,
  right_thight,
  left_calf,
  right_calf,
}: BodyMeasurementProps): Promise<void> {
  try {
    await connectToDB();
    const newMeasurements = {
      month: month,
      weight: weight,
      neck: neck,
      chest: chest,
      waist: waist,
      arms: {
        left: left_arm,
        right: right_arm,
      },
      thight: {
        left: left_thight,
        right: right_thight,
      },
      calf: {
        left: left_calf,
        right: right_calf,
      },
    };
    await Customer.findByIdAndUpdate(
      customerID,
      {
        $push: {
          bodyMeasurements: newMeasurements,
        },
      },
      { new: true }
    );
    revalidatePath(path);
  } catch (error) {
    console.log("Can't update body information", error);
  }
}

export async function editMembership({customerId, newMembership, expireDate} : {customerId: string, newMembership: string, expireDate: Date}) {
  try {
    await connectToDB()
    const existingCustomer = await Customer.findById(customerId);
    existingCustomer.paymentType = newMembership
    existingCustomer.expireDate = expireDate
    await existingCustomer.save()
    revalidatePath("/Admin")

  } catch (error) {
    console.log(error)
  }
}

export async function deleteCustomer(customerID: string) {
  try {
    await connectToDB()
    await Customer.findByIdAndDelete(customerID)
    revalidatePath("/Admin")
  } catch (error) {
    console.log(error)
  }
}