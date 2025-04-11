"use client";
import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/sanity.types";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import useStore from "@/store";
const FavoriteButton = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product?: Product | null | undefined;
}) => {
  const { favoriteProduct, addToFavorite } = useStore();
  const [existingProduct, setExistingProduct] = useState<Product | null>(null);
  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
  }, [product, favoriteProduct]);

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? "Product removed successfully!"
            : "Product added successfully!"
        );
      });
    }
  };

  return (
    <>
      {!showProduct ? (
        <Link href={"/wishlist"} className="group relative ">
          <Heart className="w-5 h-5 hover:text-shop-light-green hoverEffect" />
          <span
            className="absolute -top-1 -right-1 bg-shop-dark-green text-white
        h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center"
          >
            {favoriteProduct?.length ? favoriteProduct?.length : 0}
          </span>
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          title="."
          className="group relative hover:text-shop-light-green hoverEffect border border-shop-light-green/80
        hover:border-shop-light-green p-1.5 rounded-sm"
        >
          {existingProduct ? (
            <Heart
            fill="#3b9c3c"
              className="text-shop-light-green/80 group-hover:text-shop-light-green
      hoverEffect mt-.5 w-5 h-5"
            />
          ) : (
            <Heart
              className="text-shop-light-green/80 group-hover:text-shop-light-green
    hoverEffect mt-.5 w-5 h-5"
            />
          )}
        </button>
      )}
    </>
  );
};

export default FavoriteButton;
