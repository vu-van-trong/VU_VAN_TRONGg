import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, ShoppingBag, Search, Menu, X, ChevronDown, ChevronRight, Info, LogOut } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useCartStore } from '@/src/store/cartStore';
import { useToastStore } from '@/src/store/toastStore';

const MENU_ITEMS = [
  {
    title: "Trang chủ",
    path: "/",
  },
  {
    title: "SĂN DEAL",
    path: "/san-deal",
    submenu: [
      { title: "Trạm 1: Vòng quay may mắn", path: "/san-deal", anchor: "tram-1" },
      { title: "Trạm 2: Combo Decor", path: "/san-deal", anchor: "tram-2" },
      { title: "Trạm 3: Hot Sale", path: "/san-deal", anchor: "tram-3" },
    ],
  },
  {
    title: "Sản phẩm",
    path: "/collections/all",
    submenu: [
      { title: "Phòng khách hiện đại", path: "/collections/all?room=living" },
      { title: "Phòng ngủ ấm cúng", path: "/collections/all?room=bedroom" },
      { title: "Góc làm việc tối giản", path: "/collections/all?room=working" },
    ],
  },
  {
    title: "LOOKBOOK",
    path: "/lookbook",
  },
  {
    title: "Blog",
    path: "/blogs/news",
    submenu: [
      { title: "Xu hướng thiết kế", path: "/blogs/news?category=design" },
      { title: "Mẹo bảo quản nội thất", path: "/blogs/news?category=tips" },
    ],
  },
  {
    title: "Landing Page",
    path: "/landing",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Auth States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [authError, setAuthError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const showToast = useToastStore((state) => state.showToast);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150) {
        setIsScrolled(true);
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Load user session
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Auth Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!loginForm.email || !loginForm.password) {
      setAuthError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === loginForm.email && u.password === loginForm.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthModalOpen(false);
      showToast(`Chào mừng trở lại, ${user.fullName}`);
    } else {
      setAuthError('Email hoặc mật khẩu không chính xác');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!regForm.fullName || !regForm.email || !regForm.password || !regForm.phone) {
      setAuthError('Vui lòng điền đầy đủ các trường bắt buộc');
      return;
    }
    if (regForm.password !== regForm.confirmPassword) {
      setAuthError('Mật khẩu xác nhận không khớp');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === regForm.email)) {
      setAuthError('Email này đã được đăng ký');
      return;
    }

    const newUser = {
      fullName: regForm.fullName,
      email: regForm.email,
      password: regForm.password,
      phone: regForm.phone
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast('Đăng ký tài khoản thành công');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    showToast('Đã đăng xuất');
  };

  // Logic cuộn mượt cho các trạm Săn Deal
  const handleSubmenuClick = (e: React.MouseEvent, sub: any) => {
    if (sub.anchor) {
      if (location.pathname === '/san-deal') {
        e.preventDefault();
        const element = document.getElementById(sub.anchor);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      } else {
        navigate(`${sub.path}#${sub.anchor}`);
      }
    }
  };

  // Custom Styles for Modal (Plain CSS/Inline to avoid Tailwind reliance as requested)
  const modalStyles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(4px)'
    },
    container: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '420px',
      position: 'relative',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
    },
    input: {
      width: '100%',
      padding: '12px',
      marginBottom: '15px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      outline: 'none'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#9c4533',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      cursor: 'pointer',
      marginTop: '10px'
    },
    tabButton: {
      flex: 1,
      padding: '10px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontWeight: 'bold',
      borderBottom: '2px solid transparent'
    },
    error: {
      color: '#d0021b',
      fontSize: '12px',
      marginBottom: '10px',
      textAlign: 'center'
    }
  };

  return (
    <>
      <header className={cn(
        "w-full bg-white z-[999] transition-all duration-500 border-b border-gray-100",
        isScrolled ? "fixed top-0 shadow-lg" : "relative",
        isScrolled && !isVisible ? "-translate-y-full" : "translate-y-0"
      )}>
        <div className="py-4 md:py-6 container mx-auto px-6 md:px-10 flex items-center justify-between">
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 text-center md:text-left">
            <Link to="/" className="text-2xl md:text-3xl font-black uppercase tracking-tighter inline-block group">
              MODERN<span className="text-[#9c4533] group-hover:text-black transition-colors">FURNITURE</span>
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Search 
              size={22} 
              className="cursor-pointer hover:text-[#9c4533] transition-transform hover:scale-110 hidden md:block" 
              onClick={() => setIsSearchOpen(true)}
            />
            
            {/* User Icon / Auth Trigger */}
            <div className="relative group">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-[#9c4533] transition-colors"
                onClick={() => currentUser ? null : setIsAuthModalOpen(true)}
              >
                <User size={22} />
                {currentUser && (
                  <span className="hidden lg:block text-sm font-bold truncate max-w-[100px]">
                    {currentUser.fullName.split(' ').pop()}
                  </span>
                )}
              </div>
              
              {/* Simple Logout Dropdown if logged in */}
              {currentUser && (
                <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="bg-white shadow-xl border border-gray-100 py-2 min-w-[160px] rounded-sm">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-[11px] text-gray-400 uppercase font-bold">Tài khoản</p>
                      <p className="text-xs font-bold truncate">{currentUser.fullName}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-xs hover:bg-gray-50 text-red-600 font-medium"
                    >
                      <LogOut size={14} /> Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative group flex items-center">
              <Link to="/cart" className="relative flex items-center">
                <ShoppingBag size={24} className="group-hover:text-[#9c4533] transition-colors" />
                <span className="absolute -top-2 -right-2 bg-[#9c4533] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              </Link>
              
              {/* Quick View Cart Dropdown */}
              <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[1000] pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white shadow-2xl border border-gray-100 rounded-sm p-4 w-[320px]">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-50 pb-2">
                    Giỏ hàng của bạn ({cartCount})
                  </h3>
                  
                  {cartItems.length === 0 ? (
                    <div className="py-8 text-center">
                      <ShoppingBag size={40} className="mx-auto text-gray-100 mb-2" />
                      <p className="text-sm text-gray-500">Giỏ hàng đang trống</p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map((item) => (
                          <div key={`${item.id}-${item.variant}`} className="flex gap-4 mb-4 last:mb-0">
                            <div className="w-16 h-20 bg-gray-50 shrink-0 border border-gray-50 overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <h4 className="text-[13px] font-bold text-gray-900 truncate mb-1">{item.name}</h4>
                              <p className="text-[11px] text-gray-500">
                                {item.quantity} x {new Intl.NumberFormat('vi-VN').format(item.price)}₫
                              </p>
                              {item.variant && (
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">Màu: {item.variant}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-gray-400 uppercase">Tổng cộng:</span>
                          <span className="text-sm font-black text-[#9c4533]">
                            {new Intl.NumberFormat('vi-VN').format(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0))}₫
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Link to="/cart" className="py-2.5 px-2 border border-black text-black text-center text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
                            Giỏ hàng
                          </Link>
                          <Link to="/checkout" className="py-2.5 px-2 bg-[#9c4533] text-white text-center text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all">
                            Thanh toán
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:block border-t border-gray-50 bg-white">
          <ul className="flex justify-center items-center uppercase font-bold text-[13px] tracking-widest">
            {MENU_ITEMS.map((item) => (
              <li key={item.title} className="relative group">
                {/* Khối bọc menu chính - Giữ khoảng cách hover rộng rãi */}
                <div className="px-6 py-4">
                  <Link 
                    to={item.path} 
                    className={cn(
                      "flex items-center gap-1.5 transition-colors duration-300",
                      location.pathname === item.path ? "text-[#B05B43] font-bold" : "text-gray-800 hover:text-[#B05B43]"
                    )}
                  >
                    {item.title}
                    {item.submenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>
                </div>

                {item.submenu && (
                  /* Khối container tuyệt đối - Dùng chung cho cả SẢN PHẨM và BLOG */
                  <div className="absolute top-full left-0 hidden group-hover:block pt-3 z-[100] min-w-[240px]">
                    <ul className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] py-4 border-t-2 border-[#B05B43] animate-in fade-in slide-in-from-top-2 duration-200 font-medium normal-case text-gray-600 before:content-[''] before:absolute before:top-[-20px] before:left-0 before:w-full before:h-[20px] before:block">
                      {item.submenu.map((sub) => (
                        <li key={sub.title}>
                          <Link 
                            to={sub.path} 
                            onClick={(e) => handleSubmenuClick(e, sub)}
                            className="flex items-center justify-between px-6 py-2.5 hover:bg-gray-50 hover:text-[#B05B43] transition-all"
                          >
                            {sub.title}
                            <ChevronRight size={12} className="opacity-0 group-hover:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* --- AUTH MODAL --- */}
      {isAuthModalOpen && (
        <div style={modalStyles.overlay} onClick={() => setIsAuthModalOpen(false)}>
          <div style={modalStyles.container} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setIsAuthModalOpen(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', cursor: 'pointer', color: '#888' }}
            >
              <X size={24} />
            </button>

            <div style={{ display: 'flex', marginBottom: '25px', borderBottom: '1px solid #eee' }}>
              <button 
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                style={{ ...modalStyles.tabButton, borderBottomColor: authMode === 'login' ? '#9c4533' : 'transparent', color: authMode === 'login' ? '#9c4533' : '#888' }}
              >
                ĐĂNG NHẬP
              </button>
              <button 
                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                style={{ ...modalStyles.tabButton, borderBottomColor: authMode === 'register' ? '#9c4533' : 'transparent', color: authMode === 'register' ? '#9c4533' : '#888' }}
              >
                ĐĂNG KÝ
              </button>
            </div>

            {authError && <div style={modalStyles.error}>{authError}</div>}

            {authMode === 'login' ? (
              <form onSubmit={handleLogin}>
                <input 
                  type="email" 
                  placeholder="Email" 
                  style={modalStyles.input}
                  value={loginForm.email}
                  onChange={e => setLoginForm({...loginForm, email: e.target.value})}
                />
                <input 
                  type="password" 
                  placeholder="Mật khẩu" 
                  style={modalStyles.input}
                  value={loginForm.password}
                  onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                />
                <button type="submit" style={modalStyles.button}>Đăng nhập</button>
                <p style={{ textAlign: 'center', fontSize: '13px', marginTop: '15px', color: '#666' }}>
                  Quên mật khẩu? <span style={{ color: '#9c4533', cursor: 'pointer' }}>Lấy lại tại đây</span>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <input 
                  type="text" 
                  placeholder="Họ và tên *" 
                  style={modalStyles.input}
                  value={regForm.fullName}
                  onChange={e => setRegData({...regForm, fullName: e.target.value})}
                />
                <input 
                  type="email" 
                  placeholder="Email *" 
                  style={modalStyles.input}
                  value={regForm.email}
                  onChange={e => setRegData({...regForm, email: e.target.value})}
                />
                <input 
                  type="tel" 
                  placeholder="Số điện thoại *" 
                  style={modalStyles.input}
                  value={regForm.phone}
                  onChange={e => setRegData({...regForm, phone: e.target.value})}
                />
                <input 
                  type="password" 
                  placeholder="Mật khẩu *" 
                  style={modalStyles.input}
                  value={regForm.password}
                  onChange={e => setRegData({...regForm, password: e.target.value})}
                />
                <input 
                  type="password" 
                  placeholder="Xác nhận mật khẩu *" 
                  style={modalStyles.input}
                  value={regForm.confirmPassword}
                  onChange={e => setRegData({...regForm, confirmPassword: e.target.value})}
                />
                <button type="submit" style={modalStyles.button}>Đăng ký</button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[1002] bg-white flex items-center px-10 animate-in fade-in slide-in-from-top duration-300">
          <div className="container mx-auto flex items-center gap-4">
            <Search size={28} className="text-gray-400" />
            <input 
              autoFocus 
              type="text" 
              placeholder="Bạn đang tìm kiếm nội thất gì?..." 
              className="w-full text-2xl font-light outline-none border-none focus:ring-0" 
            />
            <button onClick={() => setIsSearchOpen(false)} className="p-4 hover:bg-gray-50 rounded-full transition-colors">
              <X size={32} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[1001] flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-[85%] max-w-[320px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <span className="font-black text-xl tracking-tighter">DANH MỤC</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 hover:bg-white rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="px-2">
                {MENU_ITEMS.map((item) => (
                  <li key={item.title} className="mb-1">
                    <Link 
                      to={item.path} 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between p-4 font-bold uppercase text-[14px] hover:bg-gray-50 rounded-lg",
                        location.pathname === item.path ? "text-[#B05B43] font-bold" : "text-gray-800"
                      )}
                    >
                      {item.title}
                      {item.submenu && <ChevronRight size={18} className="text-gray-400" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
               <div 
                className="flex items-center gap-4 text-sm font-medium text-gray-600 cursor-pointer"
                onClick={() => { setIsMobileMenuOpen(false); setIsAuthModalOpen(true); }}
              >
                <User size={20} /> {currentUser ? currentUser.fullName : 'Đăng nhập / Đăng ký'}
              </div>
              <div className="text-[11px] text-gray-400 text-center uppercase tracking-widest">
                © 2026 Modern Furniture
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}