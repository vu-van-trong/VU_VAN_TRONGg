import React, { useState, useRef, useEffect } from 'react';
import { Check, Minus, Plus, Maximize2, X, ChevronRight, ChevronDown, ShoppingCart } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';
import { allProductsDB, getProductById } from '@/src/data/products';
import ProductCard from '../components/ProductCard';

const formatPrice = (value: number) =>
  new Intl.NumberFormat('vi-VN').format(value) + '₫';

function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-[#e5e0dc]">
      <button
        type="button"
        className="w-full flex items-center justify-between py-4 text-left"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="text-[13px] font-semibold uppercase tracking-widest text-[#333]">
          {title}
        </span>
        <ChevronDown
          size={16}
          className={open ? 'text-[#888] shrink-0 rotate-180 transition-transform duration-300' : 'text-[#888] shrink-0 transition-transform duration-300'}
        />
      </button>
      {open && (
        <div className="pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

function RelatedCard({ p }: { p: (typeof allProductsDB)[0] }) {
  return (
    <ProductCard
      product={{
        id: p.id,
        title: p.title,
        price: p.price,
        comparePrice: p.comparePrice,
        label: p.comparePrice ? `-${Math.round(100 - (p.price / p.comparePrice) * 100)}%` : undefined,
        soldOut: p.soldOut,
        image: p.image,
      }}
    />
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const normalizedId = id?.toString().trim().toLowerCase() ?? '';
  const product = getProductById(normalizedId);

  const relatedProducts = allProductsDB
    .filter((p) => p.id.toLowerCase() !== normalizedId)
    .slice(0, 5);

  const firstAvailableVariant =
    product?.variants.find((v) => !v.soldout)?.value ??
    product?.variants[0]?.value ??
    '';

  const [selectedVariant, setSelectedVariant] = useState(firstAvailableVariant);
  const [quantity, setQuantity] = useState(1);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setCurrentImgIndex(0);
    setQuantity(1);
    setIsAdded(false);
    if (product) {
      const first = product.variants.find((v) => !v.soldout)?.value ?? product.variants[0]?.value ?? '';
      setSelectedVariant(first);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-24">
        <h1 className="text-3xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <p className="text-gray-500 mb-8">Sản phẩm bạn tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <Link to="/collections/all" className="bg-[#9c4533] text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors">
          Xem tất cả sản phẩm
        </Link>
      </div>
    );
  }

  const discountPercent = product.comparePrice
    ? Math.round(100 - (product.price / product.comparePrice) * 100)
    : null;

  const isSoldOut = !!product.soldOut;

  const scrollToImage = (idx: number) => {
    imageRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setCurrentImgIndex(idx);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const idx = Math.round(el.scrollTop / el.clientHeight);
    if (idx !== currentImgIndex) setCurrentImgIndex(idx);
  };

  const handleAddToCart = () => {
    if (isSoldOut) return;
    addToCart({ id: product.id, name: product.title, price: product.price, image: product.images[0], variant: selectedVariant, quantity });
    showToast('Đã thêm vào giỏ hàng');
    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1800);
  };

  const handleBuyNow = () => {
    if (isSoldOut) return;
    addToCart({ id: product.id, name: product.title, price: product.price, image: product.images[0], variant: selectedVariant, quantity });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">

      {/* Breadcrumb */}
      <div className="bg-[#f5f5f5] border-b border-[#ebebeb]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-2.5 md:py-3">
          <nav className="flex items-center gap-1 text-[12px] md:text-[13px] text-[#999] flex-wrap">
            <Link to="/" className="hover:text-[#333] transition-colors">Trang chủ</Link>
            <ChevronRight size={11} className="text-[#ccc] shrink-0" />
            <Link to={product.categoryPath} className="hover:text-[#333] transition-colors">{product.category}</Link>
            <ChevronRight size={11} className="text-[#ccc] shrink-0" />
            <span className="text-[#666] truncate max-w-[40vw] md:max-w-none">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">

          {/* Gallery */}
          <div className="w-full lg:w-[55%] shrink-0">
            <div className="flex flex-col-reverse md:flex-row gap-3">
              {/* Thumbnails dọc desktop */}
              <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:w-[80px] shrink-0 pb-2 md:pb-0 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToImage(idx)}
                    className={`w-full aspect-square border overflow-hidden bg-[#f5f3f0] transition-all ${currentImgIndex === idx ? 'border-[#9c4533]' : 'border-[#e5e0dc] hover:border-[#bbb]'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>

              {/* Main image area */}
              <div className="flex-1 relative">
                <div className="absolute top-3 right-3 z-10 bg-white/90 border border-[#e0dbd5] px-2 py-0.5 text-[11px] font-medium text-[#777]">
                  {currentImgIndex + 1} / {product.images.length}
                </div>
                <div
                  className="overflow-y-auto snap-y snap-mandatory"
                  style={{ height: 'min(72vw, 540px)', scrollbarWidth: 'none' }}
                  onScroll={handleScroll}
                >
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      ref={(el) => { imageRefs.current[idx] = el; }}
                      className="snap-start flex items-center justify-center bg-[#f5f3f0]"
                      style={{ height: 'min(72vw, 540px)' }}
                    >
                      <img src={img} alt={product.title} className="max-h-[90%] max-w-[90%] object-contain" />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-9 h-9 bg-white border border-[#ddd] flex items-center justify-center hover:border-[#9c4533] transition-colors"
                  aria-label="Phóng to"
                >
                  <Maximize2 size={14} className="text-[#555]" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h1 className="text-[20px] md:text-[24px] font-bold text-[#222] leading-snug mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {discountPercent && (
                <span className="text-[11px] font-bold text-[#e60012] bg-[#fdf0ee] border border-[#f5c9bf] px-2.5 py-1 rounded-sm uppercase tracking-wider">
                  -{discountPercent}%
                </span>
              )}
              <span className={`text-[26px] md:text-[32px] font-black leading-none ${product.comparePrice ? 'text-[#e60012]' : 'text-[#222]'}`}>
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <del className="text-[#aaa] text-[14px] md:text-[16px] font-normal">
                  {formatPrice(product.comparePrice)}
                </del>
              )}
              {isSoldOut && (
                <span className="text-[11px] font-bold text-white bg-[#888] px-2.5 py-1">HẾT HÀNG</span>
              )}
            </div>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-5">
                <div className="text-[12px] text-[#888] mb-2.5">
                  Màu: <span className="font-semibold text-[#333]">{selectedVariant}</span>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.variants.map((v) => {
                    const isActive = selectedVariant === v.value;
                    return (
                      <button
                        key={v.value}
                        type="button"
                        disabled={!!v.soldout}
                        onClick={() => !v.soldout && setSelectedVariant(v.value)}
                        title={v.name + (v.soldout ? ' (Hết hàng)' : '')}
                        className={`relative w-10 h-10 rounded-full border-2 transition-all p-0.5 ${isActive ? 'border-[#333] scale-110 shadow-sm' : 'border-transparent hover:border-gray-300'} ${v.soldout ? 'cursor-not-allowed opacity-40' : ''}`}
                        style={{ backgroundColor: v.color }}
                      >
                        {v.soldout && (
                          <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[140%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-500/70 rounded" />
                        )}
                        <span className={cn("block w-full h-full rounded-full border border-black/5", isActive && "ring-2 ring-white ring-inset")} style={{ backgroundColor: v.color }} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <div className="text-[12px] font-bold uppercase tracking-widest text-[#888] mb-3">Số lượng</div>
              <div className="inline-flex border border-[#ddd] h-12 rounded-sm bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={isSoldOut}
                  className="w-10 flex items-center justify-center hover:bg-[#f5f3f0] text-[#555] disabled:opacity-40 transition-colors"
                >
                  <Minus size={12} strokeWidth={2.5} />
                </button>
                <span className="w-12 flex items-center justify-center border-x border-[#ddd] font-semibold text-[15px] text-[#222]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  disabled={isSoldOut}
                  className="w-10 flex items-center justify-center hover:bg-[#f5f3f0] text-[#555] disabled:opacity-40 transition-colors"
                >
                  <Plus size={12} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mb-6">
              <button
                type="button"
                disabled={isSoldOut}
                onClick={handleAddToCart}
                className={`w-full py-4 font-bold uppercase tracking-[0.2em] text-[14px] inline-flex items-center justify-center gap-3 transition-all active:scale-[0.98] mb-3 rounded-sm ${isSoldOut ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : isAdded ? 'bg-black text-white' : 'bg-[#1a1a1a] text-white hover:bg-black shadow-lg shadow-black/10'}`}
              >
                {isAdded ? (
                  <><Check size={15} strokeWidth={3} /> Đã thêm vào giỏ</>
                ) : (
                  <>{isSoldOut ? 'Hết hàng' : 'Thêm vào giỏ hàng'}</>
                )}
              </button>
              <button
                type="button"
                disabled={isSoldOut}
                onClick={handleBuyNow}
                className={`w-full py-3.5 font-bold uppercase tracking-[0.15em] text-[12px] border-2 rounded-sm transition-all active:scale-[0.98] ${isSoldOut ? 'border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50' : 'border-[#1a1a1a] text-[#1a1a1a] hover:bg-gray-50'}`}
              >
                Mua ngay
              </button>
            </div>

            {/* Accordions */}
            <AccordionSection title="Mô tả" defaultOpen>
              <div
                className="text-[13px] text-[#555] leading-relaxed [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-[#333] [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </AccordionSection>

            <AccordionSection title="Chính sách giao hàng & đổi trả">
              <ul className="text-[13px] text-[#555] space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2"><span className="mt-0.5 text-[#9c4533]">✦</span><span>Miễn phí vận chuyển cho đơn hàng từ <strong>300.000₫</strong></span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-[#9c4533]">✦</span><span>Đổi trả hàng trong vòng <strong>30 ngày</strong> kể từ ngày nhận hàng</span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-[#9c4533]">✦</span><span>Bảo hành chính hãng <strong>12 tháng</strong></span></li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-[#9c4533]">✦</span><span>Giao hàng toàn quốc trong <strong>2–5 ngày</strong> làm việc</span></li>
              </ul>
            </AccordionSection>

            <AccordionSection title="Chất liệu & kích thước">
              <div className="text-[13px] text-[#555] leading-relaxed space-y-2">
                <p>Sản phẩm được sản xuất tại Việt Nam theo tiêu chuẩn xuất khẩu Châu Âu.</p>
                <p>Chất liệu gỗ tự nhiên, vải/da nhập khẩu cao cấp. Vui lòng xem chi tiết trong phần mô tả hoặc liên hệ để biết thêm thông số kỹ thuật.</p>
              </div>
            </AccordionSection>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[#ebebeb]">
            <h2 className="text-[16px] md:text-[18px] font-bold uppercase tracking-[0.12em] text-center text-[#222] mb-8">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {relatedProducts.map((p) => (
                <RelatedCard key={p.id} p={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 w-10 h-10 rounded-full flex items-center justify-center"
            onClick={() => setZoomOpen(false)}
          >
            <X size={18} />
          </button>
          <img
            src={product.images[currentImgIndex]}
            alt={product.title}
            className="max-h-[88vh] max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {product.images.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImgIndex(idx); }}
                  className={`w-12 h-12 border-2 overflow-hidden bg-white ${currentImgIndex === idx ? 'border-white' : 'border-white/30 hover:border-white/60'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-0.5" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
