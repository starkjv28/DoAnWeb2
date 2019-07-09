LTWeb 2 - Đồ án cuối kỳ
CD2016/3
Chú ý
• Đồ án làm theo nhóm 4 thành viên theo link đăng ký nhóm
• Mã nguồn phải được cập nhật trên Github được GVLT cung cấp (-4 điểm)
• Nộp đồ án trên moodle, hạn chót trước thi lý thuyết (vấn đáp)
• Đặt tên file: xx_MSSV1_MSSV2_MSSV3_MSSV4.zip/rar trong đó xx là mã nhóm trong
danh sách nhóm được công bố
• Triển khai trên Heroku hoặc VPS
• Sử dụng Node.js và các module cần thiết, CSDL Postgres/MySQL, Bootstrap hoặc
React/Vue
Yêu cầu
• Xây dựng website đặt vé xem phim
• Hệ thống rạp phim bao gồm nhiều cụm rạp, mỗi cụm rạp bao gồm nhiều rạp chiếu khác
nhau
• Mỗi rạp có một cấu hình ghế theo hình chữ nhật: hàng A-Z, cột 1-n
• Mỗi phim được chiếu ở hệ thống rạp bao gồm nhiều suất chiếu khác nhau tại nhiều cụm
rạp khác nhau
• Người dùng phải đăng nhập vào tài khoản để đặt vé
• Mỗi đặt vé có thể bao gồm nhiều ghế khác nhau của một suất chiếu
• Không thể đặt trùng ghế tại cùng một suất chiếu, đặt chỗ phải xác nhận TẤT CẢ các ghế
thành công hoặc thất bại (gợi ý: sử dụng SQL transaction)
• Quản lý cụm rạp, rạp, phim, suất chiếu và thống kê doanh thu (cụm rạp, phim)
• Gửi email thông báo (mã vé, thông tin suất chiếu) sau khi đặt vé thành công
Chức năng
Người dùng
• Đăng ký (xác nhận email), đăng nhập, đăng xuất (email, mật khẩu), quên mật khẩu bằng
email
o Điểm cộng: đăng nhập bằng Google, Facebook
• Quản lý thông tin cá nhân (email, mật khẩu, họ tên, số điện thoại)
• Trang chủ hiển thị các phim mới được công chiếu và phim được xem nhiều nhất
• Tìm các suất chiếu của một phim theo cụm rạp hoặc tìm các suất chiếu của tất cả các
phim tại một rạp nào đó
o Điểm cộng: Hiển thị thông tin chi tiết phim (giới thiệu, trailer)
o Điểm cộng: Hiển thị thông tin chi tiết cụm rạp chiếu phim (hình ảnh giới thiệu,
các rạp có trong cụm, bản đồ Google Maps dựa vào địa chỉ)
• Đặt vé xem phim (chọn suất chiếu, chọn ghế, xác nhận)
o Điểm cộng: Gửi thông tin vé qua SMS
o Điểm cộng: Tích hợp cổng thanh toán (Paypal, Momo, ZaloPay, Grab…)
o Điểm cộng: Barcode/QRCode cho đặt chỗ
• Xem lại các danh sách các đặt vé trong lịch sử (ngày/giờ, phim, rạp/cụm rạp, ghế)
Quản lý
• Có phần đăng nhập riêng, có thể sử dụng chung hoặc riêng hệ thống người dùng
• Quản lý (thêm/xóa) rạp (tên, cấu hình ghế), cụm rạp (tên, địa chỉ), phim (tên, thời lượng,
hình ảnh poster, ngày công chiếu), suất chiếu (rạp, thời điểm bắt đầu, thời điểm kết
thúc)
o Điểm cộng: Nhiều hình ảnh cho một phim, giới thiệu, trailer
• Thống kê doanh thu theo cụm rạp trong khoảng thời gian do người dùng nhập
o Cụm rạp CGV Hùng Vương bán được 2400 vé với doanh thu 500.000.000 VND từ
ngày 01/03/2019 đến 30/04/2019
o Cụm rạp CGV Parkson…
o Điểm cộng: Hiển thị dạng biểu đồ (chart)
• Thông kê doanh thu theo phim trong khoảng thời gian do người dùng nhập
o Phim Avenger: Endgame bán được 50000 vé với doanh thu 20.000.000.000 VND
từ ngày 25/04/2019 đến 10/05/2019
o Điểm cộng: Hiển thị dạng biểu đồ (chart)
Gợi ý thiết kế CSDL
• Người dùng:
o ID
o Email
o Mật khẩu (mã hóa)
o Họ tên
o Số điện thoại
o Vai trò (người dùng/quản lý) hoặc sử dụng bảng quản lý riêng
• Cụm rạp:
o ID
o Tên
o Địa chỉ
• Rạp:
o ID
o Tên
o ID cụm rạp
o Loại rạp (2D, 3D, 4DX…)
o Kích thước chiều ngang
o Kích thước chiều dọc
• Phim:
o ID
o Tên
o Ngày công chiếu
o Poster hình ảnh
o Thời lượng
• Suất chiếu:
o ID Phim, ID Rạp
o Thời điểm bắt đầu (ngày, giờ)
o Thời điểm kết thúc (ngày, giờ)
o Giá vé
• Đặt chỗ (booking):
o ID (thay thế ID tăng dần bằng ID ngẫu nhiên, UUID)
o ID người dùng
o ID suất chiếu
o Thời điểm đặt vé
o Tổng tiền
• Vé (ticket/voucher):
o ID (thay thế ID tăng dần bằng ID ngẫu nhiên, UUID)
o ID đặt chỗ
o Mã ghế (E8)
o (Địa chỉ ngang)
o (Địa chỉ dọc)
o Giá tiền
