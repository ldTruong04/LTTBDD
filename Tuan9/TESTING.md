# Hướng dẫn Test Ứng dụng Mua sắm Online

## 🚀 Cách chạy ứng dụng

### 1. Chạy trên Web (Demo)
```bash
cd /Users/admin/Desktop/Tuan9
npx expo start --web --port 8083
```
Mở: http://localhost:8083

### 2. Chạy trên Mobile (Đầy đủ chức năng)
```bash
cd /Users/admin/Desktop/Tuan9
npx expo start
```
Scan QR code với Expo Go app

## 📱 Test Cases

### ✅ Test Case 1: Trang Sản phẩm
1. **Mở ứng dụng** → Hiển thị danh sách 6 sản phẩm
2. **Kiểm tra thông tin**: Tên, giá, tồn kho
3. **Thêm vào giỏ**: Click "Thêm vào giỏ" → Alert "Thành công"
4. **Kiểm tra giỏ hàng**: Số lượng items hiển thị trên header

### ✅ Test Case 2: Trang Giỏ hàng
1. **Vào giỏ hàng**: Click "Giỏ hàng" hoặc icon giỏ
2. **Kiểm tra items**: Hiển thị sản phẩm đã thêm
3. **Tăng số lượng**: Click nút "+" → Số lượng tăng
4. **Giảm số lượng**: Click nút "-" → Số lượng giảm
5. **Xóa sản phẩm**: Click "🗑️ Xóa" → Xác nhận → Sản phẩm biến mất
6. **Tính tổng**: Tổng tiền cập nhật theo số lượng

### ✅ Test Case 3: Trang Hóa đơn
1. **Vào hóa đơn**: Click "Xem hóa đơn" từ giỏ hàng
2. **Kiểm tra chi tiết**: Danh sách sản phẩm, số lượng, giá
3. **Tính VAT**: VAT = 10% của tổng tiền
4. **Tổng cộng**: Tạm tính + VAT
5. **Thanh toán**: Click "Thanh toán" → Xác nhận → Giỏ hàng trống

### ✅ Test Case 4: Navigation
1. **Quay lại**: Từ giỏ hàng → Trang sản phẩm
2. **Quay lại**: Từ hóa đơn → Trang giỏ hàng
3. **Tiếp tục mua sắm**: Từ giỏ hàng trống → Trang sản phẩm

## 🐛 Các lỗi đã sửa

### ❌ Lỗi cũ: `Cannot read properties of undefined (reading 'toLocaleString')`
**Nguyên nhân**: Mock data thiếu thông tin sản phẩm
**Giải pháp**: 
- Cập nhật mock data với thông tin sản phẩm đầy đủ
- Thêm validation cho `formatCurrency`
- Sửa `item.subtotal` thành `item.price * item.qty`

### ❌ Lỗi cũ: `SharedArrayBuffer is not defined`
**Nguyên nhân**: SQLite không hỗ trợ web platform
**Giải pháp**: 
- Thêm fallback mechanism cho web
- Sử dụng mock storage thay vì SQLite
- Platform detection với `Platform.OS === 'web'`

## 📊 Dữ liệu mẫu

### Sản phẩm có sẵn:
1. **iPhone 15 Pro Max** - 29,990,000 ₫ (Tồn: 10)
2. **Samsung Galaxy S24** - 22,990,000 ₫ (Tồn: 15)
3. **MacBook Pro M3** - 52,990,000 ₫ (Tồn: 5)
4. **iPad Air** - 15,990,000 ₫ (Tồn: 20)
5. **AirPods Pro** - 6,490,000 ₫ (Tồn: 30)
6. **Apple Watch Series 9** - 10,990,000 ₫ (Tồn: 12)

## 🔧 Troubleshooting

### Lỗi "Port already in use"
```bash
pkill -f "expo start"
npx expo start --web --port 8083
```

### Lỗi "Cannot resolve entry file"
```bash
npx expo start --clear
```

### Lỗi SQLite trên web
- **Bình thường**: SQLite không hoạt động trên web
- **Giải pháp**: Sử dụng mock data (đã implement)

## ✅ Checklist Test

- [ ] Ứng dụng khởi động không lỗi
- [ ] Hiển thị danh sách sản phẩm
- [ ] Thêm sản phẩm vào giỏ thành công
- [ ] Giỏ hàng hiển thị đúng items
- [ ] Tăng/giảm số lượng hoạt động
- [ ] Xóa sản phẩm khỏi giỏ
- [ ] Hóa đơn tính toán đúng
- [ ] Navigation giữa các màn hình
- [ ] Format tiền tệ hiển thị đúng
- [ ] Không có lỗi console

## 🎯 Kết quả mong đợi

Sau khi test, ứng dụng sẽ:
1. **Hoạt động mượt mà** trên cả web và mobile
2. **Dữ liệu bền vững** (SQLite trên mobile, mock trên web)
3. **UI/UX tốt** với navigation rõ ràng
4. **Tính toán chính xác** giá tiền và VAT
5. **Không có lỗi** trong console
