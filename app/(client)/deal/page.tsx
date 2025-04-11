import React from 'react';
import { getDealProducts } from '../../../sanity/queries';
import DealPageClient from './DealPageClient';

const DealPage = async () => {
  const products = await getDealProducts();

  return <DealPageClient products={products} />;
};

export default DealPage;
