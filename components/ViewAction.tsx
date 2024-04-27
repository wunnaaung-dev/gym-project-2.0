import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
const ViewAction = ({ customerID }: { customerID: string }) => {
  return (
    <Button>
      <Link href={`/Profile/${customerID}`}>
        <Eye className="text-blue-600"/>
      </Link>
    </Button>
  );
};

export default ViewAction;
