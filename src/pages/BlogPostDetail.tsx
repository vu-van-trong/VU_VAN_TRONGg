import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight, Calendar, User, Facebook, Twitter, MessageSquare, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function BlogPostDetail() {
  const { id } = useParams();

  // Mock data for the post
  const post = {
    title: 'Bí quyết chọn Sofa phù hợp cho không gian nhỏ',
    content: `
      <p>Không gian sống hạn chế không có nghĩa là bạn phải đánh đổi sự thoải mái hay phong cách. Thực tế, với một căn hộ nhỏ, chiếc sofa không chỉ là nơi để ngồi mà còn là trung tâm của cả phòng khách, quyết định phần lớn diện mạo và cảm giác của căn phòng.</p>
      
      <h2>1. Đo đạc kỹ lưỡng diện tích</h2>
      <p>Trước khi ra cửa hàng, hãy đo chính xác diện tích góc đặt sofa. Đừng quên đo cả chiều rộng của cửa ra vào và thang máy để đảm bảo việc vận chuyển diễn ra suôn sẻ.</p>
      
      <img src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200" alt="Sofa nhỏ" />
      
      <h2>2. Chọn thiết kế chân cao</h2>
      <p>Những chiếc sofa có chân cao giúp sàn nhà lộ ra nhiều hơn, tạo cảm giác không gian mượt mà và rộng rãi hơn so với những mẫu sofa bệt sát sàn.</p>

      <h2>3. Ưu tiên màu sắc trung tính</h2>
      <p>Các tông màu như xám nhạt, kem, hoặc xanh pastel sẽ giúp căn phòng trông sáng sủa và thoáng đãng hơn. Bạn có thể tạo điểm nhấn bằng các loại gối tựa có màu sắc nổi bật.</p>
      
      <blockquote>
        "Nội thất không chỉ là đồ vật, nó là nghệ thuật sắp đặt cuộc sống sao cho hài hòa nhất."
      </blockquote>

      <p>Hy vọng những chia sẻ trên sẽ giúp bạn tìm được chiếc sofa ưng ý cho tổ ấm nhỏ của mình!</p>
    `,
    author: 'Admin',
    date: '12/05/2026',
    category: 'Tư vấn',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200'
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      {/* Breadcrumb */}
      <div className="bg-[#f5f5f5] py-3">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-[13px] text-gray-500">
            <Link to="/" className="hover:text-[#9c4533]">Trang chủ</Link>
            <ChevronRight size={12} />
            <Link to="/blogs/news" className="hover:text-[#9c4533]">Tin tức</Link>
            <ChevronRight size={12} />
            <span className="text-[#9c4533] truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          {/* 📝 Main Content */}
          <div className="lg:flex-1">
            <article>
              <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-[#9c4533] mb-6">
                <span>{post.category}</span>
                <span className="w-8 h-[1px] bg-gray-200" />
                <div className="flex items-center gap-2 text-gray-400 font-medium">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">{post.title}</h1>

              <div className="flex items-center gap-4 mb-10 pb-10 border-b border-gray-100">
                 <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-[#9c4533]">
                    {post.author[0]}
                 </div>
                 <div>
                    <p className="text-sm font-bold uppercase">Bởi {post.author}</p>
                    <p className="text-xs text-gray-400">Chuyên gia nội thất</p>
                 </div>
              </div>

              <div 
                className="prose prose-lg max-w-none prose-img:rounded-xl prose-headings:text-gray-900 prose-blockquote:border-[#9c4533] prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-8 shadow-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Social Share */}
              <div className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-gray-100 mt-16">
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400">Chia sẻ:</span>
                    <div className="flex gap-2">
                       <button className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-all"><Facebook size={18} /></button>
                       <button className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#1da1f2] hover:text-white hover:border-[#1da1f2] transition-all"><Twitter size={18} /></button>
                       <button className="w-10 h-10 border border-gray-100 flex items-center justify-center hover:bg-[#9c4533] hover:text-white hover:border-[#9c4533] transition-all"><Share2 size={18} /></button>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 text-[#9c4533] cursor-pointer font-bold uppercase text-[12px] tracking-widest hover:underline">
                    <MessageSquare size={16} /> Để lại bình luận
                 </div>
              </div>
            </article>

            {/* Related Posts */}
            <div className="mt-20">
               <h3 className="text-2xl font-bold uppercase tracking-tighter mb-10">Bài viết liên quan</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { id: '2', title: 'Xu hướng nội thất Minimalism năm 2026', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400' },
                    { id: '3', title: 'Cách bảo quản đồ gỗ luôn mới như lúc đầu', image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=400' }
                  ].map((p) => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="flex gap-4 group">
                       <div className="w-24 h-24 shrink-0 overflow-hidden bg-gray-100">
                          <img src={p.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                       </div>
                       <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-sm group-hover:text-[#9c4533] transition-colors leading-snug">{p.title}</h4>
                          <span className="text-[11px] text-gray-400 mt-2 font-medium uppercase tracking-widest font-sans">05/05/2026</span>
                       </div>
                    </Link>
                  ))}
               </div>
            </div>
          </div>

          {/* 🏔️ Sidebar */}
          <aside className="w-full lg:w-[320px] space-y-12 shrink-0">
             {/* Search */}
             <div className="bg-gray-50 p-8">
                <h4 className="font-bold uppercase tracking-widest text-sm mb-6 border-b border-black pb-2">Tìm kiếm tin tức</h4>
                <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Tìm kiếm..." 
                     className="w-full bg-white border border-gray-200 px-4 py-3 pr-10 text-sm focus:outline-none focus:border-[#9c4533]" 
                   />
                   <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><Share2 size={16} /></button>
                </div>
             </div>

             {/* Categories */}
             <div>
                <h4 className="font-bold uppercase tracking-widest text-sm mb-6 border-b border-black pb-2">Danh mục blog</h4>
                <ul className="space-y-4">
                   {['Tin tức', 'Xu hướng', 'Khuyến mãi', 'Tư vấn', 'Sự kiện'].map(c => (
                     <li key={c}>
                        <Link to="#" className="flex justify-between items-center text-[13px] hover:text-[#9c4533] transition-colors font-medium">
                           <span>{c}</span>
                           <span className="text-gray-300">(0)</span>
                        </Link>
                     </li>
                   ))}
                </ul>
             </div>

             {/* Banner */}
             <div className="relative group overflow-hidden bg-[#9c4533]">
                <img 
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600" 
                  alt="Banner" 
                  className="w-full opacity-40 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                   <h5 className="text-2xl font-bold uppercase tracking-tight mb-4">Ưu đãi mùa hè</h5>
                   <p className="text-xs uppercase tracking-widest font-medium mb-6">Giảm đến 50% sản phẩm nội thất</p>
                   <Link to="/collections/all" className="bg-white text-black px-6 py-3 text-[11px] font-bold uppercase tracking-widest">Xem ngay</Link>
                </div>
             </div>
          </aside>

        </div>
      </main>
    </div>
  );
}