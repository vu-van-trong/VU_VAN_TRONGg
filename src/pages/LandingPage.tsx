import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';
import ProductCard from '../components/ProductCard';

/**
 * @description Trang Landing Page - Phần Banner và Countdown
 * @author Triệu Quang Trường
 */
const PRODUCT_TABS = [
  { id: 'khuyen-mai', label: 'Sản phẩm khuyến mãi' },
  { id: 'ban-chay', label: 'Sản phẩm bán chạy' },
  { id: 'noi-bat', label: 'Sản phẩm nổi bật' },
  { id: 'moi', label: 'Sản phẩm mới' },
] as const;

/** CDN Haravan: đường dẫn phải có đủ hash file, nếu thiếu ảnh sẽ 404 */
function cdnImg(path: string) {
  if (path.startsWith('http')) return path;
  return `https:${path.startsWith('//') ? path : `//${path}`}`;
}

const productData: Array<{
  id: number;
  name: string;
  price: string;
  oldPrice: string | null;
  sale: string | null;
  soldOut?: boolean;
  img: string;
}> = [
  {
    id: 1,
    name: 'Ấm trà inox không gỉ',
    price: '890,000₫',
    oldPrice: '1,250,000₫',
    sale: '29%',
    img: '//product.hstatic.net/1000309459/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_35e9cf348a3b4df28059491ff6c6ff08_large.jpg',
  },
  {
    id: 2,
    name: 'Bàn xếp gọn nhẹ TB01',
    price: '1,300,000₫',
    oldPrice: null,
    sale: null,
    img: '//product.hstatic.net/1000309459/product/sp11-1_f33d1b5977c84d01ac0037fdcb6c7317_2430fe7863a34cbf9f2190326cd08dab_large.jpg',
  },
  {
    id: 3,
    name: 'Đèn để bàn gọn nhẹ Petite',
    price: '690,000₫',
    oldPrice: null,
    sale: null,
    img: '//product.hstatic.net/1000309459/product/sp8-1_5d1c7dc8e938478290333f2625515d68_28699549035a4a1e8823d70b9a6f8388_large.jpg',
  },
  {
    id: 4,
    name: 'Đèn treo sang trọng Hubert',
    price: '1,200,000₫',
    oldPrice: '1,360,000₫',
    soldOut: true,
    sale: '12%',
    img: '//product.hstatic.net/1000309459/product/sp4-2_97670563a9c9462e91b405158f85b77a_1e84319ca6f74a5fbe7043f038a05166_large.jpg',
  },
  {
    id: 5,
    name: 'Ghế gỗ bập bênh Iconic',
    price: '700,000₫',
    oldPrice: '890,000₫',
    sale: '21%',
    img: '//product.hstatic.net/1000309459/product/sp5-2_fde6cf697c5343489c0715a2a77c9161_8ccf08b77b384087b8e47d0d62541382_large.jpg',
  },
  {
    id: 6,
    name: 'Ghế phòng khách Arctander',
    price: '799,000₫',
    oldPrice: '999,000₫',
    sale: '20%',
    img: '//product.hstatic.net/1000309459/product/sp1-1_8b56d5f805744ca98b24545ae72d3cb4_c596aa3fb2e7428a87cdf3b0567c2d8a_large.jpg',
  },
  {
    id: 7,
    name: 'Ghế sofa giường kéo Roots',
    price: '7,200,000₫',
    oldPrice: '7,800,000₫',
    sale: '8%',
    img: '//product.hstatic.net/1000309459/product/sp7-1_83fd0de6ab8b437d9b28cf50ad5e69cb_ef26305786114080bc65e3de534bfd69_large.jpg',
  },
  {
    id: 8,
    name: 'Ghế Sofa phòng khách S003',
    price: '6,800,000₫',
    oldPrice: '7,900,000₫',
    sale: '14%',
    img: '//product.hstatic.net/1000309459/product/sp9-1_a13a66828d904b0388e03b4b12fdbea0_b699f1d6595244148610a17d3a3393f9_large.jpg',
  },
  {
    id: 9,
    name: 'Ghế trứng treo Oval',
    price: '1,300,000₫',
    oldPrice: null,
    sale: null,
    img: '//product.hstatic.net/1000309459/product/sp3_97f7ec448aae411f907b7ab4d04d0e52_fc6e8187831c46299c2e264d992aa10b_large.jpg',
  },
  {
    id: 10,
    name: 'Ghế tựa lưng phòng khách S004',
    price: '2,400,000₫',
    oldPrice: '3,200,000₫',
    sale: '25%',
    img: '//product.hstatic.net/1000309459/product/sp10-1_bee2a9c0558d4324bf174ec4dca83071_d2c27994d7be4d71b388b3c9f95826c2_large.jpg',
  },
];

