import { Category } from "../sanity.types";
import { Title } from "./ui/text";
import Image from "next/image";
import { urlFor } from "./../sanity/lib/image";
import Link from "next/link";
const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div
      className="bg-white border border-shop-light-green/20 my-10
    md:my-20 p-5 lg:p-7 rounded-md"
    >
      <Title className="border-b pd-3">HomeCategories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories?.map((category) => (
          <div
            key={category?._id}
            className="bg-shop-light-bg p-5 flex items-center gap-3 group"
          >
            {category?.image && (
              <div
                className="overflow-hidden border border-orange/30 hover:border-orange hoverEffect
              w-20 h-20 p-1"
              >
                {/* CLick to link to go shop with filter */}
                <Link
                  href={{
                    pathname: "/shop",
                    query: { category: category?.slug?.current },
                  }}
                >
                  <Image
                    src={urlFor(category?.image).url()}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-105 hoverEffect"
                  />
                </Link>
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">{category?.title}</h3>
              <p className="text-sm ">
                <span className="font-bold text-shop-dark-green">
                  {`(${category?.productCount})`}
                </span>
              </p>{" "}
              items Available
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
