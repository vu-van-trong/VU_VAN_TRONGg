import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header'; // Đảm bảo đường dẫn này đúng với cấu trúc của bạn
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import LandingPage from './pages/LandingPage';
import Lookbook from './pages/Lookbook'; // ⭐ THÊM MỚI: Import trang Lookbook
import SalePage from './pages/SalePage'; // ⭐ THÊM MỚI: Import trang Săn Deal
import ThankYou from './pages/ThankYou';
import Toast from './components/Toast';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* 🏗️ Header dùng chung cho toàn bộ hệ thống */}
        <Header />

        {/* 📱 Nội dung thay đổi theo đường dẫn */}
        <main className="flex-grow">
          <Routes>
            {/* 🏠 Trang chủ */}
            <Route path="/" element={<Home />} />
            
            {/* 🚀 Trang Landing Page (Tích hợp mới) */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/pages/ldp-furniture-1" element={<LandingPage />} />
            
            {/* 🔥 Trang Săn Deal (Vừa được thêm mới) */}
            <Route path="/san-deal" element={<SalePage />} />
            
            {/* 📸 Trang Lookbook - Không gian cảm hứng (Thêm mới) */}
            <Route path="/lookbook" element={<Lookbook />} />
            
            {/* 📦 Hệ thống Sản phẩm & Danh mục */}
            <Route path="/collections/all" element={<Collection />} />
            <Route path="/collections" element={<Collection />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            
            {/* 🛒 Giỏ hàng */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thank-you" element={<ThankYou />} />
            
            {/* 📰 Hệ thống Tin tức (Blog) */}
            <Route path="/blogs/news" element={<Blog />} />
            <Route path="/blogs/news/:id" element={<BlogPostDetail />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            
            {/* 🛡️ Chuyển hướng nếu người dùng nhập sai đường dẫn */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* 🏢 Footer dùng chung cho toàn bộ hệ thống */}
        <Footer />
        <Toast />
      </div>
    </Router>
  );
}