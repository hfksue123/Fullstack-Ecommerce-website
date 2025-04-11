import React from 'react'
import { getCategories } from '../../../../sanity/queries'
import Container from '../../../../components/Container';
import { Title } from '../../../../components/ui/text';
import CategoryProducts from '../../../../components/CategoryProducts';

const CategoryPage = async({params}:{params:Promise<{slug:string}>}) => {
  const categories = await getCategories();
  const {slug} = await params;
  return (
    <div className="py-10">
      <Container>
        <Title>
          Products by Category:{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {slug && slug}
          </span>
        </Title>
        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  );
}

export default CategoryPage