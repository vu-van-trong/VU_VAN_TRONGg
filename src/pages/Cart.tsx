import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const showToast = useToastStore((state) => state.showToast);

  // State cho mã giảm giá
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [couponError, setCouponError] = useState('');

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + '₫';
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    let rate = 0;

    // Logic kiểm tra mã dựa trên dữ liệu từ SalePage
    if (code === 'DEAL10') rate = 0.1;
    else if (code === 'SALE20') rate = 0.2;
    else if (code === 'VIP30') rate = 0.3;
    else if (code === 'NEWBIE') rate = 0.15;

    if (rate > 0) {
      setDiscount(Math.round(subtotal * rate));
      setAppliedCode(code);
      setCouponError('');
      showToast(`Đã áp dụng mã ${code} giảm ${rate * 100}%`);
    } else {
      setDiscount(0);
      setAppliedCode('');
      setCouponError('Mã giảm giá không chính xác hoặc đã hết hạn');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
        <main className="flex-1 container mx-auto px-4 py-24 text-center">
           <div className="flex flex-col items-center max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-8">
                 <ShoppingBag size={40} className="text-gray-300" />
              </div>
              <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Giỏ hàng trống</h1>
              <p className="text-gray-500 mb-10 leading-relaxed">Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy tiếp tục mua sắm để tìm thấy những món đồ ưng ý nhất cho tổ ấm của bạn.</p>
              <Link to="/collections/all" className="bg-[#9c4533] text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#9c4533]/20">
                Tiếp tục mua sắm
              </Link>
           </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      <div className="bg-[#f5f5f5] py-3">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-[13px] text-gray-500">
            <Link to="/" className="hover:text-[#9c4533]">Trang chủ</Link>
            <ChevronRight size={12} />
            <span className="text-[#9c4533]">Giỏ hàng của bạn</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-8 py-16">
        <h1 className="text-[32px] md:text-[40px] font-bold uppercase tracking-tighter mb-12">Giỏ hàng <span className="text-gray-300 ml-2">({items.length})</span></h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* 🛒 Cart Items */}
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-6 border-b border-gray-100 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              <div className="col-span-6">Sản phẩm</div>
              <div className="col-span-2 text-center">Giá</div>
              <div className="col-span-2 text-center">Số lượng</div>
              <div className="col-span-2 text-right">Tổng cộng</div>
            </div>

            <div className="divide-y divide-gray-100">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.size}-${item.variant}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8 items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center gap-6">
                      <Link to={`/products/${item.id}`} className="w-24 h-32 shrink-0 bg-gray-50 overflow-hidden border border-gray-100">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs font-bold uppercase tracking-widest text-gray-300">
                            No image
                          </div>
                        )}
                      </Link>
                      <div className="flex flex-col">
                        <Link to={`/products/${item.id}`} className="font-bold hover:text-[#9c4533] transition-colors leading-tight mb-2">
                          {item.name}
                        </Link>
                        {(item.size || item.variant) && (
                          <p className="mb-2 text-xs font-medium text-gray-400">
                            {item.size && `Kích cỡ: ${item.size}`}{item.size && item.variant ? ' · ' : ''}{item.variant && `Màu: ${item.variant}`}
                          </p>
                        )}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors w-fit"
                        >
                          <Trash2 size={12} /> Xóa
                        </button>
                        {/* Mobile price/qty info */}
                        <div className="mt-4 flex items-center justify-between md:hidden w-full">
                           <div className="flex items-center border border-gray-200">
                              <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center"><Minus size={12} /></button>
                              <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center"><Plus size={12} /></button>
                           </div>
                           <span className="font-bold text-[#9c4533]">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price - Desktop only */}
                    <div className="hidden md:block col-span-2 text-center font-bold text-gray-500">
                      {formatPrice(item.price)}
                    </div>

                    {/* Quantity - Desktop only */}
                    <div className="hidden md:flex col-span-2 justify-center">
                      <div className="flex items-center border border-gray-200 h-10">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-10 h-full flex items-center justify-center hover:bg-gray-50"><Minus size={14} /></button>
                        <span className="w-12 text-center text-sm font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-10 h-full flex items-center justify-center hover:bg-gray-50"><Plus size={14} /></button>
                      </div>
                    </div>

                    {/* Total - Desktop only */}
                    <div className="hidden md:block col-span-2 text-right font-bold text-[#9c4533]">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="pt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <Link to="/collections/all" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#9c4533] hover:border-[#9c4533] transition-all">
                  Tiếp tục mua hàng
               </Link>
               <div className="text-right">
                  <p className="text-gray-400 text-sm mb-1 italic">Ghi chú cho đơn hàng của bạn</p>
                  <textarea className="w-full md:w-[400px] bg-gray-50 border border-gray-100 p-4 text-sm focus:outline-none focus:bg-white focus:border-[#9c4533] transition-all min-h-[100px]" placeholder="Yêu cầu đặc biệt..." />
               </div>
            </div>
          </div>

          {/* 💰 Summary */}
          <aside className="w-full lg:w-[380px] shrink-0">
             <div className="bg-[#f9f9f9] p-8 md:p-10 sticky top-32">
                <h3 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-gray-200 pb-4">Tóm tắt đơn hàng</h3>
                
                {/* 🎫 Nhập mã giảm giá */}
                <div className="mb-8">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Mã giảm giá</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Dán mã tại đây..." 
                      className="flex-1 bg-white border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#9c4533] transition-all" 
                    />
                    <button 
                      onClick={handleApplyCoupon}
                      className="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#9c4533] transition-all"
                    >
                      Áp dụng
                    </button>
                  </div>
                  {couponError && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase">{couponError}</p>}
                  {appliedCode && <p className="text-green-600 text-[10px] mt-2 font-bold uppercase">✓ Đã áp dụng mã: {appliedCode}</p>}
                </div>

                <div className="space-y-6 mb-10 text-sm">
                   <div className="flex justify-between items-center">
                      <span className="text-gray-500 font-medium">Tạm tính</span>
                      <span className="font-bold">{formatPrice(subtotal)}</span>
                   </div>
                   {discount > 0 && (
                     <div className="flex justify-between items-center text-red-500 animate-in fade-in slide-in-from-right-4 duration-300">
                        <span className="font-medium italic">Giảm giá ({appliedCode})</span>
                        <span className="font-bold">-{formatPrice(discount)}</span>
                     </div>
                   )}
                   <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                      <span className="text-gray-500 font-medium">Phí vận chuyển</span>
                      <span className="text-green-600 font-bold">Miễn phí</span>
                   </div>
                   <div className="flex justify-between items-center text-lg">
                      <span className="font-bold uppercase tracking-widest">Tổng cộng</span>
                      <span className="font-extrabold text-[#9c4533] text-2xl">{formatPrice(subtotal - discount)}</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <Link to="/checkout" className="w-full bg-[#9c4533] text-white py-5 font-bold uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#9c4533]/20">
                      Thanh toán ngay <ArrowRight size={18} />
                   </Link>
                   <p className="text-[11px] text-gray-400 text-center leading-relaxed px-4">
                      Thuế VAT (nếu có) được tính tại trang thanh toán. Đơn hàng của bạn sẽ được xử lý trong vòng 24h.
                   </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-12 pt-12 border-t border-gray-200 grid grid-cols-3 gap-4 grayscale opacity-60">
                   <img src="https://theme.hstatic.net/1000309459/1000717021/14/pay_1.png" alt="Visa" />
                   <img src="https://theme.hstatic.net/1000309459/1000717021/14/pay_2.png" alt="Mastercard" />
                   <img src="https://theme.hstatic.net/1000309459/1000717021/14/pay_3.png" alt="ATM" />
                </div>
             </div>
          </aside>
        </div>
      </main>
    </div>
  );
}