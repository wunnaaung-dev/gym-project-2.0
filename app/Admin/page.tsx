import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";

import { AddNewMember } from "@/components/AddNewMember";
import {
  getCustomersByName,
  getCustomersByQueryType,
  getCustomersInfo,
} from "@/actions/customerActions";
import Customers from "@/components/Customers";

const page = async ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (!checkRole("admin")) {
    redirect("/");
  }

  let data: NewLifeGymMember[]  = await getCustomersInfo()

  const filterValue = searchParams?.filter;
  const filterName = searchParams?.customerName;

  try {
    if(filterValue) data = await getCustomersByQueryType(filterValue as string)
  } catch (error) {
    console.log(error)
  }

  try {
    if(filterName) data = await getCustomersByName(filterName as string)
  } catch (error) {
    console.log(error)
  }
  return (
    <>
      <AddNewMember />
      <Customers data={data} />
    </>
  );
};

export default page;
