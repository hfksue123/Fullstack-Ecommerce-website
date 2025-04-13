'use client';
import { useEffect, useState } from 'react';
import HomeTabBar from './HomeTabBar';
import { productType } from '../constants/data';
import { client } from '../sanity/lib/client';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import NoProductAvailable from './NoProductAvailable';
import { AnimatePresence } from 'motion/react';
import ProductCard from './ProductCard';
import { Product } from '../sanity.types';

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || '');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Số sản phẩm hiển thị trên mỗi trang

  // Reset về trang đầu mỗi khi đổi tab
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTab]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const query = `*[_type=="product" && variant==$variant] | order(name desc){
        ..., "categories":categories[]->title
      }`;
      try {
        const response = await client.fetch(query, {
          variant: selectedTab.toLowerCase(),
        });
        setProducts(response);
      } catch (error) {
        console.error('Product fetching Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

  // Scroll to top mỗi khi đổi trang
  useEffect(() => {
    window.scrollTo({ top: 100, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentItems = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gray-100 w-full mt-10">
          <div className="space-x-2 flex items-center text-blue-600">
            <Loader2 className="w-5 h-6 animate-spin" />
            <span>Product is loading....</span>
          </div>
        </div>
      ) : products.length ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
            {currentItems.map((product) => (
              <AnimatePresence key={product._id}>
                <motion.div
                  layout
                  initial={{ opacity: 0.2 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
