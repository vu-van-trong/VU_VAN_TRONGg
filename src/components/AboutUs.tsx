import React from 'react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <div className="wrapper-home-information mt-10 bg-gray-50 border-y border-gray-100">
      <div className="container-fluid mx-auto">
        <div className="flex flex-wrap overflow-hidden">
          <div className="w-full md:w-1/2 relative min-h-[400px] flex flex-col items-center justify-center p-8 bg-cover bg-center" style={{ backgroundImage: `url('https://theme.hstatic.net/1000309459/1000717021/14/home_about_image.jpg?v=438')` }}>
            <div className="absolute inset-0 bg-black/40 z-0" />
            <motion.div 
               initial={{ y: 30, opacity: 0 }}
               whileInView={{ y: 0, opacity: 1 }}
               viewport={{ once: true }}
               className="relative z-10 text-center"
            >
              <h2 className="text-white text-[54px] font-bold mb-8">Về chúng tôi</h2>
              <a href="/pages/about-us" className="inline-block px-10 py-5 bg-white text-gray-800 uppercase font-bold text-[14px] hover:bg-black hover:text-white transition-all">
                Xem ngay
              </a>
            </motion.div>
          </div>
          <div className="w-full md:w-1/2 flex items-center lg:px-12 p-8">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               className="inf-content text-[15px] font-medium leading-[1.6] text-gray-700"
            >
              <div className="space-y-4">
                <p>Trang giới thiệu giúp khách hàng hiểu rõ hơn về cửa hàng của bạn. Hãy cung cấp thông tin cụ thể về việc kinh doanh, về cửa hàng, thông tin liên hệ. Điều này sẽ giúp khách hàng cảm thấy tin tưởng khi mua hàng trên website của bạn.</p>
                <p>Một vài gợi ý cho nội dung trang Giới thiệu:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Bạn là ai</li>
                  <li>Giá trị kinh doanh của bạn là gì</li>
                  <li>Địa chỉ cửa hàng</li>
                  <li>Bạn đã kinh doanh trong ngành hàng này bao lâu rồi</li>
                  <li>Bạn kinh doanh ngành hàng online được bao lâu</li>
                  <li>Đội ngũ của bạn gồm những ai</li>
                  <li>Thông tin liên hệ</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}