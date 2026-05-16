/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, Calendar, User } from 'lucide-react';

const blogPosts = [
  {
    id: '5-sai-lam-can-tranh-khi-mua-ban-ghe-sofa',
    title: '5 sai lầm cần tránh khi mua bàn ghế sofa',
    image: 'https://file.hstatic.net/1000309459/article/blog_4e734461181e4b3194609c4ea27d3af6_grande.jpg',
    author: 'modern furniture',
    date: '04.07.2021',
    excerpt: 'Hiện nay, nhu cầu chọn mua bàn ghế sofa đã dần trở nên phổ biến và được ưa chuộng nhiều hơn. Tuy nhiên, không phải ai cũng biết cách chọn được một bộ sofa chất lượng...',
    category: 'tips'
  },
  {
    id: 'bai-viet-mau-3',
    title: 'Bài viết mẫu 3',
    image: 'https://file.hstatic.net/1000309459/article/ssfdf_grande.jpg',
    author: 'Duyên Nguyễn',
    date: '20.08.2018',
    excerpt: 'Đây là trang blog của cửa hàng. Bạn có thể dùng blog để quảng bá sản phẩm mới, chia sẻ trải nghiệm của khách hàng, hoặc cung cấp các mẹo nhỏ về nội thất...',
    category: 'news'
  },
  {
    id: 'bai-viet-mau-2',
    title: 'Bài viết mẫu 2',
    image: 'https://file.hstatic.net/1000309459/article/sfsd_grande.jpg',
    author: 'Duyên Nguyễn',
    date: '20.08.2018',
    excerpt: 'Chia sẻ các xu hướng thiết kế nội thất mới nhất năm nay. Tìm hiểu cách tối ưu không gian sống với những món đồ nội thất thông minh và phong cách...',
    category: 'design'
  },
  {
    id: '1-bai-viet-mau',
    title: 'Bài viết mẫu',
    image: 'https://file.hstatic.net/1000309459/article/ferm-living-autumn-winter-2016-banner_grande.jpg',
    author: 'modern furniture',
    date: '20.08.2018',
    excerpt: 'Kinh nghiệm trang trí phòng khách đẹp mắt và ấm cúng. Làm thế nào để phối hợp màu sắc sơn tường với màu gỗ của bàn ghế để tạo nên một không gian hoàn hảo...',
    category: 'news'
  }
];

const categories = [
  { name: 'Trang chủ', links: ['Sản phẩm nổi bật', 'Khuyến mãi', 'Sản phẩm mới'] },
  { name: 'Header', links: ['Header Style 01', 'Header Style 02', 'Header Style 03'] },
  { name: 'Sản phẩm', links: ['Nội thất phòng khách', 'Nội thất phòng ngủ', 'Nội thất bếp'] },
  { name: 'Product Views', links: ['Kiểu hiển thị 1', 'Kiểu hiển thị 2', 'Kiểu hiển thị 3'] }
];

export default function Blog() {
  const [searchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category');

  // Logic lọc bài viết
  const filteredPosts = blogPosts.filter(post => 
    !categoryQuery || post.category === categoryQuery
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200 py-4 mb-8">
          <div className="container mx-auto px-4">
            <nav className="flex items-center text-xs text-gray-500 gap-2">
              <Link to="/" className="hover:text-black transition-colors uppercase">Trang chủ</Link>
              <ChevronRight size={14} />
              <span className="text-black font-semibold uppercase">Tin tức</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-20">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="lg:w-1/4 space-y-12">
              {/* Latest News Widget */}
              <section>
                <h2 className="text-lg font-bold uppercase mb-6 pb-2 border-b-2 border-black inline-block">
                  Bài viết mới nhất
                </h2>
                <div className="space-y-6">
                  {blogPosts.slice(0, 4).map((post) => (
                    <article key={`latest-${post.id}`} className="flex gap-4 group">
                      <div className="w-20 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Link to={`/blog/${post.id}`}>
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </Link>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h3 className="text-sm font-bold leading-snug mb-1 line-clamp-2 italic">
                          <Link to={`/blog/${post.id}`} className="hover:text-gray-600 transition-colors">
                            {post.title}
                          </Link>
                        </h3>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1 uppercase tracking-wider">
                          <Calendar size={10} /> {post.date}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Categories Widget */}
              <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h2 className="text-lg font-bold uppercase mb-6 pb-2 border-b-2 border-black inline-block">
                  Danh mục blog
                </h2>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat.name} className="border-b border-gray-200 last:border-0 pb-2">
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer list-none py-1 hover:text-gray-600 transition-colors">
                          <span className="text-sm font-medium">{cat.name}</span>
                          <ChevronRight size={16} className="group-open:rotate-90 transition-transform" />
                        </summary>
                        <ul className="pl-4 mt-2 space-y-2 pb-2">
                          {cat.links.map(link => (
                            <li key={link}>
                              <Link to="#" className="text-xs text-gray-500 hover:text-black transition-colors">
                                - {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  ))}
                  <li className="pt-2">
                    <Link to="/blog" className="text-sm font-bold text-black border-b-2 border-black">Blog</Link>
                  </li>
                </ul>
              </section>

              {/* Promo Banner */}
              <div className="rounded-2xl overflow-hidden bg-gray-900 aspect-[3/4] flex items-center justify-center p-8 text-center text-white relative group">
                <div className="relative z-10">
                   <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter">Big Sale 50%</h3>
                   <p className="text-sm text-gray-400 mb-6">Chương trình ưu đãi nội thất phòng khách lớn nhất trong năm.</p>
                   <Link to="/products" className="inline-block bg-white text-black text-xs font-bold px-6 py-3 rounded-full hover:bg-gray-200 transition-colors uppercase">Mua ngay</Link>
                </div>
                <div className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Banner promo" />
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <div className="mb-12">
                <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 italic font-display">Tin tức</h1>
                <div className="w-20 h-1.5 bg-black"></div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="group border-b border-gray-100 pb-12 last:border-0 font-sans">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="md:w-1/3 aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                        <Link to={`/blog/${post.id}`}>
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>
                      </div>
                      <div className="md:w-2/3 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                          <span className="bg-black text-white px-2 py-0.5 rounded italic">
                            {post.category === 'design' ? 'Xu hướng' : post.category === 'tips' ? 'Mẹo vặt' : 'Tin tức'}
                          </span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                          <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                        </div>
                        <h2 className="text-2xl font-black mb-4 tracking-tight leading-tight group-hover:text-gray-700 transition-colors italic">
                          <Link to={`/blog/${post.id}`}>
                            {post.title}
                          </Link>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <Link 
                          to={`/blog/${post.id}`} 
                          className="text-xs font-black uppercase tracking-wider border-b-2 border-black inline-block self-start pb-1 hover:border-gray-400 hover:text-gray-400 transition-all italic"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination (Simplified) */}
              <div className="mt-16 flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-bold">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors font-bold text-gray-600 font-mono italic">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors font-bold text-gray-600 font-mono">3</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}