import React from 'react';
import ProductCard, { Product } from './ProductCard';
import { motion } from 'motion/react';

interface ProductListProps {
  title: string;
  products: Product[];
  link: string;
}

export default function ProductList({ title, products, link }: ProductListProps) {
  return (
    <section className="section py-[50px]">
      <div className="container mx-auto px-[15px]">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-[#ff0000] text-white font-semibold text-[22px] md:text-[38px] px-12 py-4 rounded-[50px_0_50px_0] shadow-[5px_5px_0_0_rgba(255,0,0,0.15)]"
          >
            <a href={link}>{title}</a>
          </motion.h2>
        </div>

        <div className="flex flex-wrap -mx-[4px] md:-mx-[6px]">
          {products.map((product) => (
            <div key={product.id} className="w-1/2 md:w-1/3 lg:w-1/5">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}