import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';
import { cn } from '@/src/lib/utils';

export interface Product {
  id: string;
  title: string;
  price: number;
  comparePrice?: number;
  label?: string;
  soldOut?: boolean;
  image: string;
}

interface ProductCardProps {
  product: Product;
  variant?: 'promo' | 'hot' | 'default';
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('vi-VN').format(value) + '₫';

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (product.soldOut) return;
    addToCart({ id: product.id, name: product.title, price: product.price, image: product.image, quantity: 1 });
    showToast('Đã thêm vào giỏ hàng');
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (product.soldOut) return;
    addToCart({ id: product.id, name: product.title, price: product.price, image: product.image, quantity: 1 });
    navigate('/checkout');
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-[3px] border border-[#e5e0e0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <Link to={`/products/${product.id}`} className="block relative overflow-hidden bg-[#f0f0f0]">
        <div className="relative overflow-hidden">
          <div className="relative aspect-[4/5] w-full flex items-center justify-center p-2 sm:p-3">
            {!product.soldOut && product.label && (
              <div className="absolute top-2 left-2 z-10 min-w-[42px] rounded-t-sm rounded-b-lg bg-[#e60012] px-1.5 py-1.5 text-center text-[10px] font-bold leading-tight text-white shadow-sm">
                <span className="block">Giảm</span>
                <span className="block font-black">{product.label}</span>
              </div>
            )}
            {product.soldOut && (
              <div className="absolute top-2 right-2 z-10 min-w-[42px] rounded-t-sm rounded-b-lg bg-[#9a9a9a] px-1.5 py-1.5 text-center text-[10px] font-bold uppercase leading-tight text-white shadow-sm">
                Hết hàng
              </div>
            )}
            <img src={product.image} alt={product.title} className="max-h-[86%] max-w-full object-contain transition-transform duration-700 group-hover:scale-110 select-none" />
            
            {/* OVERLAY ANIMATION */}
            <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-black/60 to-transparent z-20 flex flex-col" onClick={(e) => e.preventDefault()}>
              <button onClick={handleAddToCart} disabled={product.soldOut} className={cn("bg-black text-white text-[11px] py-2 px-4 rounded font-medium hover:bg-neutral-800 transition-colors duration-200 w-full mb-2 uppercase tracking-wider flex items-center justify-center", product.soldOut && "opacity-50 cursor-not-allowed")}>
                {product.soldOut ? 'HẾT HÀNG' : 'THÊM VÀO GIỎ HÀNG'}
              </button>
              <button onClick={handleBuyNow} className="bg-white/90 text-neutral-800 text-[11px] py-2 px-4 rounded font-medium hover:bg-white transition-colors duration-200 w-full uppercase tracking-wider flex items-center justify-center">
                MUA NGAY
              </button>
            </div>
          </div>
        </div>
      </Link>
      {variant === 'hot' && (
        <div className="flex min-h-[36px] w-full items-center justify-between border-t border-white/10 bg-black px-3 py-2 text-white">
          <span className="text-[10px] font-black italic">SALE 50%</span>
          <span className="text-[9px]">20/12 - 31/12</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-3 text-center">
        <h3 className="mb-2 min-h-[2.5rem] text-[13px] font-medium leading-snug text-[#1a1a1a] line-clamp-2 transition-colors group-hover:text-[#9c4533]">
          <Link to={`/products/${product.id}`} className="hover:text-[#9c4533]">{product.title}</Link>
        </h3>
        <div className="mt-auto flex flex-col items-center">
          <span className={cn("text-[14px] font-bold", product.comparePrice ? "text-[#d60000]" : "text-gray-900")}>{formatPrice(product.price)}</span>
          {product.comparePrice && <span className="text-[12px] text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>}
        </div>
      </div>
    </article>
  );
}