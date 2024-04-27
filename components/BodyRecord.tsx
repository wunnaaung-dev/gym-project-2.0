interface BodyRecordProps {
    month: string;
    weight: number;
    chest: number;
    neck: number;
    waist: number;
    arms: {
      left: number;
      right: number;
    };
    thight: {
      left: number;
      right: number;
    };
    calf: {
      left: number;
      right: number;
    };
  }
  
  const BodyRecord = ({ month, weight, chest, neck, waist, arms, thight, calf }: BodyRecordProps) => {
    return (
      <div className="bg-[#ebf8b8] shadow-lg max-w-md lg:w-72 py-2 rounded-xl flex flex-col  items-center">
        <h2 className="font-[600]">{month}</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="body-parts">
            <h3 className="font-semibold text-black text-sm">Weight</h3>
            <p>{weight} lb</p>
          </div>
          <div className="body-parts">
            <h3 className="font-semibold text-black text-sm">Neck</h3>
            <p>{neck} inches</p>
          </div>
          <div className="body-parts">
            <h3 className="font-semibold text-black text-sm">Chest</h3>
            <p>{chest} inches</p>
          </div>
          <div className="body-parts">
            <h3 className="font-semibold text-black text-sm">Waist</h3>
            <p>{waist} inches</p>
          </div>
          <div className="body-parts col-span-2">
              <h3 className="font-semibold text-black text-sm">Arms</h3>
              <div className="flex justify-between">
                  <p>L: <span>{arms.left} inches</span></p>
                  <p>R: <span>{arms.right} inches</span></p>
              </div>
          </div>
          <div className="body-parts col-span-2">
              <h3 className="font-semibold text-black text-sm">Thight</h3>
              <div className="flex justify-between">
                  <p>L: <span>{thight.left} inches</span></p>
                  <p>R: <span>{thight.right} inches</span></p>
              </div>
          </div>
          <div className="body-parts col-span-2">
              <h3 className="font-semibold text-black text-sm">Calf</h3>
              <div className="flex justify-between">
                  <p>L: <span>{calf.left} inches</span></p>
                  <p>R: <span>{calf.right} inches</span></p>
              </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BodyRecord;
  