import React from "react";
import { Product } from "../sanity.types";
import Image from "next/image";
import { urlFor } from "../sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Link from "next/link";
import { Title } from "./ui/text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import ProductSideMenu from "./ProductSideMenu";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border border-dark-blue/20 rounded-xl bg-white group shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-xl">
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt="ProductImage"
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain bg-shop-light-bg 
              transition-transform duration-500 ease-in-out 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}

        <ProductSideMenu product={product} />

        {/* SALE  */}
        {product?.status === "sale" && (
          <Link
          href=""
          className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full 
        flex items-center gap-1 bg-orange-100 text-red-600 text-xs font-bold animate-pulse 
        shadow-sm hover:scale-105 transition-transform duration-200"
        >
          Sale !!!
        </Link>
        )}

        {/* NEW  */}
        {product?.status === "new" && (
          <Link
            href=""
            className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full 
          flex items-center gap-1 bg-orange-100 text-blue-600 text-xs font-bold animate-pulse 
          shadow-sm hover:scale-105 transition-transform duration-200"
          >
            New!
          </Link>
        )}

        {/* HOT  */}
        {product?.status === "hot" && (
          <Link
            href="/deal"
            className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full 
            flex items-center gap-1 bg-orange-100 text-orange-600 text-xs font-medium animate-pulse 
            shadow-sm hover:scale-105 transition-transform duration-200"
          >
            <Flame size={16} fill="#fb6c08" className="text-orange-500" />
            Hot!
          </Link>
        )}
      </div>

      <div className="p-3 flex flex-col gap-3">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-shop-light-text">
            {product?.categories.map((cat) => cat).join(", ")}
          </p>
        )}

        <Title className="text-sm line-clamp-1">{product?.name}</Title>

        {/* Star rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                size={15}
                key={index}
                className={
                  index < 4
                    ? "text-shop-lighter-green"
                    : "text-shop-lighter-text"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-shop-light-text text-xs tracking-wide">
            5 reviews
          </p>
        </div>

        {/* Stock info */}
        <div className="flex items-center gap-2.5 text-xs">
          <span className="text-shop-light-text">Availability:</span>
          <p
            className={`font-semibold ${
              product?.stock === 0 ? "text-red-600" : "text-shop-light-green"
            }`}
          >
            {(product?.stock as number) > 0
              ? `${product?.stock} in stock`
              : "Unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />

        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
