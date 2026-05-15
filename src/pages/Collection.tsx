import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';

const products = [
  {
    id: 'loa-bluetooth-bo-beoplay',
    name: 'Loa Bluetooth B&O Beoplay',
    price: 4550000,
    image: 'https://product.hstatic.net/1000309459/product/sp2-1_ee610e766bb440738090133fd553280f_ff6e0900534d42ca805e7aa9f7e5578d_grande.jpg'
  },
  {
    id: 'ghe-tua-lung-phong-khach-s004',
    name: 'Ghế tựa lưng phòng khách S004',
    price: 2400000,
    comparePrice: 3200000,
    discount: 25,
    image: 'https://product.hstatic.net/1000309459/product/sp10-1_bee2a9c0558d4324bf174ec4dca83071_d2c27994d7be4d71b388b3c9f95826c2_grande.jpg'
  },
  {
    id: 'ghe-trung-treo-oval',
    name: 'Ghế trứng treo Oval',
    price: 1300000,
    image: 'https://product.hstatic.net/1000309459/product/sp3_97f7ec448aae411f907b7ab4d04d0e52_fc6e8187831c46299c2e264d992aa10b_grande.jpg'
  },
  {
    id: 'ghe-sofa-phong-khach-s003',
    name: 'Ghế Sofa phòng khách S003',
    price: 6800000,
    comparePrice: 7900000,
    discount: 14,
    image: 'https://product.hstatic.net/1000309459/product/sp9-1_a13a66828d904b0388e03b4b12fdbea0_b699f1d6595244148610a17d3a3393f9_grande.jpg'
  },
  {
    id: 'ghe-sofa-giuong-keo-roots',
    name: 'Ghế sofa giường kéo Roots',
    price: 7200000,
    comparePrice: 7800000,
    discount: 8,
    image: 'https://product.hstatic.net/1000309459/product/sp7-1_83fd0de6ab8b437d9b28cf50ad5e69cb_ef26305786114080bc65e3de534bfd69_grande.jpg'
  },
  {
    id: 'ghe-phong-khach-arctander',
    name: 'Ghế phòng khách Arctander',
    price: 799000,
    comparePrice: 999000,
    discount: 20,
    image: 'https://product.hstatic.net/1000309459/product/sp1-1_8b56d5f805744ca98b24545ae72d3cb4_c596aa3fb2e7428a87cdf3b0567c2d8a_grande.jpg'
  },
  {
    id: 'thang-go-nho-but001',
    name: 'Thang gỗ nhỏ But001',
    price: 650000,
    image: 'https://product.hstatic.net/1000309459/product/sp6-1_fa3959f8d78047608cc52380bf7a5069_3e2dc22276ed4b41a4ac8afe7b00ce82_grande.jpg'
  },
  {
    id: 'ghe-go-bap-benh-iconic',
    name: 'Ghế gỗ bập bênh Iconic',
    price: 700000,
    comparePrice: 890000,
    discount: 21,
    image: 'https://product.hstatic.net/1000309459/product/sp5-2_fde6cf697c5343489c0715a2a77c9161_8ccf08b77b384087b8e47d0d62541382_grande.jpg'
  },
  {
    id: 'den-treo-sang-trong-hubert',
    name: 'Đèn treo sang trọng Hubert',
    price: 1200000,
    soldOut: true,
    image: 'https://product.hstatic.net/1000309459/product/sp4-2_97670563a9c9462e91b405158f85b77a_1e84319ca6f74a5fbe7043f038a05166_grande.jpg'
  },
  {
    id: 'den-de-ban-gon-nhe-petite',
    name: 'Đèn để bàn gọn nhẹ Petite',
    price: 690000,
    image: 'https://product.hstatic.net/1000309459/product/sp8-1_5d1c7dc8e938478290333f2625515d68_28699549035a4a1e8823d70b9a6f8388_grande.jpg'
  },
  {
    id: 'ban-xep-gon-nhe-tb01',
    name: 'Bàn xếp gọn nhẹ TB01',
    price: 1300000,
    image: 'https://product.hstatic.net/1000309459/product/sp11-1_f33d1b5977c84d01ac0037fdcb6c7317_2430fe7863a34cbf9f2190326cd08dab_grande.jpg'
  },
  {
    id: 'am-tra-inox-khong-ghi',
    name: 'Ấm trà inox không ghỉ',
    price: 890000,
    comparePrice: 1250000,
    discount: 29,
    image: 'https://product.hstatic.net/1000309459/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_35e9cf348a3b4df28059491ff6c6ff08_grande.jpg'
  },
  {
    id: 'sofa-giuong-pvc-xuat-khau-so-226',
    name: 'Sofa giường PVC xuất khẩu SO-226',
    price: 4130000,
    comparePrice: 4359000,
    discount: 5,
    image: 'https://product.hstatic.net/1000309459/product/pro17_a40384c66baa4040b9fecd033f111dec_grande.jpg'
  },
  {
    id: 'ghe-van-phong-chan-xoay',
    name: 'Ghế Văn Phòng Chân Xoay',
    price: 969000,
    image: 'https://product.hstatic.net/1000309459/product/pro6_c3480a33e39042e599b90dfd098160df_grande.jpg'
  }
];

