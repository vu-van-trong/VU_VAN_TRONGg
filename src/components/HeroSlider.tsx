import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    mobile: 'https://theme.hstatic.net/1000309459/1000717021/14/slideshow_1_large.jpg?v=438',
    desktop: 'https://theme.hstatic.net/1000309459/1000717021/14/slideshow_1.jpg?v=438',
    title: 'Sản phẩm nổi bật'
  },
  {
    id: 2,
    mobile: 'https://theme.hstatic.net/1000309459/1000717021/14/slideshow_2_large.png?v=438',
    desktop: 'https://theme.hstatic.net/1000309459/1000717021/14/slideshow_2.jpg?v=438',
    title: 'Sản phẩm nổi bật'
  },
  {
    id: 3,
    mobile: 'https://theme.hstatic.net/1000309459/1000717021/14/slideshow_3_large.png?v=438',
    desktop: 'https://theme.hstatic.net/1000309459/1000717021/14/slideshow_3.jpg?v=438',
    title: 'Sản phẩm nổi bật'
  }
];

export default function HeroSlider() {
  return (
    <div id="home-slider" className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        className="hero-swiper h-auto"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <a href="/collections/all" className="block w-full">
              <picture>
                <source media="(max-width: 480px)" srcSet={slide.mobile} />
                <source media="(min-width: 481px)" srcSet={slide.desktop} />
                <img 
                  src={slide.desktop} 
                  alt={slide.title} 
                  className="w-full h-auto object-cover"
                />
              </picture>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom navigation style to match legacy if needed, or use default swiper */}
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: transparent;
          border: 2px solid #fff;
          opacity: 1;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background: #fff;
        }
        .hero-swiper .swiper-pagination {
          bottom: 28px !important;
        }
      `}</style>
    </div>
  );
}