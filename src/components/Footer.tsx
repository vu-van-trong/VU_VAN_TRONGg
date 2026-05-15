import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer bg-white pt-10 border-t border-gray-100">
      <div className="top-footer bg-[#f3f3f3] py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-2/3 mb-4 lg:mb-0">
               <div className="flex items-center gap-4 mb-4 lg:mb-0">
                 <h4 className="font-bold uppercase text-sm">Đăng ký nhận tin</h4>
                 <form className="flex-1 flex max-w-md">
                   <input 
                    type="email" 
                    placeholder="Nhập email của bạn" 
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 outline-none focus:border-[#9c4533]"
                   />
                   <button className="bg-[#9c4533] text-white px-6 py-2.5 font-bold uppercase text-sm">Đăng ký</button>
                 </form>
               </div>
            </div>
            <div className="w-full lg:w-1/3 text-right">
              <div className="flex items-center lg:justify-end gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Phone size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium">Hỗ trợ / Mua hàng:</span>
                <a href="tel:1900636099" className="text-red-500 font-bold">1900 636 099</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="main-footer py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-6">
              <h4 className="text-xl font-bold">Giới thiệu</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Modern-Furniture trang mua sắm trực tuyến của thương hiệu Lama, chuyên nội thất cao cấp, giúp bạn tiếp cận xu hướng nội thất mới nhất.
              </p>
              <div className="w-40">
                <img src="https://theme.hstatic.net/1000309459/1000717021/14/logo_bct.png?v=438" alt="Bộ Công Thương" />
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-xl font-bold">Thông tin liên hệ</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex gap-3">
                  <MapPin size={20} className="shrink-0 pt-1" />
                  <span>Tầng 4, tòa nhà Flemington, số 182, đường Lê Đại Hành, phường 15, quận 11, Tp. Hồ Chí Minh.</span>
                </li>
                <li className="flex gap-3">
                  <Phone size={18} className="shrink-0" />
                  <span>1900.636.099</span>
                </li>
                <li className="flex gap-3">
                   <Mail size={18} className="shrink-0" />
                   <span>hi@haravan.com</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-xl font-bold">Liên kết</h4>
               <ul className="space-y-2 text-sm text-gray-600">
                 <li><a href="/" className="hover:text-[#9c4533]">Sản phẩm khuyến mãi</a></li>
                 <li><a href="/" className="hover:text-[#9c4533]">Sản phẩm nổi bật</a></li>
                 <li><a href="/" className="hover:text-[#9c4533]">Tất cả sản phẩm</a></li>
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-xl font-bold">Hỗ trợ</h4>
               <ul className="space-y-2 text-sm text-gray-600">
                 <li><a href="/" className="hover:text-[#9c4533]">Tìm kiếm</a></li>
                 <li><a href="/" className="hover:text-[#9c4533]">Giới thiệu</a></li>
                 <li><a href="/" className="hover:text-[#9c4533]">Chính sách đổi trả</a></li>
                 <li><a href="/" className="hover:text-[#9c4533]">Chính sách bảo mật</a></li>
                 <li><a href="/" className="hover:text-[#9c4533]">ĐIều khoản dịch vụ</a></li>
               </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-footer py-6 border-t border-gray-100 text-center text-gray-500 text-sm">
        <p>Copyright © 2026 Modern Furniture. Powered by Haravan</p>
      </div>
    </footer>
  );
}