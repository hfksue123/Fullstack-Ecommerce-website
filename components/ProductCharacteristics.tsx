import React from "react";
import { Product } from "../sanity.types";
import { getBrand } from "../sanity/queries";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ProductCharacteristics = async ({
  product,
}: {
  product: Product | null | undefined;
}) => {
  const brand = await getBrand(product?.slug?.current || "");

  return (
    <Accordion type="single" collapsible className="text-sm">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          {product?.name} — Characteristics
        </AccordionTrigger>
        <AccordionContent className="space-y-2 mt-2">
          <CharacteristicItem label="Brand" value={brand?.[0]?.brandName} />
          <CharacteristicItem label="Collection" value="2025" />
          <CharacteristicItem label="Type" value={product?.variant} />
          <CharacteristicItem
            label="Stock"
            value={
              product?.stock && product.stock > 0 ? "Available" : "Out of Stock"
            }
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const CharacteristicItem = ({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) => (
  <p className="flex justify-between text-gray-700">
    <span>{label}:</span>
    <span className="font-semibold tracking-wide">
      {value || "—"}
    </span>
  </p>
);

export default ProductCharacteristics;
