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
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  if (!checkRole("admin")) {
    redirect("/");
  }

  let data;

  const filterValue = searchParams?.filter;
  const filterName = searchParams?.customerName;
  if (!filterValue) {
    data = await getCustomersInfo();
  } else {
    if (Array.isArray(filterValue)) {
      const firstFilterValue = filterValue[0];
      data = await getCustomersByQueryType(firstFilterValue);
    } else {
      data = await getCustomersByQueryType(filterValue);
    }
  }

  if (filterName) {
    data = await getCustomersByName(filterName as string);
  }
  return (
    <>
      <AddNewMember />
      <Customers data={data} />
    </>
  );
};

export default page;
