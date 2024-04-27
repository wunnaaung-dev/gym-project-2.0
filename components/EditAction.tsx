import { Edit } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import EditForm from "./EditForm";
import { EditProps } from "@/types/editProps";

const EditAction = ({customerId, customerName}: EditProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Edit className="text-orange-400" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Extend Membership</DialogTitle>
          <DialogDescription>
            Choose the desired memembership.Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <EditForm customerId={customerId} customerName={customerName}/>
      </DialogContent>
    </Dialog>
  );
};

export default EditAction;
