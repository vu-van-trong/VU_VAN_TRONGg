import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useToastStore } from '@/src/store/toastStore';

export default function Register() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password || !formData.phone) {
      setError('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // 1. Lấy danh sách cũ và thêm người dùng mới
    const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    
    if (existingUsers.find((u: any) => u.email === formData.email)) {
      setError('Email này đã được đăng ký');
      return;
    }

    const newUser = { email: formData.email, password: formData.password, fullName: formData.fullName };
    existingUsers.push(newUser);
    localStorage.setItem('registered_users', JSON.stringify(existingUsers));
    
    alert("Đăng ký thành công! Đang chuyển sang trang Đăng nhập.");
    
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      <div className="bg-[#f5f5f5] py-3">
        <div className="container mx-auto px-4 md:px-8 flex items-center gap-2 text-[13px] text-gray-500">
          <Link to="/" className="hover:text-[#9c4533]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-[#9c4533]">Đăng ký tài khoản</span>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-[500px] bg-white p-8 md:p-10 border border-gray-100 shadow-sm rounded-sm">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-8">Đăng ký tài khoản</h1>
          
          {error && <p className="text-red-500 text-xs mb-6 text-center font-bold uppercase">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input 
              type="text" placeholder="Họ và tên *" 
              className="w-full h-12 px-4 border border-gray-200 outline-none focus:border-[#9c4533] transition-all"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
            />
            <input 
              type="email" placeholder="Email *" 
              className="w-full h-12 px-4 border border-gray-200 outline-none focus:border-[#9c4533] transition-all"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input 
              type="tel" placeholder="Số điện thoại *" 
              className="w-full h-12 px-4 border border-gray-200 outline-none focus:border-[#9c4533] transition-all"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
            <input 
              type="password" placeholder="Mật khẩu *" 
              className="w-full h-12 px-4 border border-gray-200 outline-none focus:border-[#9c4533] transition-all"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
            <input 
              type="password" placeholder="Xác nhận mật khẩu *" 
              className="w-full h-12 px-4 border border-gray-200 outline-none focus:border-[#9c4533] transition-all"
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
            
            <button type="submit" className="w-full bg-[#9c4533] text-white py-4 font-bold uppercase tracking-[0.2em] hover:bg-black transition-all">Đăng ký</button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-500">Đã có tài khoản? <Link to="/login" className="text-[#9c4533] font-bold underline">Đăng nhập ngay</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
}