const COUPON_BG = '#fff5f5';

const COUPONS = [
  {
    id: 'c1',
    code: '0I1S9XE9GMXY',
    highlight: '200k',
    conditions: ['Đơn hàng từ 500k'],
    date: '04/08/2021',
    tips: [
      'Giảm 200k cho đơn hàng có giá trị từ 500k',
      'Mỗi khách hàng được sử dụng tối đa 1 lần.',
      'Sao chép mã và nhập mã khuyến mãi ở trang thanh toán',
    ],
  },
  {
    id: 'c2',
    code: 'T91RM6QPTDFJ',
    highlight: '300K',
    conditions: ['Cho đơn hàng từ 1 triệu'],
    date: '04/08/2021',
    tips: [
      'Giảm 300k cho đơn hàng có giá trị từ 1 triệu',
      'Mã khuyến mãi có thể sử dụng chung với chương trình khuyến mãi',
      'Sao chép mã và nhập mã khuyến mãi ở trang thanh toán',
    ],
  },
  {
    id: 'c3',
    code: 'JRRDUBIQDVT8',
    highlight: '20%',
    conditions: ['Tất cả đơn hàng'],
    date: '30/07/2021',
    tips: ['Giảm 20% tối đa 300k cho tất cả đơn hàng', 'Sao chép mã và nhập mã khuyến mãi ở trang thanh toán'],
  },
  {
    id: 'c4',
    code: 'E8G2ZLTJUS7Q',
    highlight: '30%',
    conditions: ['Tất cả đơn hàng'],
    date: '31/07/2021',
    tips: ['Giảm 30% tối đa 500,000 ₫ cho tất cả đơn hàng', 'Sao chép mã và nhập mã khuyến mãi ở trang thanh toán'],
  },
] as const;

type ProductRowItem = (typeof productData)[number];

const HOT_TABS = [
  { id: 'ghe', label: 'Ghế gỗ văn phòng' },
  { id: 'den', label: 'Đèn để bàn' },
  { id: 'ban', label: 'Bàn xếp' },
] as const;

const SLUG_MAP: Record<number, string> = {
  1: 'am-tra-inox-khong-ghi',
  2: 'ban-xep-gon-nhe-tb01',
  3: 'den-de-ban-gon-nhe-petite',
  4: 'den-treo-sang-trong-hubert',
  5: 'ghe-go-bap-benh-iconic',
  6: 'ghe-phong-khach-arctander',
  7: 'ghe-sofa-giuong-keo-roots',
  8: 'sofa-2-cho-ngoi',
  9: 'ghe-thu-gian-cao-cap',
  10: 'tu-sach-go-tu-nhien',
};

