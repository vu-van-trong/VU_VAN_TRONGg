import { Product } from '../components/ProductCard';

// ============================================================
// DATABASE SẢN PHẨM ĐẦY ĐỦ — dùng cho cả ProductCard & ProductDetail
// price luôn là number (đơn vị: VNĐ)
// ============================================================

export interface ProductFull {
  id: string;
  title: string;
  price: number;
  comparePrice?: number;
  label?: string;
  soldOut?: boolean;
  image: string;
  hoverImage: string;
  images: string[];
  category: string;
  categoryPath: string;
  variants: { name: string; value: string; color: string; soldout?: boolean }[];
  description: string;
}

export const allProductsDB: ProductFull[] = [
  {
    id: 'ghe-phong-khach-arctander',
    title: 'Ghế phòng khách Arctander',
    price: 799000,
    comparePrice: 999000,
    label: '-20%',
    image: 'https://product.hstatic.net/1000309459/product/sp1-1_8b56d5f805744ca98b24545ae72d3cb4_c596aa3fb2e7428a87cdf3b0567c2d8a_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp1-2_0ab2e2a624424c2a803800990fb57109_36763e8fecdd4146a12968254ae73abe_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp1-1_8b56d5f805744ca98b24545ae72d3cb4_c596aa3fb2e7428a87cdf3b0567c2d8a_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp1-2_0ab2e2a624424c2a803800990fb57109_36763e8fecdd4146a12968254ae73abe_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp1-1_9faf7f82e951400d92e2181dd3f00159_40ca050829704763af6494b0b93c4323_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp1-2_cd43e28b44d2488ab85c4499ae28b865_fe7b4b6617a84c27b23cb3150eaa146d_master.jpg',
    ],
    category: 'Sản phẩm khuyến mãi',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Vàng', value: 'Vàng', color: '#e8c547' },
      { name: 'Kem', value: 'Kem', color: '#c9a882', soldout: true },
    ],
    description: '<p>Dòng sản phẩm xuất khẩu được sản xuất tại Nhà Máy Việt Nam theo tiêu chuẩn Châu Âu. Nguồn gốc nguyên vật liệu cũng như chất lượng, độ bền sản phẩm đã được kiểm chứng bởi các nhà nhập khẩu Âu Mỹ</p><p><strong>CHẤT LIỆU</strong></p><p>Khung sườn: gỗ dầu (Việt Nam) đã xử lý mối mọt theo tiêu chuẩn xuất khẩu Châu Âu<br/>Nệm mút: nhập khẩu từ Malaysia<br/>Chỉ may: nhập khẩu từ Anh Quốc<br/>Da/PVC/Vải: Da Bò nhập khẩu từ Ý / PVC nhập khẩu từ Thái Lan / Vải nhập khẩu từ Hàn Quốc</p><p><strong>Hướng dẫn bảo quản</strong></p><ul><li>Tránh để đồ quá nóng hoặc quá lạnh trực tiếp lên bề mặt gỗ</li><li>Sử dụng vải khô để làm sạch bề mặt gỗ ngay khi bị bẩn</li><li>Khuyến nghị dùng sáp và xi bóng gỗ để chà sạch ít nhất 6 tháng một lần</li></ul>',
  },
  {
    id: 'am-tra-inox-khong-ghi',
    title: 'Ấm trà inox không ghỉ',
    price: 890000,
    comparePrice: 1250000,
    label: '-29%',
    image: 'https://product.hstatic.net/1000309459/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_35e9cf348a3b4df28059491ff6c6ff08_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_35e9cf348a3b4df28059491ff6c6ff08_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_35e9cf348a3b4df28059491ff6c6ff08_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp12-1_5316e032a8b0403b8fe26c4cd6bef167_35e9cf348a3b4df28059491ff6c6ff08_grande.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Bạc', value: 'Bạc', color: '#c0c0c0' },
    ],
    description: '<p>Ấm trà inox cao cấp, không gỉ sét theo thời gian. Thiết kế hiện đại, phù hợp với không gian bếp và phòng khách sang trọng.</p><p><strong>CHẤT LIỆU</strong></p><p>Inox 304 cao cấp, không chứa BPA, an toàn cho sức khỏe. Tay cầm chịu nhiệt, đáy từ tính phù hợp bếp từ.</p>',
  },
  {
    id: 'ban-xep-gon-nhe-tb01',
    title: 'Bàn xếp gọn nhẹ TB01',
    price: 1300000,
    image: 'https://product.hstatic.net/1000309459/product/sp11-1_f33d1b5977c84d01ac0037fdcb6c7317_2430fe7863a34cbf9f2190326cd08dab_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp11-2_d58d2329380c41f1885a093a5cf2f27c_eb50c95acadb438cbb088a454308e3ec_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp11-1_f33d1b5977c84d01ac0037fdcb6c7317_2430fe7863a34cbf9f2190326cd08dab_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp11-2_d58d2329380c41f1885a093a5cf2f27c_eb50c95acadb438cbb088a454308e3ec_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Nâu gỗ', value: 'Nâu gỗ', color: '#8B6914' },
      { name: 'Trắng', value: 'Trắng', color: '#f5f5f5' },
    ],
    description: '<p>Bàn xếp gọn thiết kế thông minh, tiết kiệm không gian. Khung nhôm cao cấp, mặt bàn gỗ MDF phủ melamine chống xước.</p><p><strong>Kích thước:</strong> 60×40cm (gấp lại: 60×5cm)</p><p><strong>Trọng lượng:</strong> 2.5kg — dễ dàng mang theo</p>',
  },
  {
    id: 'den-de-ban-gon-nhe-petite',
    title: 'Đèn để bàn gọn nhẹ Petite',
    price: 690000,
    image: 'https://product.hstatic.net/1000309459/product/sp8-1_5d1c7dc8e938478290333f2625515d68_28699549035a4a1e8823d70b9a6f8388_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp8-2_6a27ed54ad9849a3ae439de360094566_335fe1b291f9457b9e139fd22df5f1ac_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp8-1_5d1c7dc8e938478290333f2625515d68_28699549035a4a1e8823d70b9a6f8388_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp8-2_6a27ed54ad9849a3ae439de360094566_335fe1b291f9457b9e139fd22df5f1ac_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Kem', value: 'Kem', color: '#f5ede0' },
      { name: 'Đen', value: 'Đen', color: '#1a1a1a' },
    ],
    description: '<p>Đèn để bàn thiết kế tối giản, ánh sáng ấm áp tạo không gian thư giãn lý tưởng. Phù hợp với bàn làm việc, đầu giường hoặc kệ sách.</p><p><strong>Công suất:</strong> 9W LED, ánh sáng vàng 3000K</p><p><strong>Vật liệu:</strong> Khung sắt sơn tĩnh điện, chụp vải chống bám bụi</p>',
  },
  {
    id: 'den-treo-sang-trong-hubert',
    title: 'Đèn treo sang trọng Hubert',
    price: 1200000,
    soldOut: true,
    image: 'https://product.hstatic.net/1000309459/product/sp4-2_97670563a9c9462e91b405158f85b77a_1e84319ca6f74a5fbe7043f038a05166_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp4-1_9ccb76a9510a4e1b9e2e4a2ab0280193_7e7cc08c1bab4fb58044c535b9755b13_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp4-2_97670563a9c9462e91b405158f85b77a_1e84319ca6f74a5fbe7043f038a05166_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp4-1_9ccb76a9510a4e1b9e2e4a2ab0280193_7e7cc08c1bab4fb58044c535b9755b13_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Vàng đồng', value: 'Vàng đồng', color: '#b8860b' },
    ],
    description: '<p>Đèn treo trần phong cách Bắc Âu sang trọng, điểm nhấn hoàn hảo cho phòng ăn và phòng khách cao cấp.</p><p><strong>Vật liệu:</strong> Khung đồng nguyên chất, dây treo điều chỉnh độ cao</p><p><strong>Bóng đèn:</strong> E27, tương thích với bóng Edison vintage</p>',
  },
  {
    id: 'ghe-go-bap-benh-iconic',
    title: 'Ghế gỗ bập bênh Iconic',
    price: 700000,
    comparePrice: 890000,
    label: '-21%',
    image: 'https://product.hstatic.net/1000309459/product/sp5-2_fde6cf697c5343489c0715a2a77c9161_8ccf08b77b384087b8e47d0d62541382_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp5-1_655fbdd6a3ba415485ec214fd2a5c4a9_df66b6586d92482aac55836c9929150b_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp5-2_fde6cf697c5343489c0715a2a77c9161_8ccf08b77b384087b8e47d0d62541382_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp5-1_655fbdd6a3ba415485ec214fd2a5c4a9_df66b6586d92482aac55836c9929150b_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Tự nhiên', value: 'Tự nhiên', color: '#c8a97e' },
      { name: 'Walnut', value: 'Walnut', color: '#5c4033' },
    ],
    description: '<p>Ghế bập bênh gỗ thiết kế theo phong cách Scandinavian, mang lại cảm giác thư giãn tuyệt vời. Gỗ tự nhiên được xử lý chống mối mọt và chống ẩm.</p><p><strong>Kích thước:</strong> D100 × R60 × C90cm</p><p><strong>Tải trọng tối đa:</strong> 120kg</p>',
  },
  {
    id: 'ghe-sofa-giuong-keo-roots',
    title: 'Ghế sofa giường kéo Roots',
    price: 7200000,
    comparePrice: 7800000,
    label: '-8%',
    image: 'https://product.hstatic.net/1000309459/product/sp7-1_83fd0de6ab8b437d9b28cf50ad5e69cb_ef26305786114080bc65e3de534bfd69_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp7-2_811c15bd83e24680ae35695c8e939f69_adcb1fa0c81e462e8d97a80a824aaf5a_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp7-1_83fd0de6ab8b437d9b28cf50ad5e69cb_ef26305786114080bc65e3de534bfd69_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp7-2_811c15bd83e24680ae35695c8e939f69_adcb1fa0c81e462e8d97a80a824aaf5a_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Xám', value: 'Xám', color: '#8e8e8e' },
      { name: 'Be', value: 'Be', color: '#d4b896' },
    ],
    description: '<p>Sofa giường kéo đa năng, giải pháp thông minh cho không gian sống hiện đại. Ban ngày là sofa êm ái, ban đêm trở thành giường ngủ thoải mái.</p><p><strong>Kích thước sofa:</strong> D220 × R90 × C85cm</p><p><strong>Kích thước giường:</strong> D220 × R140cm</p><p><strong>Chất liệu bọc:</strong> Vải nỉ cao cấp, kháng bụi bẩn</p>',
  },
  {
    id: 'sofa-2-cho-ngoi',
    title: 'Sofa 2 chỗ ngồi',
    price: 4500000,
    comparePrice: 5200000,
    label: '-13%',
    image: 'https://product.hstatic.net/1000309459/product/sp9-1_a13a66828d904b0388e03b4b12fdbea0_b699f1d6595244148610a17d3a3393f9_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp9-2_5cbcdc59238643d4a639ccc4278a6492_5d000b4a82804cb1a20360b63ff50829_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp9-1_a13a66828d904b0388e03b4b12fdbea0_b699f1d6595244148610a17d3a3393f9_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp9-2_5cbcdc59238643d4a639ccc4278a6492_5d000b4a82804cb1a20360b63ff50829_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Xanh navy', value: 'Xanh navy', color: '#1a2a4a' },
      { name: 'Kem', value: 'Kem', color: '#f5e6d3' },
    ],
    description: '<p>Sofa 2 chỗ thiết kế Bắc Âu hiện đại, khung gỗ sồi chắc chắn, đệm cao su non thoải mái. Phù hợp cho phòng khách nhỏ và căn hộ studio.</p>',
  },
  {
    id: 'ghe-thu-gian-cao-cap',
    title: 'Ghế thư giãn cao cấp',
    price: 3200000,
    image: 'https://product.hstatic.net/1000309459/product/sp3_7641ce82bbb44d6098a62e1f19abcbc4_106bcea2d2044d62a16b15cc40331ed5_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp3_97f7ec448aae411f907b7ab4d04d0e52_fc6e8187831c46299c2e264d992aa10b_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp3_7641ce82bbb44d6098a62e1f19abcbc4_106bcea2d2044d62a16b15cc40331ed5_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp3_97f7ec448aae411f907b7ab4d04d0e52_fc6e8187831c46299c2e264d992aa10b_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Xám nhạt', value: 'Xám nhạt', color: '#d0d0d0' },
      { name: 'Đen', value: 'Đen', color: '#1a1a1a' },
    ],
    description: '<p>Ghế thư giãn cao cấp với thiết kế ergonomic, hỗ trợ tối ưu cho lưng và cổ. Lớp đệm memory foam thích ứng với hình dáng cơ thể.</p>',
  },
  {
    id: 'tu-sach-go-tu-nhien',
    title: 'Tủ sách gỗ tự nhiên',
    price: 5800000,
    comparePrice: 6500000,
    label: '-11%',
    image: 'https://product.hstatic.net/1000309459/product/sp6-1_fa3959f8d78047608cc52380bf7a5069_3e2dc22276ed4b41a4ac8afe7b00ce82_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp6-2_d93f18674a124e48879a4955599e68eb_d4d915e8243a4d2dade7353c059b31b8_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp6-1_fa3959f8d78047608cc52380bf7a5069_3e2dc22276ed4b41a4ac8afe7b00ce82_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp6-2_d93f18674a124e48879a4955599e68eb_d4d915e8243a4d2dade7353c059b31b8_master.jpg',
    ],
    category: 'Tất cả sản phẩm',
    categoryPath: '/collections/all',
    variants: [
      { name: 'Walnut', value: 'Walnut', color: '#5c4033' },
      { name: 'Tự nhiên', value: 'Tự nhiên', color: '#c8a97e' },
    ],
    description: '<p>Tủ sách gỗ tự nhiên 5 tầng, thiết kế mở thoáng đãng. Gỗ thông nguyên tấm được xử lý chống ẩm, có thể tháo lắp linh hoạt.</p>',
  },
  {
    id: 'loa-bluetooth-bo-beoplay',
    title: 'Loa Bluetooth B&O Beoplay',
    price: 4550000,
    image: 'https://product.hstatic.net/1000309459/product/sp2-1_ee610e766bb440738090133fd553280f_ff6e0900534d42ca805e7aa9f7e5578d_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp2-2_11b93fc9ba874d238bbaa87d233f0582_ac29fd9a659b4aa78682dd0372d4021e_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp2-1_ee610e766bb440738090133fd553280f_ff6e0900534d42ca805e7aa9f7e5578d_master.jpg',
      'https://product.hstatic.net/1000309459/product/sp2-2_11b93fc9ba874d238bbaa87d233f0582_ac29fd9a659b4aa78682dd0372d4021e_master.jpg',
    ],
    category: 'Đồ điện tử',
    categoryPath: '/collections/all',
    variants: [{ name: 'Trắng', value: 'Trắng', color: '#ffffff' }],
    description: '<p>Âm thanh trung thực, thiết kế tinh tế.</p>',
  },
  {
    id: 'ghe-tua-lung-phong-khach-s004',
    title: 'Ghế tựa lưng phòng khách S004',
    price: 2400000,
    comparePrice: 3200000,
    label: '-25%',
    image: 'https://product.hstatic.net/1000309459/product/sp10-1_bee2a9c0558d4324bf174ec4dca83071_d2c27994d7be4d71b388b3c9f95826c2_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/sp10-2_a745f85b63f5497793be87949deb1a7b_c4db0b6210d84546a55ae4a4faeaa8bf_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/sp10-1_bee2a9c0558d4324bf174ec4dca83071_d2c27994d7be4d71b388b3c9f95826c2_master.jpg',
    ],
    category: 'Nội thất phòng khách',
    categoryPath: '/collections/all',
    variants: [{ name: 'Xám', value: 'Xám', color: '#d2dae2' }],
    description: '<p>Ghế tựa lưng phong cách hiện đại.</p>',
  },
  {
    id: 'sofa-giuong-pvc-xuat-khau-so-226',
    title: 'Sofa giường PVC xuất khẩu SO-226',
    price: 4130000,
    comparePrice: 4359000,
    label: '-5%',
    image: 'https://product.hstatic.net/1000309459/product/pro17_a40384c66baa4040b9fecd033f111dec_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/pro17_a40384c66baa4040b9fecd033f111dec_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/pro17_a40384c66baa4040b9fecd033f111dec_master.jpg',
    ],
    category: 'Sofa',
    categoryPath: '/collections/all',
    variants: [{ name: 'Đen', value: 'Đen', color: '#000000' }],
    description: '<p>Sofa giường thông minh cho căn hộ nhỏ.</p>',
  },
  {
    id: 'ghe-van-phong-chan-xoay',
    title: 'Ghế Văn Phòng Chân Xoay',
    price: 969000,
    image: 'https://product.hstatic.net/1000309459/product/pro6_c3480a33e39042e599b90dfd098160df_grande.jpg',
    hoverImage: 'https://product.hstatic.net/1000309459/product/pro6_c3480a33e39042e599b90dfd098160df_grande.jpg',
    images: [
      'https://product.hstatic.net/1000309459/product/pro6_c3480a33e39042e599b90dfd098160df_master.jpg',
    ],
    category: 'Nội thất văn phòng',
    categoryPath: '/collections/all',
    variants: [{ name: 'Đen', value: 'Đen', color: '#000000' }],
    description: '<p>Hỗ trợ tư thế ngồi làm việc chuẩn.</p>',
  },
];

// Hàm tiện ích: tìm sản phẩm theo id
export function getProductById(id: string): ProductFull | undefined {
  if (!id) return undefined;
  const targetId = id.toString().trim().toLowerCase();
  return allProductsDB.find((p) => p.id.toLowerCase() === targetId);
}

// ============================================================
// Tập hợp cho ProductCard (type Product với price là number)
// ============================================================
export const newProducts: Product[] = allProductsDB.slice(0, 5).map((p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  comparePrice: p.comparePrice,
  label: p.label,
  soldOut: p.soldOut,
  image: p.image,
  hoverImage: p.hoverImage,
}));

export const bestSellerProducts: Product[] = allProductsDB.slice(1, 7).map((p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  comparePrice: p.comparePrice,
  label: p.label,
  soldOut: p.soldOut,
  image: p.image,
  hoverImage: p.hoverImage,
}));

export const allProducts: Product[] = allProductsDB.map((p) => ({
  id: p.id,
  title: p.title,
  price: p.price,
  comparePrice: p.comparePrice,
  label: p.label,
  soldOut: p.soldOut,
  image: p.image,
  hoverImage: p.hoverImage,
}));
