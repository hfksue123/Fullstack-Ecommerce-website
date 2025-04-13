"use client";

import React, { useState } from "react";
import { BRANDS_QUERYResult } from "../../sanity.types";
import { Title } from "../ui/text";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  const [open, setOpen] = useState(false);

  const selectedTitle =
    brands.find((b) => b.slug?.current === selectedBrand)?.title ||
    "Select brand";

  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Brands</Title>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full mt-2 justify-between flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm",
              "hover:border-shop_dark_green"
            )}
          >
            <span className="truncate text-left">{selectedTitle}</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-h-[240px] overflow-y-auto">
          <Command>
            <CommandInput placeholder="Search brand..." />
            <CommandEmpty>No brand found.</CommandEmpty>
            <CommandGroup>
              {brands.map((brand) => (
                <CommandItem
                  key={brand._id}
                  onSelect={() => {
                    setSelectedBrand(brand.slug?.current || null);
                    setOpen(false);
                  }}
                  className="flex justify-between"
                >
                  {brand.title}
                  {selectedBrand === brand.slug?.current && (
                    <Check className="h-4 w-4 text-green-600" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedBrand && (
        <button
          onClick={() => setSelectedBrand(null)}
          className="text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] 
          hover:text-shop_dark_green hoverEffect text-left"
        >
          Reset selection
        </button>
      )}
    </div>
  );
};

export default BrandList;