export default function Collection() {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value) + '₫';
  };

  const handleAddToCart = (e: React.MouseEvent, product: (typeof products)[number]) => {
    e.preventDefault();
    if (product.soldOut) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    showToast('Đã thêm vào giỏ hàng');
  };

  const handleBuyNow = (e: React.MouseEvent, product: (typeof products)[number]) => {
    e.preventDefault();
    if (product.soldOut) return;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      {/* Breadcrumb strip */}
      <div className="bg-[#f5f5f5] py-3">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-[13px] text-gray-500">
            <Link to="/" className="hover:text-[#9c4533]">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link to="/collections" className="hover:text-[#9c4533]">Danh mục</Link>
            <ChevronRight size={12} />
            <span className="text-[#9c4533]">Tất cả sản phẩm</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 🛠️ Sidebar Filters */}
          <aside className="w-full lg:w-[260px] shrink-0">
            <div className="space-y-8">
              {/* Thương hiệu */}
              <div>
                <h4 className="text-[14px] font-bold uppercase border-b-2 border-black pb-2 mb-4">Thương hiệu</h4>
                <label className="flex items-center gap-3 cursor-pointer group text-[13px]">
                  <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-[#9c4533] focus:ring-[#9c4533]" />
                  <span className="group-hover:text-[#9c4533]">Khác</span>
                </label>
              </div>

              {/* Giá sản phẩm */}
              <div>
                <h4 className="text-[14px] font-bold uppercase border-b-2 border-black pb-2 mb-4">Giá sản phẩm</h4>
                <div className="space-y-3">
                  {['Dưới 500,000₫', '500,000₫ - 1,000,000₫', '1,000,000₫ - 1,500,000₫', '2,000,000₫ - 5,000,000₫', 'Trên 5,000,000₫'].map((p) => (
                    <label key={p} className="flex items-center gap-3 cursor-pointer group text-[13px]">
                      <input type="checkbox" className="w-4 h-4 rounded-sm border-gray-300 text-[#9c4533] focus:ring-[#9c4533]" />
                      <span className="group-hover:text-[#9c4533]">{p}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Màu sắc */}
              <div>
                <h4 className="text-[14px] font-bold uppercase border-b-2 border-black pb-2 mb-4">Màu sắc</h4>
                <div className="flex flex-wrap gap-2">
                  {['#ef5777', '#ffd32a', '#d2dae2', '#3c40c6', '#0be881', '#f53b57', '#0fbcf9', '#000000', '#ffffff', '#ff3f34', '#a55eea', '#6ab04c', '#0c2461', '#f1a874'].map((color, i) => (
                    <button 
                      key={i} 
                      className="w-6 h-6 border border-gray-200 transition-transform active:scale-90"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Kích thước */}
              <div>
                <h4 className="text-[14px] font-bold uppercase border-b-2 border-black pb-2 mb-4">Kích thước</h4>
                <div className="flex flex-wrap gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button key={size} className="w-10 h-10 border border-gray-200 text-[12px] font-medium hover:border-black transition-colors">
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* 📦 Product Grid Content */}
          <div className="flex-1">
            <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
              <h1 className="text-[28px] font-bold">Tất cả sản phẩm</h1>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center border border-gray-200 p-1">
                  <select className="bg-transparent border-none text-[13px] outline-none pr-8 cursor-pointer focus:ring-0">
                    <option>Mới nhất</option>
                    <option>Bán chạy nhất</option>
                    <option>Giá: Tăng dần</option>
                    <option>Giá: Giảm dần</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  {/* Image wrapper */}
                  <Link to={`/products/${product.id}`} className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    
                    {/* Badge: Sale */}
                    {product.discount && (
                      <span className="absolute top-3 left-3 bg-white text-[#f94c43] text-[11px] font-bold px-2 py-1 border border-gray-100">
                        -{product.discount}%
                      </span>
                    )}

                    {/* Badge: Sold Out */}
                    {product.soldOut && (
                      <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                        <span className="bg-white/90 text-gray-800 text-[11px] font-bold px-4 py-2 uppercase tracking-widest shadow-xl">
                          Hết hàng
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/95 py-3">
                      <div className="flex items-center gap-2 px-3">
                        <button
                          type="button"
                          onClick={(e) => handleBuyNow(e, product)}
                          disabled={product.soldOut}
                          className={cn(
                            'flex-1 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors',
                            product.soldOut ? 'cursor-not-allowed bg-gray-300 text-gray-600' : 'bg-[#9c4533] text-white hover:bg-black'
                          )}
                        >
                          Mua ngay
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={product.soldOut}
                          className={cn(
                            'flex-1 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors',
                            product.soldOut ? 'cursor-not-allowed bg-gray-200 text-gray-500' : 'bg-[#191919] text-white hover:bg-[#9c4533]'
                          )}
                        >
                          Thêm vào giỏ
                        </button>
                      </div>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 text-center">
                    <Link to={`/products/${product.id}`} className="block text-[14px] font-medium text-gray-700 group-hover:text-[#9c4533] transition-colors mb-2 line-clamp-2 min-h-[40px]">
                      {product.name}
                    </Link>
                    <div className="flex flex-col items-center">
                      <span className={cn("text-[14px] font-bold", product.comparePrice ? "text-[#f94c43]" : "text-gray-900")}>
                        {formatPrice(product.price)}
                      </span>
                      {product.comparePrice && (
                        <span className="text-[12px] text-gray-400 line-through">
                          {formatPrice(product.comparePrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
