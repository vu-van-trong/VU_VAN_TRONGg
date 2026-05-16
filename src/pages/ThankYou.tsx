import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag, BookOpen } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';

export default function ThankYou() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // 4. YÊU CẦU KỸ THUẬT: Xóa sạch giỏ hàng khi trang được tải
    localStorage.removeItem('cart'); 
    clearCart(); // Đồng bộ state trong store để cập nhật UI Header
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 py-20 font-sans">
      <div className="max-w-2xl w-full text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
        {/* 2. Biểu tượng (Icon) */}
        <div className="flex justify-center mb-10">
          <div className="w-20 h-20 rounded-full border border-[#8A4A37]/30 flex items-center justify-center bg-white shadow-sm">
            <Check size={36} className="text-[#8A4A37]" strokeWidth={1.5} />
          </div>
        </div>

        {/* 2. Tiêu đề (Headline) */}
        <h1 className="text-[24px] md:text-[32px] font-medium tracking-[0.3em] text-[#1a1a1a] mb-6 uppercase">
          Đặt hàng thành công!
        </h1>

        {/* 2. Lời nhắn (Message) */}
        <p className="text-[#555] text-base md:text-[17px] leading-relaxed mb-10 max-w-lg mx-auto">
          Cảm ơn bạn đã tin tưởng <span className="font-semibold text-[#1a1a1a]">Modern Furniture</span>. 
          Đơn hàng của bạn đã được tiếp nhận và đang trong quá trình xử lý thủ công bởi các nghệ nhân của chúng tôi.
        </p>

        {/* 2. Tóm tắt đơn hàng giả định (Order Info) */}
        <div className="bg-white/50 border border-gray-200 rounded-lg p-6 mb-12 inline-block text-left min-w-[300px] shadow-sm">
          <div className="space-y-3">
            <div className="flex justify-between gap-8 text-[13px]">
              <span className="text-gray-400 uppercase tracking-wider">Mã đơn hàng</span>
              <span className="font-bold text-[#1a1a1a]">#MF-202401</span>
            </div>
            <div className="flex justify-between gap-8 text-[13px]">
              <span className="text-gray-400 uppercase tracking-wider">Phương thức</span>
              <span className="font-bold text-[#1a1a1a]">COD (Thanh toán khi nhận)</span>
            </div>
            <div className="flex justify-between gap-8 text-[13px]">
              <span className="text-gray-400 uppercase tracking-wider">Dự kiến giao</span>
              <span className="text-[#8A4A37] font-bold italic">2-3 ngày làm việc</span>
            </div>
          </div>
        </div>

        {/* 3. NÚT HÀNH ĐỘNG (CTA BUTTONS) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-10 py-4 bg-[#8A4A37] text-white text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-[#6D3929] transition-all duration-300 shadow-lg shadow-[#8A4A37]/20 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            Tiếp tục mua sắm
          </Link>
          <Link
            to="/blogs/news"
            className="w-full sm:w-auto px-10 py-4 border border-gray-300 text-[#555] text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:border-[#8A4A37] hover:text-[#8A4A37] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <BookOpen size={18} />
            Xem tin tức
          </Link>
        </div>

        <p className="mt-16 text-[11px] text-gray-400 uppercase tracking-widest">
          © 2024 Modern Furniture Luxury Edition
        </p>
      </div>
    </div>
  );
}