function LandingProductCard({ item, variant }: { item: ProductRowItem; variant: 'promo' | 'hot' }) {
  const productSlug = SLUG_MAP[item.id] ?? `san-pham-${item.id}`;
  // Map số thứ tự LandingPage → slug thực trong products DB
  const product = {
    id: productSlug,
    title: item.name,
    price: parseInt(item.price.replace(/[^\d]/g, ''), 10),
    comparePrice: item.oldPrice ? parseInt(item.oldPrice.replace(/[^\d]/g, ''), 10) : undefined,
    label: item.sale || undefined,
    soldOut: item.soldOut,
    image: cdnImg(item.img),
  };
  return <ProductCard product={product} variant={variant} />;
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<string>('khuyen-mai');
  const [hotTab, setHotTab] = useState<string>('ghe');
  const [copiedCouponId, setCopiedCouponId] = useState<string | null>(null);
  const [openTipId, setOpenTipId] = useState<string | null>(null);

  // Logic đếm ngược thời gian thực (Trường có thể điều chỉnh ngày ở đây)
  const targetDate = new Date("2026-07-30T10:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 5, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const copyCoupon = useCallback(async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCouponId(id);
      window.setTimeout(() => setCopiedCouponId(null), 2000);
    } catch {
      setCopiedCouponId(null);
    }
  }, []);


  return (
    <div className="landing-page-wrapper bg-white mainContent-theme">
      {/* Breadcrumb — thanh xám như theme Haravan */}
      <nav
        className="breadcrumb-landing w-full bg-[#f5f5f5] border-b border-[#ebebeb]"
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-4 py-2.5 md:py-3 text-[12px] md:text-[13px] text-[#999]">
          <Link to="/collections/all" className="hover:text-[#333] transition-colors">
            Sản phẩm khuyến mãi
          </Link>
          <span className="mx-2 text-[#ccc]">/</span>
          <Link
            to="/products/ghe-phong-khach-arctander"
            className="text-[#666] hover:text-[#333] transition-colors"
          >
            Ghế phòng khách Arctander
          </Link>
        </div>
      </nav>

      {/* 🖼️ PHẦN 1: BIG BANNER */}
      <section className="ldpage-furniture01-bigbanner overflow-hidden bg-gray-50">
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bannerTop-item w-full"
        >
          <picture>
            <source media="(max-width:767px)" srcSet="//theme.hstatic.net/1000309459/1000717021/14/furniture01_bannertop_mobile.jpg?v=438" />
            <source media="(min-width: 768px)" srcSet="//theme.hstatic.net/1000309459/1000717021/14/furniture01_bannertop_image.jpg?v=438" />
            <img 
              src="//theme.hstatic.net/1000309459/1000717021/14/furniture01_bannertop_image.jpg?v=438" 
              alt="Modern Furniture Big Banner" 
              className="w-full h-auto object-cover block"
              loading="eager"
            />
          </picture>
        </motion.div>
      </section>

      {/* ⏱️ PHẦN 2: PROMOTION SUMMARY & COUNTDOWN (Nối tiếp) */}
      <section className="ldpage-furniture01-summary py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Tiêu đề chính */}
          <div className="wrapper-furniture01-heading mb-10 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black text-[#333] tracking-tighter uppercase leading-tight"
            >
              HÈ CỰC NÓNG, <span className="text-[#9c4533]">GIÁ CỰC SỐC</span>
            </motion.h1>
          </div>

          {/* Bộ đếm ngược */}
          <div className="wrapper-furniture01-countdown flex flex-col items-center">
            <div className="flex items-center mb-8 text-gray-400 font-bold uppercase text-[11px] md:text-sm tracking-[0.2em]">
              <span className="h-[1px] w-8 bg-gray-200 mr-3"></span>
              Ưu đãi kết thúc sau
              <span className="h-[1px] w-8 bg-gray-200 ml-3"></span>
            </div>

            <div className="flex items-center justify-center gap-3 md:gap-6">
              {[
                { label: 'Ngày', value: timeLeft.days },
                { label: 'Giờ', value: timeLeft.hours },
                { label: 'Phút', value: timeLeft.minutes },
                { label: 'Giây', value: timeLeft.seconds }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="relative bg-[#9c4533] text-white w-14 h-16 md:w-20 md:h-24 flex items-center justify-center rounded-md shadow-xl overflow-hidden">
                    <span className="text-2xl md:text-4xl font-black font-mono">
                      {item.value < 10 ? `0${item.value}` : item.value}
                    </span>
                    <div className="absolute inset-0 w-full h-[1px] bg-black/10 top-1/2"></div>
                  </div>
                  <span className="text-[10px] md:text-[11px] uppercase font-bold mt-3 text-gray-500 tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 🛒 PHẦN 3: TABS PRODUCT */}
      <section className="layoutPage-furniture-01 ldpage-furniture01-collection bg-[#fff5f5] py-10 md:py-14">
        <div className="container mx-auto max-w-[1320px] px-3 sm:px-4">
          <div className="flex justify-center items-end gap-6 md:gap-10 lg:gap-14 mb-10 overflow-x-auto pb-1">
            {PRODUCT_TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  className="group relative shrink-0 border-0 bg-transparent px-1 pt-1 pb-3 cursor-pointer"
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span
                    className={`text-[15px] md:text-[17px] font-medium whitespace-nowrap transition-colors ${
                      active ? 'text-black' : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[3px] md:h-1 rounded-sm bg-[#c40000] transition-opacity duration-200 ${
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                    }`}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
            {productData.map((item) => (
              <div key={item.id} className="contents">
                <LandingProductCard item={item} variant="promo" />
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12 text-center">
            <button
              type="button"
              className="inline-flex min-w-[200px] md:min-w-[260px] justify-center px-8 py-2.5 border border-[#d60000] text-[#d60000] bg-white text-sm font-medium hover:bg-[#d60000] hover:text-white transition-colors"
            >
              Xem thêm sản phẩm
            </button>
          </div>
        </div>
      </section>

      {/* Phiếu giảm giá — theo Haravan ldpage-furniture01-coupon */}
      <section className="ldpage-furniture01-coupon bg-[#fff5f5] pb-12 pt-2 md:pb-16 md:pt-4">
        <div className="container mx-auto max-w-[1320px] px-3 sm:px-4">
          <div className="list-coupon--overflow">
            <div className="list-coupon-row grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
              {COUPONS.map((c) => (
                <div key={c.id} className="coupon-item w-full">
                  <div className="coupon-item__inner relative flex min-h-[148px] overflow-hidden rounded-[6px] bg-white shadow-[0_2px_14px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06]">
                    {/* Cột đỏ — thông tin ưu đãi */}
                    <div className="coupon-item__left relative flex w-[56%] shrink-0 flex-col justify-between bg-[#d4232a] px-3 py-3.5 text-white sm:w-[54%] sm:px-4 sm:py-4">
                      <div className="cpi-info">
                        <p className="cpi-name m-0 leading-[1.1]">
                          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-white/95 sm:text-[11px]">
                            Giảm ngay
                          </span>
                          <strong className="block text-[26px] font-black tracking-tight text-white sm:text-[30px] md:text-[32px]">
                            {c.highlight}
                          </strong>
                        </p>
                        <div className="my-3 h-px w-full bg-white/45" />
                        <div className="cpi-flex flex items-end gap-2">
                          <ul className="cpi-text m-0 flex-1 list-outside list-disc pl-4 text-left text-[11px] leading-snug text-white/95 sm:text-[12px]">
                            {c.conditions.map((line) => (
                              <li key={line} className="marker:text-white/80">
                                {line}
                              </li>
                            ))}
                          </ul>
                          <button
                            type="button"
                            className="cpi-button shrink-0 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#d4232a] shadow-sm transition hover:bg-white/90 sm:px-3 sm:text-[11px]"
                            onClick={() => copyCoupon(c.id, c.code)}
                          >
                            {copiedCouponId === c.id ? 'Đã chép' : 'Sao chép mã'}
                          </button>
                        </div>
                      </div>
                      {/* Răng cưa / gạch tách kiểu vé */}
                      <div
                        className="pointer-events-none absolute inset-y-3 right-0 w-1.5 opacity-90"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(180deg, rgba(255,255,255,0.55) 0 3px, transparent 3px 7px)',
                        }}
                        aria-hidden
                      />
                    </div>

                    {/* Cột phải — hạn dùng + info */}
                    <div className="coupon-item__right relative flex flex-1 flex-col items-center justify-center bg-white px-3 py-3 text-center sm:px-4">
                      <span
                        className="pointer-events-none absolute left-0 top-5 h-4 w-4 -translate-x-1/2 rounded-full border border-black/[0.06] shadow-sm sm:top-6 sm:h-[18px] sm:w-[18px]"
                        style={{ backgroundColor: COUPON_BG }}
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute bottom-5 left-0 h-4 w-4 -translate-x-1/2 rounded-full border border-black/[0.06] shadow-sm sm:bottom-6 sm:h-[18px] sm:w-[18px]"
                        style={{ backgroundColor: COUPON_BG }}
                        aria-hidden
                      />
                      <p className="cpi-date m-0 text-[11px] leading-relaxed text-[#666] sm:text-[12px]">
                        Hạn sử dụng: <b className="font-semibold text-[#333]">{c.date}</b>
                      </p>
                      <div className="cpi-tooltip relative mt-2">
                        <button
                          type="button"
                          className="cpi-tooltip__dot flex h-8 w-8 items-center justify-center rounded-full text-[#888] transition hover:bg-gray-100 hover:text-[#333]"
                          aria-label="Chi tiết mã giảm giá"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenTipId((prev) => (prev === c.id ? null : c.id));
                          }}
                        >
                          <Info className="h-5 w-5" strokeWidth={1.75} />
                        </button>
                        {openTipId === c.id ? (
                          <div
                            role="tooltip"
                            className="absolute left-1/2 top-full z-30 mt-2 w-[min(100vw-2rem,280px)] -translate-x-1/2 rounded-md border border-gray-200 bg-white p-3 text-left text-[11px] text-gray-700 shadow-lg sm:w-72 sm:text-[12px]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p className="mb-1 font-semibold text-gray-900">Mã: {c.code}</p>
                            <ul className="m-0 list-disc space-y-1 pl-4">
                              {c.tips.map((t) => (
                                <li key={t}>{t}</li>
                              ))}
                            </ul>
                            <button
                              type="button"
                              className="mt-2 w-full rounded border border-gray-200 py-1 text-[11px] text-gray-600 hover:bg-gray-50"
                              onClick={() => setOpenTipId(null)}
                            >
                              Đóng
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thanh tiêu đề TOP bán chạy — dạng viên thuốc (pill) */}
          <div className="mt-8 flex justify-center md:mt-10">
            <div className="inline-flex max-w-full rounded-full bg-[#d4232a] px-8 py-3 text-center shadow-md sm:px-12 sm:py-3.5 md:px-16 md:py-4">
              <h2 className="m-0 whitespace-nowrap text-sm font-black uppercase tracking-[0.08em] text-white sm:text-base md:text-lg">
                TOP SẢN PHẨM BÁN CHẠY
              </h2>
            </div>
          </div>

          {/* Tab + lưới bán chạy — cùng dữ liệu, khác tab & thanh SALE đen */}
          <div
            className="section-furniture01-hotproduct wrapper-ldpage-collection mt-8 md:mt-10"
            data-index="2"
          >
            <div className="tabslist-product-title">
              <div className="flex justify-center items-end gap-10 overflow-x-auto pb-1 sm:gap-14 md:gap-20 md:pb-2">
                {HOT_TABS.map((tab) => {
                  const active = hotTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      className="group relative shrink-0 border-0 bg-transparent px-1 pt-1 pb-3 cursor-pointer"
                      onClick={() => setHotTab(tab.id)}
                    >
                      <span
                        className={`text-[15px] font-medium whitespace-nowrap transition-colors md:text-[17px] ${
                          active ? 'text-black' : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {tab.label}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-sm bg-[#c40000] transition-opacity md:h-1 ${
                          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                        }`}
                        aria-hidden
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="tabslist-product-content mt-6 md:mt-8">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
                {productData.map((item) => (
                  <div key={`hot-${item.id}`} className="contents">
                    <LandingProductCard item={item} variant="hot" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 text-center md:mt-12">
              <button
                type="button"
                className="inline-flex min-w-[200px] justify-center border border-[#d60000] bg-white px-8 py-2.5 text-sm font-medium text-[#d60000] transition-colors hover:bg-[#d60000] hover:text-white md:min-w-[260px]"
              >
                Xem thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
