import React from 'react';
import { cn } from '@/src/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';

export interface Product {
  id: string;
  title: string;
  price: number;
  comparePrice?: number;
  image: string;
  hoverImage: string;
  label?: string;
  soldOut?: boolean;
}

interface ProductCardProps {
  product: Product;
  className?: string;
}

const formatPrice = (value: number) => {
  return new Intl.NumberFormat('vi-VN').format(value) + '₫';
};

export default function ProductCard({ product, className }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product detail
    if (product.soldOut) return;
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    showToast('Đã thêm vào giỏ hàng');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.soldOut) return;
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    navigate('/checkout');
  };

  return (
    <div className={cn("pro-loop group relative px-[4px] md:px-[6px] mb-4 md:mb-6", className)}>
      <div className="product-block relative overflow-hidden bg-white border border-gray-50 rounded-lg transition-all duration-400">
        <div className="product-img relative overflow-hidden flex flex-col pt-[100%]">
          {product.label && (
            <div className="product-sale absolute top-[10px] left-[10px] z-10 bg-white border border-gray-200 px-2.5 py-1.5 text-red-500 font-bold text-[12px] leading-none">
              {product.label}
            </div>
          )}
          {product.soldOut && (
            <div className="sold-out absolute bottom-[10px] right-[10px] z-10 bg-white border border-gray-200 px-2.5 py-1.5 text-gray-800 font-bold text-[12px] leading-none opacity-80">
              Hết hàng
            </div>
          )}

          <Link to={`/products/${product.id}`} className="absolute inset-0">
             <picture className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 group-hover:opacity-0 group-hover:invisible">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-contain"
                />
             </picture>
             <picture className="absolute inset-0 flex items-center justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-500">
                <img 
                  src={product.hoverImage} 
                  alt={product.title} 
                  className="w-full h-full object-contain"
                />
             </picture>
          </Link>

          <div className="button-add absolute bottom-[-10%] left-0 w-full px-4 group-hover:bottom-[10%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-20">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleBuyNow}
                disabled={product.soldOut}
                className={cn(
                  'w-full py-2 uppercase font-medium text-[14px] flex items-center justify-center gap-2 transition-colors',
                  product.soldOut ? 'cursor-not-allowed bg-gray-300 text-gray-600' : 'bg-[#9c4533] text-white hover:bg-black'
                )}
              >
                Mua ngay
              </button>
              <button
                onClick={handleAddToCart}
                disabled={product.soldOut}
                className={cn(
                  'w-full py-2 uppercase font-medium text-[14px] flex items-center justify-center gap-2 transition-colors',
                  product.soldOut ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'bg-[#191919] text-white hover:bg-[#9c4533]'
                )}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <div className="product-detail p-[10px] md:p-[15px] pt-4 md:pt-5">
           <h3 className="text-[14px] font-medium mb-2 group-hover:text-[#9c4533] transition-colors line-clamp-1">
             <Link to={`/products/${product.id}`}>{product.title}</Link>
           </h3>
           <div className="flex items-center gap-2 font-semibold">
              <span className={cn("text-[14px]", product.comparePrice ? "text-red-500" : "text-gray-800")}>
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <del className="text-gray-400 text-[13px] font-light italic ml-1">
                  {formatPrice(product.comparePrice)}
                </del>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
