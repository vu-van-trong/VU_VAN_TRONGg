/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  title: string;
  image: string;
  author: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '5-sai-lam-can-tranh-khi-mua-ban-ghe-sofa',
    title: '5 sai lầm cần tránh khi mua bàn ghế sofa',
    image: 'https://file.hstatic.net/1000309459/article/blog_4e734461181e4b3194609c4ea27d3af6_grande.jpg',
    author: 'modern furniture',
    date: '04.07.2021',
    category: 'Tin tức',
    excerpt: 'Hiện nay, nhu cầu chọn mua bàn ghế sofa đã dần trở nên phổ biến và được ưa chuộng nhiều hơn. Tuy nhiên, không phải ai cũng biết cách để chọn được một bộ sofa chất lượng...',
    content: `
      <p class="mb-4 text-gray-600 leading-relaxed">Hiện nay, nhu cầu chọn mua bàn ghế sofa đã dần trở nên phổ biến và được ưa chuộng nhiều hơn. Tuy nhiên, không phải ai cũng biết cách để chọn được một bộ sofa ưng ý và phù hợp nhất. Qua bài viết này, chúng tôi sẽ chỉ ra một số sai lầm mà mọi người thường mắc phải khi mua một bộ bàn ghế sofa. Modern Furniture cũng sẽ có những gợi ý để giúp bạn mua bộ ghế sofa chất lượng và phù hợp cho ngôi nhà của mình.</p>
      
      <h2 class="text-2xl font-black mt-10 mb-4 italic tracking-tight uppercase">Chọn kích thước bàn ghế sofa không phù hợp</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">Đây là sai lầm phổ biến và dễ mắc phải khi bạn chọn mua một bộ sofa mới cho ngôi nhà của mình. Sai lầm này xảy ra do bạn chưa đo đạc kĩ không gian bài trí của mình mà chỉ ước chừng hoặc chọn lựa theo cảm giác khi mua bàn ghế sofa. Dẫn đến việc bạn chọn một bộ sofa quá lớn hoặc quá nhỏ so với không gian nhà.</p>
      <p class="mb-4 text-gray-600 leading-relaxed">Ngoài việc đo đạc không gian bài trí để lựa chọn được bộ sofa phù hợp nhất. Bạn hãy chú ý đến những kích thước của các phần nội thất khác đang được bài trí tại đó. Việc này sẽ giúp bạn dễ dàng lựa chọn những bộ sofa với kích thước phù hợp nhất cho ngôi nhà của bạn. Hãy chắc chắn rằng bạn đã chừa đủ khoảng cách giữa bộ sofa và các phần xung quanh để có thể di chuyển một cách thoải mái.</p>

      <h2 class="text-2xl font-black mt-10 mb-4 italic tracking-tight uppercase">Mua bàn ghế sofa mà chưa có trải nghiệm thực tế sản phẩm</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">Cũng giống khi lựa chọn bộ sofa có kích thước phù hợp với không gian bài trí. Bạn không nên chọn mua bàn ghế sofa có kích thước không phù hợp với chính bản thân bạn. Việc này sẽ dẫn đến những trải nghiệm không thoải mái, thậm chí là khó chịu khi sử dụng sản phẩm.</p>
      <p class="mb-4 text-gray-600 leading-relaxed">Nếu có thể, bạn hãy đến trực tiếp các showroom, cửa hàng khi mua bàn ghế sofa để có được những trải nghiệm thực tế trên sản phẩm. Lựa chọn bộ sofa mà bạn cảm thấy thoải mái, dễ chịu nhất khi sử dụng.</p>

      <h2 class="text-2xl font-black mt-10 mb-4 italic tracking-tight uppercase">Chọn mua bộ ghế sofa không hợp tổng thể bài trí</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">Mỗi ngôi nhà, mỗi căn phòng sẽ có những phong cách chủ đạo khác nhau, thùy theo sở thích của mỗi người. Và việc bạn mua một bộ sofa có phong cách quá khác biệt so với phần còn lại của khu vực bài trí sẽ mang đến cho người nhìn cảm giác lạc lõng và khó chịu.</p>
      <p class="mb-4 text-gray-600 leading-relaxed">Bí quyết ở đây là nên chọn mua bộ bàn ghế sofa có ít nhất 1 đến 2 chi tiết có sự liên kết với tổng thể xung quanh. Bộ bàn ghế phải vừa thật sự ấn tượng, nhưng cũng phải hài hòa với tổng thể không gian bài trí.</p>

      <h2 class="text-2xl font-black mt-10 mb-4 italic tracking-tight uppercase">Chọn chất liệu của bộ sofa không phù hợp</h2>
      <p class="mb-4 text-gray-600 leading-relaxed">Phòng khách ngoài trời đã không còn quá xa lạ đối với con người hiện đại. Tuy nhiên, không phải bộ ghế sofa nào cũng phù hợp với khu vực ngoài trời. Lựa chọn sai chất liệu làm nên bộ bàn ghế sẽ dẫn đến các tình trạng biến dạng, hư hỏng sau thời gian ngắn sử dụng.</p>
      <p class="mb-4 text-gray-600 leading-relaxed">Hãy chọn mua những bộ sofa với chất liệu chuyên dụng cho nội thất ngoài trời, ngoại thất. Nổi bật trong số đó phải kể đến vật liệu mây nhựa cao cấp.</p>

      <h2 class="text-2xl font-black mt-10 mb-4 italic tracking-tight uppercase">Chọn mua sofa giá rẻ thay vì chất lượng</h2>
      <p class="mb-6 text-gray-600 leading-relaxed">Tuy giá cả cũng là 1 tiêu chí quan trọng, nhưng không nên vì thế mà bạn bỏ qua các yếu tố về chất lượng. Các nhà sản xuất nội thất uy tín sẽ luôn tìm cách cân bằng giá thành và chất lượng của sản phẩm để tạo nên mức giá cạnh tranh nhất. Một gợi ý nhỏ cho bạn: Hãy đặt ra một khoảng chi phí phù hợp với bạn trước khi chọn mua bàn ghế sofa và tìm các giải pháp từ những nhà sản xuất nội thất uy tín.</p>
    `
  },
  {
    id: 'bai-viet-mau-3',
    title: 'Bài viết mẫu 3',
    image: 'https://file.hstatic.net/1000309459/article/ssfdf_grande.jpg',
    author: 'Duyên Nguyễn',
    date: '20.08.2018',
    category: 'Tin tức',
    excerpt: 'Đây là trang blog của cửa hàng. Bạn có thể dùng blog để quảng bá sản phẩm mới, chia sẻ trải nghiệm của khách hàng, hoặc cung cấp các mẹo nhỏ về nội thất...',
    content: `
      <p class="mb-4 text-gray-600 leading-relaxed">Đây là trang blog của cửa hàng. Bạn có thể dùng blog để quảng bá sản phẩm mới, chia sẻ trải nghiệm của khách hàng, các mẹo mua hàng hoặc bất kì điều gì bạn muốn chia sẻ.</p>
      <p class="text-gray-600 italic">Làm thế nào để chỉnh sửa hoặc xóa bài viết này? Bạn có thể chỉnh sửa hoặc xoá bài viết này tại trang quản lý hoặc thêm những bài viết mới trong phần quản lý Blog.</p>
    `
  },
  {
    id: 'bai-viet-mau-2',
    title: 'Bài viết mẫu 2',
    image: 'https://file.hstatic.net/1000309459/article/sfsd_grande.jpg',
    author: 'Duyên Nguyễn',
    date: '20.08.2018',
    category: 'Tin tức',
    excerpt: 'Chia sẻ các xu hướng thiết kế nội thất mới nhất năm nay. Tìm hiểu cách tối ưu không gian sống với những món đồ nội thất thông minh và phong cách...',
    content: `
      <p class="mb-4 text-gray-600 leading-relaxed">Nội thất phong cách hiện đại đang lên ngôi. Bài viết này hướng dẫn bạn cách chọn màu sắc và bố cục cho căn hộ chung cư diện tích nhỏ.</p>
      <p class="text-gray-600">Hãy cùng Modern Furniture khám phá những bộ sưu tập mới nhất vừa được cập bến tại showroom.</p>
    `
  },
  {
    id: '1-bai-viet-mau',
    title: 'Bài viết mẫu',
    image: 'https://file.hstatic.net/1000309459/article/ferm-living-autumn-winter-2016-banner_grande.jpg',
    author: 'modern furniture',
    date: '20.08.2018',
    category: 'Tin tức',
    excerpt: 'Kinh nghiệm trang trí phòng khách đẹp mắt và ấm cúng. Làm thế nào để phối hợp màu sắc sơn tường với màu gỗ của bàn ghế để tạo nên một không gian hoàn hảo...',
    content: `
      <p class="mb-4 text-gray-600 leading-relaxed">Không gian sống phản ánh phong cách của bạn. Lựa chọn một chiếc ghế sofa phù hợp không chỉ mang lại sự thoải mái mà còn là điểm nhấn nghệ thuật cho phòng khách.</p>
      <p class="text-gray-600">Chúng tôi cung cấp các giải pháp thiết kế trọn gói cho ngôi nhà của bạn.</p>
    `
  }
];

export const categories = [
  { name: 'Trang chủ', links: ['Sản phẩm nổi bật', 'Khuyến mãi', 'Sản phẩm mới'] },
  { name: 'Header', links: ['Header Style 01', 'Header Style 02', 'Header Style 03'] },
  { name: 'Sản phẩm', links: ['Nội thất phòng khách', 'Nội thất phòng ngủ', 'Nội thất bếp'] },
  { name: 'Product Views', links: ['Kiểu hiển thị 1', 'Kiểu hiển thị 2', 'Kiểu hiển thị 3'] }
];