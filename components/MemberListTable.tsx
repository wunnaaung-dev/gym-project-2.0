import { getCustomersInfo } from "@/actions/customerActions";
import Customers from "./Customers";
const MemberListTable = async () => {
  const data = await getCustomersInfo();
  return (
    <>
      <Customers data={data} />
    </>
  );
};

export default MemberListTable;
