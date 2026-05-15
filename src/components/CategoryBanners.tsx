import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

const categories = [
  {
    title: 'Phòng khách tối giản',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/home_category_1_banner.jpg?v=438',
    link: '/collections/all'
  },
  {
    title: 'Sofa hiện đại',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/home_category_2_banner.jpg?v=438',
    link: '/collections/all'
  },
  {
    title: 'Phụ kiện trang trí',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/home_category_3_banner.jpg?v=438',
    link: '/collections/all'
  },
  {
    title: 'Sản phẩm mới',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/home_category_4_banner.jpg?v=438',
    link: '/collections/all'
  },
  {
    title: 'Trang trí phòng tắm',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/home_category_5_banner.jpg?v=438',
    link: '/collections/all'
  }
];

export default function CategoryBanners() {
  return (
    <div className="ldpage-furniture01-listbanner py-[20px] md:py-[40px]">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 20 }
        }}
        loop={true}
        className="category-swiper px-[15px]"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx} className="px-[10px]">
             <div className="block-banner-category relative overflow-hidden bg-[#f4f4f4] rounded-lg group">
                <a href={cat.link} className="block ratiobox hover:scale-110 transition-transform duration-2000">
                  <img src={cat.image} alt={cat.title} className="w-full transition-transform duration-2000 group-hover:scale-110" />
                </a>
                <div className="caption_banner_slide absolute bottom-0 left-0 w-full p-[15px] md:p-[20px] bg-black/50 text-white">
                  <h3 className="text-[16px] leading-[22px] mb-[12px] line-clamp-1">{cat.title}</h3>
                  <a href={cat.link} className="button inline-block px-[15px] py-[5px] border border-white uppercase text-[12px] hover:bg-white hover:text-black transition-colors">
                    Xem ngay
                  </a>
                </div>
             </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}