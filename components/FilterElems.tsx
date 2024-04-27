import { QueryString } from "./QueryString";
import SearchWithName from "./SearchWithName";


const FilterElems = () => {
  
  return (
    <div className="flex justify-between">
      <SearchWithName />
      <QueryString />
    </div>
  );
};

export default FilterElems;
