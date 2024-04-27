"use client";

import { useState } from "react";
import AddBodyMeasurements from "./AddBodyMeasurements";
import BodyMeasurementsForm from "./BodyMeasurementsForm";

const CustomerFormSections = ({ customerID }: { customerID: string }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <section className="flex flex-col justify-center items-center sm:justify-start sm:items-start">
      <AddBodyMeasurements showForm={showForm} setShowForm={setShowForm} />
      <BodyMeasurementsForm
        customerID={customerID}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </section>
  );
};

export default CustomerFormSections;
