import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, ShoppingBag } from 'lucide-react';
import { allProductsDB } from '../data/products';

interface Hotspot {
  productId: string;
  top: string;
  left: string;
}

const hotspots: Hotspot[] = [
  { productId: 'ghe-phong-khach-arctander', top: '65%', left: '25%' },
  { productId: 'den-de-ban-gon-nhe-petite', top: '42%', left: '78%' },
  { productId: 'sofa-2-cho-ngoi', top: '72%', left: '60%' },
];

export default function Lookbook() {
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + '₫';
  };

  const activeProduct = allProductsDB.find((p) => p.id === activeId);

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-16 px-4 font-sans text-gray-800">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-[13px] font-bold uppercase tracking-[0.3em] text-[#9c4533] mb-4">Inspiration Space</h1>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 italic">Lookbook - Không gian cảm hứng</h2>
          <p className="text-gray-500 leading-relaxed italic">
            Khám phá sự kết hợp hoàn hảo giữa các món đồ nội thất trong không gian sống thực tế. 
            Nhấp vào các điểm đánh dấu để xem chi tiết từng tác phẩm.
          </p>
        </div>

        {/* Main Interactive Image */}
        <div className="relative mx-auto max-w-5xl group shadow-2xl rounded-sm overflow-hidden border border-gray-100">
          <img 
            src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Living Room" 
            className="w-full h-auto object-cover block transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Overlay to darken slightly on hover to pop the hotspots */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

          {/* Hotspots Mapping */}
          {hotspots.map((spot) => (
            <div 
              key={spot.productId}
              className="absolute z-20 group/spot"
              style={{ top: spot.top, left: spot.left }}
            >
              <button
                onClick={() => setActiveId(activeId === spot.productId ? null : spot.productId)}
                className="relative flex items-center justify-center w-8 h-8 focus:outline-none"
              >
                {/* Ping Animation */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#9c4533] opacity-75 animate-ping"></span>
                {/* Main Dot */}
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#9c4533] border-2 border-white shadow-lg"></span>
              </button>

              {/* Interactive Popup */}
              {activeId === spot.productId && activeProduct && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 bg-white shadow-2xl p-4 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300 z-50 rounded-sm">
                  <div className="relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setActiveId(null); }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-100 flex items-center justify-center rounded-full shadow-md hover:text-[#9c4533]"
                    >
                      <X size={14} />
                    </button>

                    <div className="flex gap-4">
                      <div className="w-20 h-24 bg-gray-50 shrink-0 overflow-hidden border border-gray-100">
                        <img src={activeProduct.image} alt={activeProduct.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-between py-1">
                        <div>
                          <h4 className="text-[13px] font-bold leading-tight mb-1 line-clamp-2 uppercase italic">{activeProduct.title}</h4>
                          <p className="text-[#9c4533] font-black text-sm">{formatPrice(activeProduct.price)}</p>
                        </div>
                        <button 
                          onClick={() => navigate(`/products/${activeProduct.id}`)}
                          className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#9c4533] transition-colors mt-2"
                        >
                          Xem chi tiết <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Little triangle pointing down */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white shadow-sm" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[1px] bg-gray-200" />
            <ShoppingBag size={20} className="text-[#9c4533]" />
            <span className="w-12 h-[1px] bg-gray-200" />
          </div>
          <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-6">Bạn đã tìm thấy cảm hứng?</p>
          <button 
            onClick={() => navigate('/collections/all')}
            className="px-12 py-5 bg-[#9c4533] text-white font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#9c4533]/20"
          >
            Khám phá tất cả sản phẩm
          </button>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24 border-t border-gray-100 pt-16">
          <div className="text-center">
            <h3 className="text-[14px] font-bold uppercase tracking-widest mb-3 italic">Thiết kế tinh xảo</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">Mỗi sản phẩm đều được chế tác từ bàn tay của các nghệ nhân lành nghề nhất.</p>
          </div>
          <div className="text-center">
            <h3 className="text-[14px] font-bold uppercase tracking-widest mb-3 italic">Vật liệu bền vững</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">Chúng tôi ưu tiên sử dụng gỗ tự nhiên và các vật liệu thân thiện với môi trường.</p>
          </div>
          <div className="text-center">
            <h3 className="text-[14px] font-bold uppercase tracking-widest mb-3 italic">Đẳng cấp Luxury</h3>
            <p className="text-[13px] text-gray-500 leading-relaxed">Mang tiêu chuẩn Châu Âu vào từng đường nét không gian sống hiện đại.</p>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            © 2026 Modern Furniture Interior Lookbook - Luxury Edition
          </p>
        </div>
      </div>
    </div>
  );
}