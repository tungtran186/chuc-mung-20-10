HƯỚNG DẪN THÊM VÀ THAY ĐỔI ẢNH KỶ NIỆM:
==========================================

Mặc định, trang web đã tạo sẵn 4 bức ảnh tuyệt đẹp trong thư mục này:
- anh1.jpg (Chân dung rạng ngời ngày 20/10)
- anh2.jpg (Bó hoa mẫu đơn và hoa sứ quý phái)
- anh3.jpg (Áo dài hồng truyền thống thanh lịch)
- anh4.jpg (Hộp quà kỷ niệm và nến thơm ấm áp)

CÁCH THAY ẢNH CỦA BẠN:
1. Bạn chỉ cần chép các bức ảnh của bạn hoặc đồng nghiệp, bạn bè vào thư mục này.
2. Đặt tên file là anh1.jpg, anh2.jpg, anh3.jpg, anh4.jpg (hoặc đặt tên bất kỳ rồi vào đầu file script.js sửa trong danh sách PHOTOS).
3. Bạn có thể thêm bao nhiêu ảnh tùy thích trong danh sách PHOTOS ở file script.js:
   const PHOTOS = [
     { src: "images/anh1.jpg", caption: "Nụ cười rạng rỡ 🌸" },
     { src: "images/anh2.jpg", caption: "Xinh đẹp và tự tin ✨" },
     ...
   ];

Web tự động hỗ trợ lazy loading, hiển thị polaroid nghiêng nghệ thuật, và bấm vào để xem ảnh lớn (Lightbox phóng to).
