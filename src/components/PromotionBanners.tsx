import React from 'react';

const promos = [
  {
    subtitle: 'Thư giãn với',
    title: 'Sofa',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/block_home_category1.jpg?v=438',
    link: '/collections/all'
  },
  {
    subtitle: 'Thiết kế hiện đại',
    title: 'Modern Furniture',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/block_home_category2.jpg?v=438',
    link: '/collections/all'
  },
  {
    subtitle: 'Nội Thất Sang Trọng',
    title: 'Phong Cách Hoàng Gia',
    image: 'https://theme.hstatic.net/1000309459/1000717021/14/block_home_category3.jpg?v=438',
    link: '/collections/all'
  }
];

export default function PromotionBanners() {
  return (
    <div className="wrapper-home-banner mt-10">
      <div className="flex flex-wrap md:flex-notwrap">
        {promos.map((promo, idx) => (
          <div key={idx} className="w-full md:w-1/3 p-1">
            <div className="block-banner-category relative overflow-hidden bg-gray-100 ratiobox group">
              <a href={promo.link} className="block group-hover:scale-105 transition-transform duration-1000">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-auto"
                />
              </a>
              <div className="caption_banner absolute bottom-12 left-0 w-full px-12 text-white pointer-events-none">
                <span className="text-[15px] font-normal block mb-4">{promo.subtitle}</span>
                <h3 className="text-[23px] font-bold mb-4">{promo.title}</h3>
                <a href={promo.link} className="inline-block px-7 py-2.5 border border-white uppercase text-[12px] bg-white text-[#252525] hover:bg-transparent hover:text-white pointer-events-auto transition-all">
                  Mua ngay
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}