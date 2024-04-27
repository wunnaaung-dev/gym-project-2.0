import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MemberForm } from "./MemberForm";

export function AddNewMember() {
  return (
    <Dialog>
      <DialogTrigger asChild className="mt-3 ms-3">
        <Button className="bg-violet-600 hover:bg-violet-800 text-white px-5">
          +Add Member
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white">
        <MemberForm />
      </DialogContent>
    </Dialog>
  );
}
