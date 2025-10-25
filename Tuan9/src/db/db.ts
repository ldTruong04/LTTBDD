/**
Khởi tạo và quản lý kết nối SQLite database
 */

import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

// Tên database
const DB_NAME = 'shopping.db';

// Mock data cho web platform
const MOCK_PRODUCTS = [
  { product_id: 'P001', name: 'iPhone 17 Pro Max', price: 19990000, stock: 99 },
  { product_id: 'P002', name: 'VinSmart', price: 15990000, stock: 30 },
  { product_id: 'P003', name: 'AirPods Pro', price: 999000, stock: 199 },
  { product_id: 'P004', name: 'MacBook Pro M4', price: 2990000, stock: 29 },
  { product_id: 'P005', name: 'iPad Air M2', price: 6990000, stock: 999 },
  { product_id: 'P006', name: 'Samsung Galaxy S27 Ultra', price: 9990000, stock: 19 },
  { product_id: 'P008', name: 'Samsung Galaxy', price: 999000, stock: 199 },
  { product_id: 'P007', name: 'Apple Watch ', price: 10990000, stock: 50 },
  { product_id: 'P009', name: 'iPhone Air', price: 15990000, stock: 19 },
];

// Deduplicate mock products by product_id (giữ bản cuối cùng nếu có trùng)
const UNIQUE_MOCK_PRODUCTS = Array.from(
  new Map(MOCK_PRODUCTS.map(p => [p.product_id, p])).values()
);

// Mock storage cho web
let mockCartItems: any[] = [];

/**
 * Mở kết nối đến database
 * @returns SQLiteDatabase instance hoặc mock object
 */
export function openDatabase() {
  // Trên web platform, sử dụng mock storage
  if (Platform.OS === 'web') {
    return {
      execSync: () => {},
      runSync: () => {},
      getFirstSync: () => null,
      getAllSync: () => [],
    };
  }
  
  const db = SQLite.openDatabaseSync(DB_NAME);
  return db;
}

/**
 * Khởi tạo các bảng trong database
 * Gọi hàm này khi app khởi động lần đầu
 */
export async function initDatabase() {
  // Trên web platform, không cần khởi tạo database
  if (Platform.OS === 'web') {
    console.log('🌐 Web platform detected - using mock data');
    return;
  }
  
  const db = openDatabase();

  db.execSync(`
    CREATE TABLE IF NOT EXISTS products (
      product_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK(price >= 0),
      stock INTEGER NOT NULL CHECK(stock >= 0)
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id TEXT NOT NULL,
      qty INTEGER NOT NULL CHECK(qty > 0),
      UNIQUE(product_id),
      FOREIGN KEY(product_id) REFERENCES products(product_id)
    );
  `);

  console.log('✅ Database initialized successfully');
}

/**
 * Seed dữ liệu mẫu cho bảng products
 * Gọi hàm này sau khi init database
 */
export async function seedProducts() {
  // Trên web platform, không cần seed vì dùng mock data
  if (Platform.OS === 'web') {
    console.log('🌐 Web platform - using mock data, no seeding needed');
    return;
  }
  
  const db = openDatabase();

  // Kiểm tra xem đã có dữ liệu chưa
  const result = db.getFirstSync<{ count: number }>('SELECT COUNT(*) as count FROM products');
  
  if (result && result.count > 0) {
    console.log('📦 Products already seeded, count:', result.count);
    return;
  }
  
  console.log('🌱 Seeding products data...');

  const products = UNIQUE_MOCK_PRODUCTS;

  for (const product of products) {
    db.runSync(
      'INSERT INTO products (product_id, name, price, stock) VALUES (?, ?, ?, ?)',
      [product.product_id, product.name, product.price, product.stock]
    );
  }

  console.log('✅ Products seeded successfully');
}

/**
 * Helper: Xoá toàn bộ dữ liệu trong database (để test)
 */
export async function clearDatabase() {
  const db = openDatabase();
  db.execSync('DELETE FROM cart_items');
  db.execSync('DELETE FROM products');
  console.log('🗑️  Database cleared');
}