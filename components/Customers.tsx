import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterElems from "./FilterElems";
import ViewAction from "./ViewAction";
import EditAction from "./EditAction";
import DeleteAction from "./DeleteAction";

const Customers: React.FC<{ data: NewLifeGymMember[] }> = ({ data }) => {
  return (
    <div className="px-3 mt-3">
      <FilterElems />
      <Table>
        <TableCaption>Our beloved customers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Membership Type</TableHead>
            <TableHead>Expire Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((customer: NewLifeGymMember, index: number) => (
            <TableRow key={customer._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.paymentType}</TableCell>
              <TableCell className="text-red-600">
                {customer.expireDate.toDateString()}
              </TableCell>
              <TableCell>
                <ViewAction customerID={customer._id}/>
                <EditAction customerId={customer._id} customerName={customer.name}/>
                <DeleteAction customerId={customer._id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Customers;
