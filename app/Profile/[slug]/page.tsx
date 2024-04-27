import { getCustomerByID} from "@/actions/customerActions";
import BodyRecord from "@/components/BodyRecord";
import CustomerFormSections from "@/components/CustomerFormSection";
export interface UserInfo {
  _id: string;
  name: string;
  gender: string;
  phoneNumber: string;
  address: string;
  paymentType: string;
  expireDate: Date;
  bodyMeasurements: [
    {
      _id: string;
      month: string;
      weight: number;
      neck: number;
      chest: number;
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
  ];
}
const page = async ({ params }: { params: { slug: string } }) => {
  const customerInfo: UserInfo = await getCustomerByID(params.slug);
  console.log(customerInfo)
  return (
    <div className="md:px-3">
      <div className="bg-[#ffe787] flex flex-col justify-center items-center shadow-lg rounded-xl md:h-[25vh] text-center md:w-1/4 mt-2">
        <h3 className="text-3xl font-bold text-[#7c6c77]">{customerInfo.name}</h3>
        <span className="text-[#aaa694] text-sm">{customerInfo.gender}</span>
        <p className="text-[#aaa694] text-lg font-semibold">{customerInfo.phoneNumber}</p>
        <p className="text-[#aaa694] text-lg font-semibold">{customerInfo.address}</p>
      </div>
      <CustomerFormSections customerID={customerInfo._id}/>
      <section className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-1">
        {customerInfo.bodyMeasurements.length > 0 &&
          customerInfo.bodyMeasurements.map((info) => (
            <BodyRecord
              key={info._id}
              month={info.month}
              weight={info.weight}
              chest={info.chest}
              neck={info.neck}
              waist={info.waist}
              arms={info.arms}
              thight={info.thight}
              calf={info.thight}
            />
          ))}
      </section>
    </div>
  );
};

export default page;
