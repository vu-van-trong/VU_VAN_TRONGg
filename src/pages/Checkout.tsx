import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + '₫';
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // ĐỒNG BỘ LOGIC KIỂM TRA ĐĂNG NHẬP: Khớp 100% với Header (Key 'currentUser')
    const savedUser = localStorage.getItem('currentUser');
    if (!savedUser) {
      alert("Vui lòng đăng nhập để tiếp tục đặt hàng!");
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      return;
    }

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc: Họ tên, Số điện thoại và Địa chỉ nhận hàng!');
      return;
    }

    // HOÀN TẤT ĐẶT HÀNG: Xóa sạch dữ liệu giỏ hàng và chuyển hướng bắt buộc sang trang Cảm ơn
    localStorage.removeItem('cart');
    clearCart();
    navigate('/thank-you', { replace: true });
  };

  if (!items.length) {
    return (
      <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
        <div className="bg-[#f5f5f5] py-3">
          <div className="container mx-auto px-4 md:px-8">
            <nav className="flex items-center gap-2 text-[13px] text-gray-500">
              <Link to="/" className="hover:text-[#9c4533]">
                Trang chủ
              </Link>
              <ChevronRight size={12} />
              <span className="text-[#9c4533]">Thanh toán</span>
            </nav>
          </div>
        </div>
        <main className="flex-1 container mx-auto px-4 md:px-8 py-24 text-center">
          <h1 className="text-3xl font-bold uppercase tracking-tight mb-4">Chưa có sản phẩm để thanh toán</h1>
          <p className="text-gray-500 mb-10 leading-relaxed">Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm trước khi thanh toán.</p>
          <Link
            to="/collections/all"
            className="bg-[#9c4533] text-white px-12 py-5 font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-[#9c4533]/20 inline-block"
          >
            Tiếp tục mua sắm
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      <div className="bg-[#f5f5f5] py-3">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-[13px] text-gray-500">
            <Link to="/" className="hover:text-[#9c4533]">
              Trang chủ
            </Link>
            <ChevronRight size={12} />
            <Link to="/cart" className="hover:text-[#9c4533]">
              Giỏ hàng
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#9c4533]">Thanh toán</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-8 py-16">
        <h1 className="text-[32px] md:text-[40px] font-bold uppercase tracking-tighter mb-12">Thanh toán</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          <form onSubmit={handlePlaceOrder} className="flex-1 space-y-8">
            <div>
              <h2 className="text-lg font-bold uppercase tracking-widest mb-4">Thông tin nhận hàng</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Họ và tên"
                  className="h-12 px-4 bg-gray-50 border border-gray-100 focus:outline-none focus:bg-white focus:border-[#9c4533] transition-all"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Số điện thoại"
                  className="h-12 px-4 bg-gray-50 border border-gray-100 focus:outline-none focus:bg-white focus:border-[#9c4533] transition-all"
                />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Địa chỉ"
                  className="h-12 px-4 bg-gray-50 border border-gray-100 focus:outline-none focus:bg-white focus:border-[#9c4533] transition-all md:col-span-2"
                />
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8">
              <button
                type="submit"
                className="w-full bg-[#9c4533] text-white py-5 font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#9c4533]/20"
              >
                Đặt hàng
              </button>
              <div className="mt-4 text-center">
                <Link to="/cart" className="text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-1 hover:text-[#9c4533] hover:border-[#9c4533] transition-all">
                  Quay lại giỏ hàng
                </Link>
              </div>
            </div>
          </form>

          <aside className="w-full lg:w-[420px] shrink-0">
            <div className="bg-[#f9f9f9] p-8 md:p-10 sticky top-32">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-8 border-b border-gray-200 pb-4">Đơn hàng</h3>

              <div className="space-y-4 max-h-[360px] overflow-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="h-16 w-16 shrink-0 bg-white border border-gray-200 overflow-hidden">
                      {item.image ? <img src={item.image} alt={item.name} className="h-full w-full object-cover" /> : null}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{item.name}</div>
                      <div className="text-[12px] text-gray-500 mt-1">
                        SL: <span className="font-semibold text-gray-800">{item.quantity}</span>
                        {item.variant ? <span className="ml-2">• {item.variant}</span> : null}
                        {item.size ? <span className="ml-2">• Size {item.size}</span> : null}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#9c4533] tabular-nums">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Tạm tính</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Phí vận chuyển</span>
                  <span className="text-green-600 font-bold">Miễn phí</span>
                </div>
                <div className="flex justify-between items-center text-lg pt-2">
                  <span className="font-bold uppercase tracking-widest">Tổng cộng</span>
                  <span className="font-extrabold text-[#9c4533] text-2xl">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
