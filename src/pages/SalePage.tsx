import React, { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/src/store/cartStore';
import { allProductsDB } from '@/src/data/products';
import { Copy, Check, ChevronRight, ShoppingBag, Zap, Star, TrendingUp, Gift, Flame } from 'lucide-react';

// ─── Màu chủ đạo ────────────────────────────────────────────
const BRAND = '#B05B43';
const BRAND_DARK = '#8B4532';
const BRAND_LIGHT = '#F5EDE9';

// ─── Voucher data ────────────────────────────────────────────
const VOUCHERS = [
  { code: 'DEAL10', label: 'Giảm 10%', desc: 'Áp dụng tất cả đơn hàng', color: '#B05B43' },
  { code: 'FREESHIP', label: 'Free Ship', desc: 'Miễn phí vận chuyển', color: '#2D7D46' },
  { code: 'SALE20', label: 'Giảm 20%', desc: 'Đơn từ 2 triệu', color: '#1A6B9A' },
  { code: 'VIP30', label: 'VIP -30%', desc: 'Dành riêng thành viên VIP', color: '#7B3FA0' },
  { code: 'DEAL10', label: 'Giảm 10%', desc: 'Áp dụng tất cả đơn hàng', color: '#B05B43' },
  { code: 'NEWBIE', label: 'Mới -15%', desc: 'Lần đầu mua hàng', color: '#C47A27' },
  { code: 'FREESHIP', label: 'Free Ship', desc: 'Miễn phí vận chuyển', color: '#2D7D46' },
  { code: 'DEAL10', label: 'Giảm 10%', desc: 'Áp dụng tất cả đơn hàng', color: '#B05B43' },
];

// ─── Combo data ──────────────────────────────────────────────
const saleProducts = allProductsDB.filter(p => p.comparePrice);

const COMBOS = [
  {
    id: 'combo-phong-khach',
    name: 'Bộ Phòng Khách Hiện Đại',
    desc: 'Sofa + Ghế thư giãn + Đèn treo — bộ đôi hoàn hảo cho không gian sống',
    sceneImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    originalTotal: 0,
    comboPrice: 0,
    products: [
      allProductsDB.find(p => p.id === 'ghe-phong-khach-arctander'),
      allProductsDB.find(p => p.id === 'sofa-2-cho-ngoi'),
      allProductsDB.find(p => p.id === 'den-treo-sang-trong-hubert'),
    ].filter(Boolean),
  },
  {
    id: 'combo-phong-ngu',
    name: 'Bộ Phòng Ngủ Sang Trọng',
    desc: 'Đèn bàn + Ghế đọc sách + Tủ sách — tạo góc thư giãn hoàn hảo',
    sceneImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    originalTotal: 0,
    comboPrice: 0,
    products: [
      allProductsDB.find(p => p.id === 'den-de-ban-gon-nhe-petite'),
      allProductsDB.find(p => p.id === 'ghe-go-bap-benh-iconic'),
      allProductsDB.find(p => p.id === 'tu-sach-go-tu-nhien'),
    ].filter(Boolean),
  },
];

// Tính giá combo (giảm 15%)
COMBOS.forEach(combo => {
  combo.originalTotal = combo.products.reduce((sum, p) => sum + (p?.price || 0), 0);
  combo.comboPrice = Math.round(combo.originalTotal * 0.85);
});

// ─── Top 5 Hot Sale ─────────────────────────────────────────
const TOP5_SALE = allProductsDB
  .filter(p => p.comparePrice)
  .sort((a, b) => {
    const discA = ((a.comparePrice! - a.price) / a.comparePrice!) * 100;
    const discB = ((b.comparePrice! - b.price) / b.comparePrice!) * 100;
    return discB - discA;
  })
  .slice(0, 5)
  .map((p, i) => ({
    ...p,
    stock: [85, 72, 60, 45, 30][i],
    sold: [215, 188, 156, 134, 97][i],
  }));

// ─── Helpers ────────────────────────────────────────────────
const fmt = (n: number) => new Intl.NumberFormat('vi-VN').format(n) + '₫';

// ════════════════════════════════════════════════════════════
// COMPONENT: Lucky Spinner
// ════════════════════════════════════════════════════════════
function LuckySpinner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof VOUCHERS[0] | null>(null);
  const [copied, setCopied] = useState(false);
  const angleRef = useRef(0);
  const animRef = useRef<number | null>(null);

  // Draw wheel on canvas
  const drawWheel = (angle: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 8;
    const sliceAngle = (2 * Math.PI) / VOUCHERS.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw shadow
    ctx.save();
    ctx.shadowColor = 'rgba(176,91,67,0.3)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.restore();

    // Slices
    const sliceColors = [BRAND, '#C87B63', '#D4956B', '#E8B49A', '#F0CAB8', '#D4956B', '#C87B63', '#B87060'];
    VOUCHERS.forEach((v, i) => {
      const startA = angle + i * sliceAngle;
      const endA = startA + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, startA, endA);
      ctx.closePath();
      ctx.fillStyle = i % 2 === 0 ? BRAND : '#C87B63';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startA + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(v.label, r - 12, 4);
      ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = BRAND;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center icon text
    ctx.fillStyle = BRAND;
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('QUAY', cx, cy);
  };

  useEffect(() => {
    drawWheel(angleRef.current);
  }, []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setCopied(false);

    const targetSlice = Math.floor(Math.random() * VOUCHERS.length);
    const sliceAngle = (2 * Math.PI) / VOUCHERS.length;
    const targetAngle = 5 * Math.PI * 2 + (Math.PI * 1.5 - targetSlice * sliceAngle - sliceAngle / 2);
    const startAngle = angleRef.current;
    const duration = 4000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - t, 3);
      const current = startAngle + (targetAngle - startAngle) * ease;
      angleRef.current = current;
      drawWheel(current);

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        const won = VOUCHERS[targetSlice];
        setResult(won);
        // Save to localStorage
        const saved = JSON.parse(localStorage.getItem('mf_vouchers') || '[]');
        if (!saved.includes(won.code)) {
          localStorage.setItem('mf_vouchers', JSON.stringify([...saved, won.code]));
        }
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const copyCode = () => {
    if (result) {
      navigator.clipboard.writeText(result.code).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mf-deal-spinner flex flex-col items-center gap-6">
      {/* Pointer */}
      <div className="relative">
        <div className="mf-deal-pointer" />
        <canvas
          ref={canvasRef}
          width={280}
          height={280}
          className="mf-deal-canvas"
          style={{ borderRadius: '50%', cursor: spinning ? 'not-allowed' : 'pointer' }}
          onClick={spin}
        />
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="mf-deal-spin-btn"
        style={{
          backgroundColor: spinning ? '#ccc' : BRAND,
          cursor: spinning ? 'not-allowed' : 'pointer',
        }}
      >
        {spinning ? '🎰 Đang quay...' : '🎯 QUAY NGAY'}
      </button>

      {result && (
        <div className="mf-deal-result-card" style={{ borderColor: result.color }}>
          <div className="mf-deal-result-emoji">🎉</div>
          <p className="mf-deal-result-title">Chúc mừng! Bạn nhận được</p>
          <p className="mf-deal-result-label" style={{ color: result.color }}>{result.label}</p>
          <p className="mf-deal-result-desc">{result.desc}</p>
          <div className="mf-deal-code-row">
            <span className="mf-deal-code-badge" style={{ backgroundColor: result.color + '15', color: result.color, borderColor: result.color }}>
              {result.code}
            </span>
            <button
              onClick={copyCode}
              className="mf-deal-copy-btn"
              style={{ backgroundColor: result.color }}
            >
              {copied ? <><Check size={14} /> Đã copy</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <p className="mf-deal-saved-note">✅ Đã lưu vào kho voucher của bạn</p>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// COMPONENT: Combo Deal
// ════════════════════════════════════════════════════════════
function ComboDeal({ combo }: { combo: typeof COMBOS[0] }) {
  const { addToCart } = useCartStore();
  const [added, setAdded] = useState(false);

  const handleBuyCombo = () => {
    combo.products.forEach(p => {
      if (p) {
        addToCart({
          id: p.id,
          name: p.title,
          price: p.price,
          image: p.image,
        });
      }
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const discountPct = Math.round(((combo.originalTotal - combo.comboPrice) / combo.originalTotal) * 100);

  return (
    <div className="mf-deal-combo-card">
      <div className="mf-deal-combo-grid">
        {/* Left: Scene image */}
        <div className="mf-deal-combo-img-wrap">
          <img src={combo.sceneImg} alt={combo.name} className="mf-deal-combo-img" />
          <span className="mf-deal-combo-badge" style={{ backgroundColor: BRAND }}>
            -{discountPct}% KHI MUA BỘ
          </span>
        </div>

        {/* Right: Product list */}
        <div className="mf-deal-combo-info">
          <h3 className="mf-deal-combo-name">{combo.name}</h3>
          <p className="mf-deal-combo-desc">{combo.desc}</p>

          <div className="mf-deal-combo-products">
            {combo.products.map((p, i) => p && (
              <div key={p.id} className="mf-deal-combo-item">
                <img src={p.image} alt={p.title} className="mf-deal-combo-item-img" />
                <div className="mf-deal-combo-item-info">
                  <p className="mf-deal-combo-item-name">{p.title}</p>
                  <p className="mf-deal-combo-item-price" style={{ color: BRAND }}>{fmt(p.price)}</p>
                </div>
                {i < combo.products.length - 1 && (
                  <span className="mf-deal-combo-plus">+</span>
                )}
              </div>
            ))}
          </div>

          <div className="mf-deal-combo-pricing">
            <span className="mf-deal-combo-old">{fmt(combo.originalTotal)}</span>
            <span className="mf-deal-combo-new" style={{ color: BRAND }}>{fmt(combo.comboPrice)}</span>
            <span className="mf-deal-combo-save" style={{ backgroundColor: BRAND + '15', color: BRAND }}>
              Tiết kiệm {fmt(combo.originalTotal - combo.comboPrice)}
            </span>
          </div>

          <button
            onClick={handleBuyCombo}
            className="mf-deal-combo-btn"
            style={{ backgroundColor: added ? '#2D7D46' : BRAND }}
          >
            {added ? (
              <><Check size={18} /> Đã thêm vào giỏ!</>
            ) : (
              <><ShoppingBag size={18} /> Mua trọn bộ</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// COMPONENT: Hot Sale List
// ════════════════════════════════════════════════════════════
function HotSaleItem({ product, rank }: { product: typeof TOP5_SALE[0]; rank: number }) {
  const { addToCart } = useCartStore();
  const [added, setAdded] = useState(false);
  const discountPct = Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100);
  const stockPct = product.stock;

  const handleAdd = () => {
    addToCart({ id: product.id, name: product.title, price: product.price, image: product.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const rankColors = ['#B05B43', '#C87B63', '#D4956B', '#9E9E9E', '#9E9E9E'];
  const rankEmojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  return (
    <div className="mf-deal-hot-item">
      <div className="mf-deal-hot-rank" style={{ backgroundColor: rankColors[rank] }}>
        <span>{rankEmojis[rank]}</span>
      </div>

      <img src={product.image} alt={product.title} className="mf-deal-hot-img" />

      <div className="mf-deal-hot-info">
        <p className="mf-deal-hot-name">{product.title}</p>
        <div className="mf-deal-hot-prices">
          <span className="mf-deal-hot-price" style={{ color: BRAND }}>{fmt(product.price)}</span>
          <span className="mf-deal-hot-old">{fmt(product.comparePrice!)}</span>
          <span className="mf-deal-hot-badge" style={{ backgroundColor: BRAND }}>-{discountPct}%</span>
        </div>

        {/* Progress bar: scarcity */}
        <div className="mf-deal-hot-bar-wrap">
          <div className="mf-deal-hot-bar-track">
            <div
              className="mf-deal-hot-bar-fill"
              style={{ width: `${stockPct}%`, backgroundColor: BRAND }}
            />
          </div>
          <p className="mf-deal-hot-bar-label">
            <Flame size={12} style={{ color: BRAND, display: 'inline' }} />
            {' '}Còn <strong style={{ color: BRAND }}>{stockPct}%</strong> hàng — đã bán {product.sold}
          </p>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="mf-deal-hot-btn"
        style={{ backgroundColor: added ? '#2D7D46' : BRAND }}
      >
        {added ? <Check size={16} /> : <ShoppingBag size={16} />}
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════
// MAIN PAGE: SalePage
// ════════════════════════════════════════════════════════════
export default function SalePage() {
  return (
    <>
      <style>{`
        /* ── Page layout ─────────────────────────────── */
        .mf-deal-page {
          min-height: 100vh;
          background: #FAF7F5;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }

        /* ── Hero banner ─────────────────────────────── */
        .mf-deal-hero {
          background: linear-gradient(135deg, #2C1810 0%, #B05B43 50%, #D4956B 100%);
          padding: 60px 20px 80px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .mf-deal-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        .mf-deal-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 100px;
          padding: 5px 16px;
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .mf-deal-hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 12px;
          text-shadow: 0 2px 20px rgba(0,0,0,0.3);
        }
        .mf-deal-hero-sub {
          color: rgba(255,255,255,0.85);
          font-size: 1.05rem;
          max-width: 500px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }
        .mf-deal-hero-steps {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .mf-deal-hero-step {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.2);
          border-radius: 8px;
          padding: 6px 14px;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
        }

        /* ── Section container ───────────────────────── */
        .mf-deal-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 60px 20px;
        }
        .mf-deal-section-header {
          text-align: center;
          margin-bottom: 40px;
        }
        .mf-deal-section-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F5EDE9;
          color: #B05B43;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 100px;
          margin-bottom: 10px;
        }
        .mf-deal-section-title {
          font-size: clamp(1.5rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #1C1C1C;
          margin-bottom: 8px;
          line-height: 1.2;
        }
        .mf-deal-section-desc {
          color: #666;
          font-size: 15px;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Station divider ─────────────────────────── */
        .mf-deal-station {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto 0;
          padding: 0 20px;
        }
        .mf-deal-station-num {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #B05B43;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.1rem;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(176,91,67,0.4);
        }
        .mf-deal-station-line {
          flex: 1;
          height: 2px;
          background: linear-gradient(90deg, #B05B43, transparent);
        }
        .mf-deal-station-label {
          font-size: 13px;
          font-weight: 700;
          color: #B05B43;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          white-space: nowrap;
        }

        /* ── Section bg variants ─────────────────────── */
        .mf-deal-bg-white { background: #fff; }
        .mf-deal-bg-warm { background: #FAF7F5; }
        .mf-deal-bg-dark {
          background: linear-gradient(135deg, #2C1810, #4A2418);
        }

        /* ── Spinner ─────────────────────────────────── */
        .mf-deal-pointer {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 28px solid #B05B43;
          filter: drop-shadow(0 3px 6px rgba(176,91,67,0.6));
          z-index: 2;
        }
        .mf-deal-canvas {
          display: block;
          box-shadow: 0 8px 40px rgba(176,91,67,0.3);
        }
        .mf-deal-spin-btn {
          padding: 14px 40px;
          border: none;
          border-radius: 50px;
          color: #fff;
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 1px;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(176,91,67,0.4);
        }
        .mf-deal-spin-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(176,91,67,0.5);
        }
        .mf-deal-result-card {
          background: #fff;
          border-radius: 20px;
          border: 2px solid;
          padding: 24px 28px;
          text-align: center;
          max-width: 340px;
          width: 100%;
          box-shadow: 0 8px 40px rgba(0,0,0,0.1);
          animation: mf-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes mf-pop {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .mf-deal-result-emoji { font-size: 2.5rem; margin-bottom: 8px; }
        .mf-deal-result-title { color: #666; font-size: 13px; margin-bottom: 4px; }
        .mf-deal-result-label { font-size: 1.6rem; font-weight: 900; margin-bottom: 4px; }
        .mf-deal-result-desc { color: #888; font-size: 13px; margin-bottom: 14px; }
        .mf-deal-code-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 10px;
        }
        .mf-deal-code-badge {
          padding: 6px 16px;
          border-radius: 8px;
          border: 1.5px dashed;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: 2px;
        }
        .mf-deal-copy-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .mf-deal-copy-btn:hover { opacity: 0.85; }
        .mf-deal-saved-note { color: #2D7D46; font-size: 12px; font-weight: 600; }

        /* ── Combo ───────────────────────────────────── */
        .mf-deal-combo-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          margin-bottom: 24px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .mf-deal-combo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(176,91,67,0.15);
        }
        .mf-deal-combo-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 700px) {
          .mf-deal-combo-grid { grid-template-columns: 1fr; }
        }
        .mf-deal-combo-img-wrap {
          position: relative;
          overflow: hidden;
        }
        .mf-deal-combo-img {
          width: 100%;
          height: 100%;
          min-height: 260px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s;
        }
        .mf-deal-combo-card:hover .mf-deal-combo-img { transform: scale(1.04); }
        .mf-deal-combo-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          color: #fff;
          font-size: 11px;
          font-weight: 800;
          padding: 5px 12px;
          border-radius: 100px;
          letter-spacing: 1px;
        }
        .mf-deal-combo-info {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .mf-deal-combo-name {
          font-size: 1.3rem;
          font-weight: 800;
          color: #1C1C1C;
          line-height: 1.3;
        }
        .mf-deal-combo-desc {
          color: #777;
          font-size: 14px;
          line-height: 1.5;
        }
        .mf-deal-combo-products { display: flex; flex-direction: column; gap: 10px; }
        .mf-deal-combo-item {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
        }
        .mf-deal-combo-item-img {
          width: 48px;
          height: 48px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
        }
        .mf-deal-combo-item-info { flex: 1; min-width: 0; }
        .mf-deal-combo-item-name {
          font-size: 13px;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mf-deal-combo-item-price { font-size: 13px; font-weight: 700; }
        .mf-deal-combo-plus {
          font-size: 20px;
          font-weight: 900;
          color: #B05B43;
          position: absolute;
          right: -4px;
          bottom: -16px;
        }
        .mf-deal-combo-pricing {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          padding: 12px;
          background: #FAF7F5;
          border-radius: 12px;
        }
        .mf-deal-combo-old {
          font-size: 13px;
          color: #aaa;
          text-decoration: line-through;
        }
        .mf-deal-combo-new {
          font-size: 1.4rem;
          font-weight: 900;
        }
        .mf-deal-combo-save {
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 100px;
        }
        .mf-deal-combo-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px 24px;
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 4px 16px rgba(176,91,67,0.35);
        }
        .mf-deal-combo-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(176,91,67,0.45);
        }

        /* ── Hot Sale list ───────────────────────────── */
        .mf-deal-hot-list { display: flex; flex-direction: column; gap: 14px; }
        .mf-deal-hot-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #fff;
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          transition: all 0.2s;
        }
        .mf-deal-hot-item:hover {
          box-shadow: 0 6px 24px rgba(176,91,67,0.12);
          transform: translateX(4px);
        }
        .mf-deal-hot-rank {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .mf-deal-hot-img {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 12px;
          flex-shrink: 0;
        }
        .mf-deal-hot-info { flex: 1; min-width: 0; }
        .mf-deal-hot-name {
          font-size: 14px;
          font-weight: 700;
          color: #1C1C1C;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mf-deal-hot-prices {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .mf-deal-hot-price { font-size: 15px; font-weight: 800; }
        .mf-deal-hot-old { font-size: 12px; color: #aaa; text-decoration: line-through; }
        .mf-deal-hot-badge {
          font-size: 10px;
          font-weight: 800;
          color: #fff;
          padding: 2px 8px;
          border-radius: 100px;
        }
        .mf-deal-hot-bar-track {
          height: 6px;
          background: #F0E8E5;
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 4px;
        }
        .mf-deal-hot-bar-fill {
          height: 100%;
          border-radius: 100px;
          transition: width 1s ease;
          background-image: linear-gradient(90deg, #B05B43, #D4956B);
        }
        .mf-deal-hot-bar-label {
          font-size: 11px;
          color: #888;
        }
        .mf-deal-hot-btn {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(176,91,67,0.3);
        }
        .mf-deal-hot-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 14px rgba(176,91,67,0.45);
        }

        /* ── CTA bottom ──────────────────────────────── */
        .mf-deal-cta {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #2C1810, #B05B43);
          color: #fff;
        }
        .mf-deal-cta-title {
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 900;
          margin-bottom: 12px;
        }
        .mf-deal-cta-sub { opacity: 0.85; font-size: 15px; margin-bottom: 24px; }
        .mf-deal-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 36px;
          background: #fff;
          color: #B05B43;
          font-weight: 800;
          font-size: 15px;
          border-radius: 100px;
          text-decoration: none;
          transition: all 0.2s;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .mf-deal-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
      `}</style>

      <div className="mf-deal-page">
        {/* ── Hero ──────────────────────────────────── */}
        <div className="mf-deal-hero">
          <div className="mf-deal-hero-tag">
            <Zap size={12} /> Hành trình săn deal
          </div>
          <h1 className="mf-deal-hero-title">
            🔥 SĂN DEAL<br />CÙNG MODERN FURNITURE
          </h1>
          <p className="mf-deal-hero-sub">
            3 trạm dừng chân — 3 cơ hội vàng để sở hữu nội thất đẳng cấp với giá cực ưu đãi
          </p>
          <div className="mf-deal-hero-steps">
            <div className="mf-deal-hero-step"><Gift size={14} /> Trạm 1: Vòng quay may mắn</div>
            <div className="mf-deal-hero-step"><Star size={14} /> Trạm 2: Combo Decor</div>
            <div className="mf-deal-hero-step"><TrendingUp size={14} /> Trạm 3: Hot Sale</div>
          </div>
        </div>

        {/* ══ TRẠM 1: SPINNER ══════════════════════════ */}
        <div className="mf-deal-station" style={{ paddingTop: 48 }}>
          <div className="mf-deal-station-num">1</div>
          <div className="mf-deal-station-label">Trạm 1</div>
          <div className="mf-deal-station-line" />
        </div>

        <div className="mf-deal-bg-white">
          <div className="mf-deal-section">
            <div className="mf-deal-section-header">
              <div className="mf-deal-section-label"><Gift size={12} /> Gamification</div>
              <h2 className="mf-deal-section-title">🎰 Vòng Quay May Mắn</h2>
              <p className="mf-deal-section-desc">Thử vận may ngay! Mỗi lần quay là một cơ hội nhận voucher khủng. Mã sẽ được lưu tự động.</p>
            </div>
            <LuckySpinner />
          </div>
        </div>

        {/* ══ TRẠM 2: COMBO ════════════════════════════ */}
        <div className="mf-deal-station">
          <div className="mf-deal-station-num">2</div>
          <div className="mf-deal-station-label">Trạm 2</div>
          <div className="mf-deal-station-line" />
        </div>

        <div className="mf-deal-bg-warm">
          <div className="mf-deal-section">
            <div className="mf-deal-section-header">
              <div className="mf-deal-section-label"><Star size={12} /> Bundle Deals</div>
              <h2 className="mf-deal-section-title">🏠 Combo Decor — Mua Theo Bộ</h2>
              <p className="mf-deal-section-desc">Tiết kiệm đến 15% khi mua trọn bộ. Tất cả sản phẩm sẽ được thêm ngay vào giỏ hàng.</p>
            </div>
            {COMBOS.map(combo => (
              <ComboDeal key={combo.id} combo={combo} />
            ))}
          </div>
        </div>

        {/* ══ TRẠM 3: HOT SALE ═════════════════════════ */}
        <div className="mf-deal-station">
          <div className="mf-deal-station-num">3</div>
          <div className="mf-deal-station-label">Trạm 3</div>
          <div className="mf-deal-station-line" />
        </div>

        <div className="mf-deal-bg-white">
          <div className="mf-deal-section">
            <div className="mf-deal-section-header">
              <div className="mf-deal-section-label"><TrendingUp size={12} /> Trending</div>
              <h2 className="mf-deal-section-title">🔥 Bảng Xếp Hạng Hot Sale</h2>
              <p className="mf-deal-section-desc">Top 5 sản phẩm đang được săn đón nhiều nhất. Hàng có hạn — đừng bỏ lỡ!</p>
            </div>
            <div className="mf-deal-hot-list">
              {TOP5_SALE.map((product, i) => (
                <HotSaleItem key={product.id} product={product} rank={i} />
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────── */}
        <div className="mf-deal-cta">
          <h2 className="mf-deal-cta-title">Không muốn bỏ lỡ deal nào?</h2>
          <p className="mf-deal-cta-sub">Khám phá toàn bộ bộ sưu tập sản phẩm khuyến mãi tại gian hàng của chúng tôi</p>
          <a href="/collections/all" className="mf-deal-cta-btn">
            Xem tất cả sản phẩm <ChevronRight size={18} />
          </a>
        </div>
      </div>
    </>
  );
}