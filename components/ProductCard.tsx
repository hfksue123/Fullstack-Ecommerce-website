import React from "react";
import { Product } from "../sanity.types";
import Image from "next/image";
import { urlFor } from "../sanity/lib/image";
import { Flame, StarIcon } from "lucide-react";
import Link from "next/link";
import AddToWishlistButton from "./AddToWishlistButton";
import { Title } from "./ui/text";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import ProductSideMenu from "./ProductSideMenu";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border-[1px] border-dark-blue/20 rounded-md bg-white group">
      <div className="relative group overflow-hidden">
        {product?.images && (
          <Image
            src={urlFor(product?.images[0]).url()}
            alt="ProductImage"
            loading="lazy"
            width={700}
            height={700}
            className={`w-full h-64 object-contain overflow-hidden 
                transition-transform bg-shop-light-bg hoverEffect duration-500
                ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
          />
        )}
        <ProductSideMenu product={product} />
        {/* sale */}
        {product?.status === "sale" && (
          <p
            className="absolute top-2
        left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full
        group-hover:border-shop-light-green group-hover:text-shop-light-green hoverEffect"
          >
            Sale!
          </p>
        )}
        {/* new */}
        {product?.status === "new" && (
          <p
            className="absolute top-2
        left-2 z-10 text-xs border border-darkColor/50 px-2 rounded-full
        group-hover:border-shop-light-green group-hover:text-shop-light-green hoverEffect"
          >
            New!
          </p>
        )}
        {/* hot */}
        {product?.status === "hot" && (
          <Link
            href={"/deal"}
            className="absolute top-2
        left-2 z-10 text-xs px-2 rounded-full
        group-hover:border-shop-light-green group-hover:text-shop-light-green hoverEffect"
          >
            <Flame
              size={20}
              fill="#fb6c08"
              className="text-orange/50 group-hover:text-orange hoverEffect"
            />
          </Link>
        )}
      </div>
      <div className="p-3 flex flex-col gap-4">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-shop-light-text">
            {product?.categories.map((cat) => cat).join(", ")}
          </p>
        )}
        <Title className="text-sm line-clamp-1">{product?.name}</Title>
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
        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-shop-light-green font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>
        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-full"/>
      </div>
    </div>
  );
};

export default ProductCard;
