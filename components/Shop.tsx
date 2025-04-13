"use client";
import React, { useCallback, useState } from "react";
import { BRANDS_QUERYResult, Category, Product } from "../sanity.types";
import Container from "./Container";
import { Title } from "./ui/text";
import CategoryList from "./shop/CategoryList";
import BrandList from "./shop/BrandList";
import PriceList from "./shop/PriceList";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { client } from "../sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}
const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const brandParams = searchParams?.get("brand");
  const categoryParams = searchParams?.get("category");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
  
      const query = `*[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id)) 
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id)) 
        && price >= $minPrice && price <= $maxPrice] | order(name asc) {
          ..., "categories": categories[]->title
        }`;
  
      const data = await client.fetch(query, {
        selectedCategory,
        selectedBrand,
        minPrice,
        maxPrice,
      });
  
      setProducts(data);
    } catch (error) {
      console.log("Shop product fetching error", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedBrand, selectedPrice]);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);  

  return (
    <div className="border-t">
      <Container className="mt-5">
        <div className="sticky top-0 z-10 mb-5">
          <div className="flex items-center justify-between">
            <Title className="text-lg uppercase tracking-wide">
              Get the product as your needs
            </Title>
            {(selectedCategory !== null ||
              selectedBrand !== null ||
              selectedPrice !== null) && (
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSelectedBrand(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_green underline text-sm mt-2 font-medium hover:text-darkRed hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop-dark-green/50">
          <div
            className="md:sticky md:top-20 md:self-start 
             md:min-w-64 pb-5 md:border-r border-r-shop-dark-green/50"
          >
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
          </div>
          <div className="flex-1 pt-5">
            <div className="h-[calc(100vh-160px)] overflow-y-auto pr-2">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
                  <div className="flex items-center space-x-2 text-blue-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Product is loading...</span>
                  </div>
                </div>
              ) : products?.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {products?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoProductAvailable className="bg-white mt-0" />
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
