'use client';

import React from 'react';
import Container from '../../../components/Container';
import { Title } from '../../../components/ui/text';
import ProductCard from '../../../components/ProductCard';

const DealPageClient = ({ products }) => {
  return (
    <div className="py-10 bg-shop-lighter-bg">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-[1px] text-base uppercase tracking-wide">
          Hot Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPageClient;
