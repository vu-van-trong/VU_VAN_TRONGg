import React, { useState, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 'loa-bluetooth-bo-beoplay',
    name: 'Loa Bluetooth B&O Beoplay',
    price: 4550000,
    image: 'https://product.hstatic.net/1000309459/product/sp2-1_ee610e766bb440738090133fd553280f_ff6e0900534d42ca805e7aa9f7e5578d_grande.jpg',
    room: ['working']
  },
  {
    id: 'ghe-tua-lung-phong-khach-s004',
    name: 'Ghế tựa lưng phòng khách S004',
    price: 2400000,
    comparePrice: 3200000,
    discount: 25,
    image: 'https://product.hstatic.net/1000309459/product/sp10-1_bee2a9c0558d4324bf174ec4dca83071_d2c27994d7be4d71b388b3c9f95826c2_grande.jpg',
    room: ['living']
  },
  {
    id: 'ghe-trung-treo-oval',
    name: 'Ghế trứng treo Oval',
    price: 1300000,
    image: 'https://product.hstatic.net/1000309459/product/sp3_97f7ec448aae411f907b7ab4d04d0e52_fc6e8187831c46299c2e264d992aa10b_grande.jpg',
    room: ['living']
  },
  {
    id: 'ghe-sofa-phong-khach-s003',
    name: 'Ghế Sofa phòng khách S003',
    price: 6800000,
    comparePrice: 7900000,
    discount: 14,
    image: 'https://product.hstatic.net/1000309459/product/sp9-1_a13a66828d904b0388e03b4b12fdbea0_b699f1d6595244148610a17d3a3393f9_grande.jpg',
    room: ['living']
  },
  {
    id: 'ghe-sofa-giuong-keo-roots',
    name: 'Ghế sofa giường kéo Roots',
    price: 7200000,
    comparePrice: 7800000,
    discount: 8,
    image: 'https://product.hstatic.net/1000309459/product/sp7-1_83fd0de6ab8b437d9b28cf50ad5e69cb_ef26305786114080bc65e3de534bfd69_grande.jpg',
    room: ['living', 'bedroom']
  },
  {
    id: 'ghe-phong-khach-arctander',
    name: 'Ghế phòng khách Arctander',
    price: 799000,
    comparePrice: 999000,
    discount: 20,
    image: 'https://product.hstatic.net/1000309459/product/sp1-1_8b56d5f805744ca98b24545ae72d3cb4_c596aa3fb2e7428a87cdf3b0567c2d8a_grande.jpg',
    room: ['living']
  },
  {
    id: 'thang-go-nho-but001',
    name: 'Thang gỗ nhỏ But001',
    price: 650000,
    image: 'https://product.hstatic.net/1000309459/product/sp6-1_fa3959f8d78047608cc52380bf7a5069_3e2dc22276ed4b41a4ac8afe7b00ce82_grande.jpg',
    room: ['working']
  },
  {
    id: 'ghe-go-bap-benh-iconic',
    name: 'Ghế gỗ bập bênh Iconic',
    price: 700000,
    comparePrice: 890000,
    discount: 21,
    image: 'https://product.hstatic.net/1000309459/product/sp5-2_fde6cf697c5343489c0715a2a77c9161_8ccf08b77b384087b8e47d0d62541382_grande.jpg',
    room: ['bedroom', 'living']
  },
  {
    id: 'den-treo-sang-trong-hubert',
    name: 'Đèn treo sang trọng Hubert',
    price: 1200000,
    soldOut: true,
    image: 'https://product.hstatic.net/1000309459/product/sp4-2_97670563a9c9462e91b405158f85b77a_1e84319ca6f74a5fbe7043f038a05166_grande.jpg',
    room: ['living']
  },
  {
    id: 'den-de-ban-gon-nhe-petite',
    name: 'Đèn để bàn gọn nhẹ Petite',
    price: 690000,
    image: 'https://product.hstatic.net/1000309459/product/sp8-1_5d1c7dc8e938478290333f2625515d68_28699549035a4a1e8823d70b9a6f8388_grande.jpg',
    room: ['working', 'bedroom']
  },
  {
    id: 'ban-xep-gon-nhe-tb01',
    name: 'Bàn xếp gọn nhẹ TB01',
    price: 1300000,
    image: 'https://product.hstatic.net/1000309459/product/sp11-1_f33d1b5977c84d01ac0037fdcb6c7317_2430fe7863a34cbf9f2190326cd08dab_grande.jpg',
    room: ['working']
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
    image: 'https://product.hstatic.net/1000309459/product/pro6_c3480a33e39042e599b90dfd098160df_grande.jpg',
    room: ['working']
  }
];

