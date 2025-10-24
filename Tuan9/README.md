# Ứng dụng Mua sắm Online - Expo + SQLite

## Mô tả
Ứng dụng React Native sử dụng Expo, expo-router và SQLite để xây dựng hệ thống mua sắm online với các chức năng:
- Danh sách sản phẩm
- Thêm vào giỏ hàng
- Quản lý giỏ hàng
- Tạo hóa đơn

## Cấu trúc dự án
```
shopping-sqlite/
├── app/                    # Expo Router pages
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Trang sản phẩm
│   ├── cart.tsx           # Trang giỏ hàng
│   └── invoice.tsx        # Trang hóa đơn
├── src/
│   ├── db/                # Database layer
│   │   ├── db.ts          # Database setup
│   │   ├── product.repo.ts # Product queries
│   │   └── cart.repo.ts   # Cart queries
│   └── models/
│       └── types.ts       # TypeScript types
└── package.json
```

## Cài đặt và chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Chạy ứng dụng
```bash
# Khởi động development server
npx expo start

# Chạy trên Android
npx expo start --android

# Chạy trên iOS
npx expo start --ios

# Chạy trên web (có giới hạn với SQLite)
npx expo start --web
```

## Tính năng

### 1. Trang Sản phẩm (`/`)
- Hiển thị danh sách sản phẩm từ database
- Thông tin: tên, giá, tồn kho
- Nút "Thêm vào giỏ" cho mỗi sản phẩm
- Kiểm tra tồn kho trước khi thêm

### 2. Trang Giỏ hàng (`/cart`)
- Hiển thị các sản phẩm đã thêm
- Tăng/giảm số lượng
- Xóa sản phẩm khỏi giỏ
- Tính tổng tiền tạm tính
- Nút "Xem hóa đơn"

### 3. Trang Hóa đơn (`/invoice`)
- Hiển thị chi tiết đơn hàng
- Tính VAT (10%)
- Tổng tiền cuối cùng
- Nút "Thanh toán" để hoàn tất

## Database Schema

### Bảng `products`
```sql
CREATE TABLE products (
  product_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL NOT NULL CHECK(price >= 0),
  stock INTEGER NOT NULL CHECK(stock >= 0)
);
```

### Bảng `cart_items`
```sql
CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id TEXT NOT NULL,
  qty INTEGER NOT NULL CHECK(qty > 0),
  UNIQUE(product_id),
  FOREIGN KEY(product_id) REFERENCES products(product_id)
);
```

## Lưu ý quan trọng

⚠️ **SQLite chỉ hoạt động trên mobile platforms (Android/iOS)**
- Không thể chạy đầy đủ chức năng trên web
- Để test đầy đủ, sử dụng Expo Go app trên điện thoại

## Công nghệ sử dụng
- **Expo SDK 54**
- **React Native 0.81.5**
- **expo-router** - File-based routing
- **expo-sqlite** - SQLite database
- **TypeScript** - Type safety
- **React Native Safe Area Context** - Safe area handling

## Troubleshooting

### Lỗi "Cannot resolve entry file"
```bash
# Dọn dẹp cache và khởi động lại
npx expo start --clear
```

### Lỗi SQLite trên web
- SQLite không hỗ trợ web platform
- Sử dụng Expo Go app trên mobile để test đầy đủ

### Lỗi "react-native-web"
```bash
# Cài đặt react-native-web
npm install react-native-web
```

## Demo Flow
1. Mở app → Database tự động khởi tạo với dữ liệu mẫu
2. Xem danh sách sản phẩm → Thêm vào giỏ
3. Vào giỏ hàng → Điều chỉnh số lượng
4. Xem hóa đơn → Thanh toán
5. Dữ liệu được lưu bền vững trong SQLite
