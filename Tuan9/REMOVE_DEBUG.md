# Debug Hướng dẫn Test Chức năng Xóa Sản phẩm

## 🐛 Vấn đề
Không thể xóa sản phẩm khỏi giỏ hàng

## 🔧 Các sửa đổi đã thực hiện

### 1. **Cải thiện ID Generation**
- Thay `Date.now()` bằng sequential ID (`nextId++`)
- Đảm bảo ID nhất quán và dễ debug

### 2. **Thêm Debug Logs**
- Log chi tiết trong `handleRemove()`
- Log chi tiết trong `removeFromCart()`
- Hiển thị ID, type, và quá trình so sánh

### 3. **Cải thiện Logic Remove**
- Sử dụng `findIndex()` thay vì `filter()`
- Sử dụng `splice()` để xóa chính xác
- Thêm validation và error handling

## 🧪 Cách Test

### Bước 1: Mở Ứng dụng
```bash
cd /Users/admin/Desktop/Tuan9
npx expo start --web --port 8084
```
Mở: http://localhost:8084

### Bước 2: Test Flow
1. **Thêm sản phẩm vào giỏ**
   - Click "Thêm vào giỏ" trên bất kỳ sản phẩm nào
   - Kiểm tra console: `🛒 Adding new item: {...}`

2. **Vào giỏ hàng**
   - Click "Giỏ hàng" hoặc icon giỏ
   - Kiểm tra sản phẩm hiển thị

3. **Test xóa sản phẩm**
   - Click nút "🗑️ Xóa" trên sản phẩm
   - Xác nhận "Xoá" trong dialog
   - **Kiểm tra console logs:**

### Bước 3: Kiểm tra Console Logs

#### ✅ Logs mong đợi khi xóa thành công:
```
🗑️ handleRemove called with item: {id: 1, name: "iPhone 15 Pro Max", ...}
🗑️ item.id: 1 type: number
🗑️ Calling removeFromCart with id: 1
🗑️ Removing item with id: 1 type: number
🗑️ Current mockCartItems: [{id: 1, type: "number"}]
🗑️ Index to remove: 0
✅ Item removed successfully
🗑️ Before removal: 1 items
🗑️ After removal: 0 items
```

#### ❌ Logs nếu có lỗi:
```
🗑️ Item not found with id: [ID]
```

## 🔍 Debug Steps

### Nếu vẫn không xóa được:

1. **Kiểm tra ID Type**
   - Đảm bảo `item.id` là `number`
   - Không phải `string` hoặc `undefined`

2. **Kiểm tra MockCartItems**
   - Xem có items nào trong array không
   - Kiểm tra ID có khớp không

3. **Kiểm tra Platform Detection**
   - Đảm bảo `Platform.OS === 'web'` trả về `true`
   - Nếu không, sẽ dùng SQLite thay vì mock data

## 🛠️ Các sửa đổi code chính

### `src/db/cart.repo.ts`:
```javascript
// Sequential ID thay vì Date.now()
let nextId = 1;
const newItem = {
  id: nextId++, // Sequential ID
  // ...
};

// Cải thiện removeFromCart
const indexToRemove = mockCartItems.findIndex(item => item.id === id);
if (indexToRemove !== -1) {
  mockCartItems.splice(indexToRemove, 1);
}
```

### `app/cart.tsx`:
```javascript
// Thêm debug logs
console.log('🗑️ handleRemove called with item:', item);
console.log('🗑️ item.id:', item.id, 'type:', typeof item.id);
```

## ✅ Kết quả mong đợi

Sau khi test:
1. **Sản phẩm được xóa** khỏi giỏ hàng
2. **UI cập nhật** ngay lập tức
3. **Console logs** hiển thị quá trình xóa
4. **Không có lỗi** trong console

## 🚨 Nếu vẫn có lỗi

Gửi console logs để debug thêm:
1. Copy toàn bộ console logs khi test
2. Gửi kèm thông tin:
   - Platform (web/mobile)
   - Browser (nếu web)
   - Steps để reproduce