// 1. Định nghĩa mảng hiển thị cho UI Sidebar
const PRICE_FILTER_OPTIONS = [
  { id: 'p1', value: 'under-500', label: 'Dưới 500,000₫' },
  { id: 'p2', value: '500-1000', label: '500,000₫ - 1,000,000₫' },
  { id: 'p3', value: '1000-1500', label: '1,000,000₫ - 1,500,000₫' },
  { id: 'p4', value: '1500-5000', label: '1,500,000₫ - 5,000,000₫' },
  { id: 'p5', value: 'above-5000', label: 'Trên 5,000,000₫' },
];

// 2. Định nghĩa logic lọc giá (PRICE_FILTERS object) như yêu cầu
const PRICE_FILTERS: Record<string, (price: number) => boolean> = {
  'under-500': (price) => price < 500000,
  '500-1000': (price) => price >= 500000 && price <= 1000000,
  '1000-1500': (price) => price >= 1000000 && price <= 1500000,
  '1500-5000': (price) => price >= 1500000 && price <= 5000000,
  'above-5000': (price) => price > 5000000,
};

// 3. Định nghĩa danh sách màu sắc
const COLOR_FILTERS = ['#ef5777', '#ffd32a', '#d2dae2', '#3c40c6', '#0be881', '#f53b57', '#0fbcf9', '#000000', '#ffffff', '#ff3f34', '#a55eea', '#6ab04c', '#0c2461', '#f1a874'];

export default function Collection() {
  const addToCart = useCartStore((state) => state.addToCart);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roomQuery = searchParams.get('room');

  // Khai báo các State bị thiếu để quản lý bộ lọc
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Logic lọc sản phẩm thời gian thực
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesRoom = !roomQuery || (product.room && product.room.includes(roomQuery));
      const matchesPrice = !selectedPriceRange || (PRICE_FILTERS[selectedPriceRange] && PRICE_FILTERS[selectedPriceRange](product.price));
      const matchesColor = !selectedColor || true; // Mặc định true nếu sản phẩm chưa có mảng màu cụ thể
      return matchesRoom && matchesPrice && matchesColor;
    });
  }, [roomQuery, selectedPriceRange, selectedColor]);

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
                  {PRICE_FILTER_OPTIONS.map((range) => (
                    <label key={range.id} className="flex items-center gap-3 cursor-pointer group text-[13px]">
                      <input 
                        type="checkbox" 
                        checked={selectedPriceRange === range.value}
                        onChange={() => setSelectedPriceRange(selectedPriceRange === range.value ? null : range.value)}
                        className="w-4 h-4 rounded-sm border-gray-300 text-[#9c4533] focus:ring-[#9c4533]" 
                      />
                      <span className={cn("transition-colors", selectedPriceRange === range.value ? "text-[#9c4533] font-bold" : "group-hover:text-[#9c4533]")}>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Màu sắc */}
              <div>
                <h4 className="text-[14px] font-bold uppercase border-b-2 border-black pb-2 mb-4">Màu sắc</h4>
                <div className="flex flex-wrap gap-2">
                  {COLOR_FILTERS.map((color, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                      className={cn(
                        "w-6 h-6 border transition-all active:scale-90",
                        selectedColor === color ? "ring-2 ring-black ring-offset-1 border-white" : "border-gray-200"
                      )}
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

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 min-h-[400px]">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    title: product.name,
                    price: product.price,
                    comparePrice: product.comparePrice,
                    label: product.discount ? `-${product.discount}%` : undefined,
                    soldOut: product.soldOut,
                    image: product.image,
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
