# 🔧 Hướng dẫn Debug Ứng dụng Mua sắm

## 🐛 Các vấn đề đã sửa

### 1. **Lỗi trang Hóa đơn**
- **Vấn đề**: `item.subtotal` không tồn tại
- **Giải pháp**: Thay bằng `item.price * item.qty`
- **File**: `app/invoice.tsx` line 126

### 2. **Lỗi xóa sản phẩm khỏi giỏ hàng**
- **Vấn đề**: ID comparison có thể không khớp
- **Giải pháp**: Thêm debug logs chi tiết
- **File**: `src/db/cart.repo.ts` function `removeFromCart()`

## 🧪 Cách Test

### **Bước 1: Mở ứng dụng**
```bash
cd /Users/admin/Desktop/Tuan9
npx expo start --web --port 8085
```
Mở: http://localhost:8085

### **Bước 2: Test Flow hoàn chỉnh**

#### **Test 1: Thêm sản phẩm vào giỏ**
1. Mở trang sản phẩm
2. Click "Thêm vào giỏ" trên bất kỳ sản phẩm nào
3. **Kiểm tra console logs:**
   ```
   🛒 Adding new item: {id: 1, name: "iPhone 15 Pro Max", ...}
   ```

#### **Test 2: Vào giỏ hàng**
1. Click "🛒 Giỏ hàng" trên header
2. **Kiểm tra console logs:**
   ```
   🛒 getAllCartItems - mockCartItems: [{id: 1, name: "iPhone 15 Pro Max", ...}]
   ```

#### **Test 3: Xóa sản phẩm**
1. Trong giỏ hàng, click "🗑️ Xóa"
2. Xác nhận "Xoá" trong dialog
3. **Kiểm tra console logs:**
   ```
   🗑️ ===== REMOVE FROM CART DEBUG =====
   🗑️ Removing item with id: 1 type: number
   🗑️ Current mockCartItems count: 1
   🗑️ Current items: [{id: 1, type: "number", name: "iPhone 15 Pro Max"}]
   🗑️ Comparing 1 (number) === 1 (number) = true
   🗑️ Index to remove: 0
   ✅ Item removed successfully: {id: 1, ...}
   🗑️ Before removal: 1 items
   🗑️ After removal: 0 items
   ```

#### **Test 4: Xem hóa đơn**
1. Thêm sản phẩm vào giỏ
2. Click "Xem hóa đơn →"
3. **Kiểm tra**: Không có lỗi `item.subtotal`
4. **Kiểm tra**: Hiển thị đúng giá tiền

## 🔍 Debug Steps

### **Nếu vẫn không xóa được:**

1. **Mở Developer Tools (F12)**
2. **Vào tab Console**
3. **Thực hiện test flow**
4. **Copy toàn bộ console logs**
5. **Gửi logs để debug thêm**

### **Logs mong đợi khi hoạt động đúng:**

```
🛒 Adding new item: {id: 1, product_id: "P001", qty: 1, name: "iPhone 15 Pro Max", price: 29990000, stock: 10}
🛒 getAllCartItems - mockCartItems: [{id: 1, product_id: "P001", qty: 1, name: "iPhone 15 Pro Max", price: 29990000, stock: 10}]
🗑️ ===== REMOVE FROM CART DEBUG =====
🗑️ Removing item with id: 1 type: number
🗑️ Current mockCartItems count: 1
🗑️ Current items: [{id: 1, type: "number", name: "iPhone 15 Pro Max"}]
🗑️ Comparing 1 (number) === 1 (number) = true
🗑️ Index to remove: 0
✅ Item removed successfully: {id: 1, product_id: "P001", qty: 1, name: "iPhone 15 Pro Max", price: 29990000, stock: 10}
🗑️ Before removal: 1 items
🗑️ After removal: 0 items
🗑️ ===== END REMOVE DEBUG =====
```

### **Nếu có lỗi:**

```
❌ Item not found with id: [ID]
❌ Available IDs: [1, 2, 3]
```

## 🚨 Troubleshooting

### **Lỗi "Cannot read properties of undefined"**
- **Nguyên nhân**: `item.subtotal` không tồn tại
- **Giải pháp**: Đã sửa thành `item.price * item.qty`

### **Lỗi "Item not found"**
- **Nguyên nhân**: ID không khớp
- **Giải pháp**: Kiểm tra console logs để xem ID thực tế

### **Lỗi SQLite trên web**
- **Bình thường**: SQLite không hoạt động trên web
- **Giải pháp**: Sử dụng mock data (đã implement)

## ✅ Kết quả mong đợi

Sau khi test:
1. **Thêm sản phẩm**: Console hiển thị "Adding new item"
2. **Vào giỏ hàng**: Hiển thị sản phẩm đã thêm
3. **Xóa sản phẩm**: Console hiển thị "Item removed successfully"
4. **Xem hóa đơn**: Không có lỗi, hiển thị đúng giá tiền
5. **Navigation**: Chuyển đổi mượt mà giữa các màn hình

## 📱 Test trên Mobile

Để test đầy đủ chức năng SQLite:
```bash
npx expo start
# Scan QR code với Expo Go app
```

**Lưu ý**: SQLite chỉ hoạt động trên mobile, không hoạt động trên web.
