"use client";
import { Product } from "../sanity.types";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { cn } from "../lib/utils";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButtons from "./QuantityButtons";
interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;

  const handleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(
        `${product?.name?.substring(0, 12)}... added successfully!`
      );
    } else {
      toast.error("Can't add more than available Stock");
    }
  };

  return (
    // countdown Quantity when click on Add To Cart
    <div>
      {itemCount ? (
        <div className="text-sm w-full">
          <div className="flex itmes-center justify-between">
            <span className="text-xs text-darkColor/80">Quantity</span>
            <QuantityButtons product={product}/>
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={cn(
            "w-full bg-shop-dark-green/80 text-shop-lighter-bg shadow-none border border-shop-dark-green/80 font-semibold tracking-wide hover:text-white hover:bg-shop-dark-green hover:border-shop-dark-green hoverEffect",
            className
          )}
        >
          <ShoppingBag /> {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
