import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Key, Mail, CheckCircle2 } from 'lucide-react';
import { useToastStore } from '@/src/store/toastStore';

export default function Login() {
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  // 1. Lấy danh sách tài khoản đã đăng ký để hiển thị gợi ý
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    setRegisteredUsers(users);
  }, []);

  const handleAutoFill = (user: any) => {
    setEmail(user.email);
    setPassword(user.password);
    showToast(`Đã chọn tài khoản: ${user.fullName}`);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }

    const users = JSON.parse(localStorage.getItem('registered_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      localStorage.setItem('user_session', JSON.stringify({ loggedIn: true, email: email }));
      localStorage.setItem('is_user_logged_in', 'true');
      showToast(`Chào mừng trở lại, ${foundUser.fullName}`);
      navigate('/cart'); // Quay về trang giỏ hàng thay vì trang chủ
    } else {
      setError('Email hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-800">
      <div className="bg-[#f5f5f5] py-3">
        <div className="container mx-auto px-4 md:px-8 flex items-center gap-2 text-[13px] text-gray-500">
          <Link to="/" className="hover:text-[#9c4533]">Trang chủ</Link>
          <ChevronRight size={12} />
          <span className="text-[#9c4533]">Đăng nhập tài khoản</span>
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-[460px] bg-white p-8 md:p-10 border border-gray-100 shadow-sm rounded-sm">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-8">Đăng nhập</h1>
          
          {error && <p className="text-red-500 text-xs mb-6 text-center font-bold uppercase">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email tài khoản</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  type="email" placeholder="email@example.com" 
                  className="w-full h-12 pl-12 pr-4 border border-gray-200 outline-none focus:border-[#9c4533] transition-all"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              
              {/* 3. Danh sách tài khoản gợi ý (Auto-fill) */}
              {registeredUsers.length > 0 && (
                <div className="mt-4 p-4 bg-[#f9f9f9] border border-dashed border-gray-200 rounded-sm">
                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-3">Tài khoản gợi ý:</p>
                  <div className="flex flex-wrap gap-2">
                    {registeredUsers.map((user, idx) => (
                      <button 
                        key={idx} 
                        type="button" 
                        onClick={() => {
                          setEmail(user.email);
                          setPassword(user.password);
                        }}
                        className="bg-gray-200 p-1 m-1 text-xs rounded hover:bg-gray-300 transition-colors"
                      >
                        {user.email}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Mật khẩu</label>
              <div className="relative">
                <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  type="password" placeholder="••••••••" 
                  className="w-full h-12 pl-12 pr-4 border border-gray-200 outline-none focus:border-[#9c4533] transition-all"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#9c4533] text-white py-4 font-bold uppercase tracking-[0.2em] hover:bg-black transition-all">Đăng nhập</button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-500">Chưa có tài khoản? <Link to="/register" className="text-[#9c4533] font-bold underline">Đăng ký ngay</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
}