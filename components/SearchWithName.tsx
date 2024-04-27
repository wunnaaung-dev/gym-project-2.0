"use client";
import { useState } from "react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
const SearchWithName = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/Admin?customerName=${searchQuery}`);
    setSearchQuery("")
  };
  return (
    <form className="w-1/4" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchWithName;
