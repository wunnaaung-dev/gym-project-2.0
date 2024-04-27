import { Plus } from "lucide-react";
import { Button } from "./ui/button";

interface Params {
  showForm: boolean
  setShowForm: (value: boolean) => void;
}

const AddBodyMeasurements = ({setShowForm, showForm}: Params) => {
  function handleClick() {
    setShowForm(true)
  }
  return (
    <Button disabled={showForm} className="bg-blue-500 hover:bg-blue-600 mt-3 text-white rounded-lg shadow-xl" onClick={handleClick}>
      <Plus size={16} />
      Add Body Measurements
    </Button>
  );
};

export default AddBodyMeasurements;
