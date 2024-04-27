"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { filterProps } from "@/types/filterProps";
import { useRouter } from "next/navigation";

export const QueryString = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? filterProps.find((prop) => prop.value === value)?.name
            : "Filter"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="bg-white">
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandList>
            <CommandEmpty>Not found</CommandEmpty>
            <CommandGroup></CommandGroup>
          </CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
          {filterProps.map((prop) => (
              <CommandItem
                key={prop.value}
                value={prop.value}
                onSelect={(currentValue) => {
                  router.push(`/Admin?filter=${currentValue}`)
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === prop.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {prop.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
