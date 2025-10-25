/**
 * File: src/db/cart.repo.ts
 * Mô tả: Các hàm truy vấn cho bảng cart_items
 */

import { CartItem, InvoiceItem } from '../models/types';
import { openDatabase } from './db';
import { Platform } from 'react-native';

// Mock storage cho web platform
let mockCartItems: any[] = [];
let nextId = 1;
let mockOrders: any[] = []; // Lưu lịch sử order trên web

// Mock products data
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

// Deduplicate mock products to avoid duplicate product_id
const UNIQUE_MOCK_PRODUCTS = Array.from(
  new Map(MOCK_PRODUCTS.map(p => [p.product_id, p])).values()
);

/**
 * Lấy tất cả các mặt hàng trong giỏ
 * @returns Mảng các mặt hàng trong giỏ
 */
export function getAllCartItems(): any[] {
  // Trên web platform, trả về mock data
  if (Platform.OS === 'web') {
    console.log('🛒 getAllCartItems - mockCartItems:', mockCartItems);
    return mockCartItems;
  }
  
  const db = openDatabase();
  
  try {
    const result = db.getAllSync(`
      SELECT ci.*, p.name, p.price, p.stock 
      FROM cart_items ci 
      JOIN products p ON ci.product_id = p.product_id 
      ORDER BY p.name
    `) as any[];
    return result;
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
}

/**
 * Thêm sản phẩm vào giỏ hàng
 * @param productId ID sản phẩm
 * @param qty Số lượng (mặc định 1)
 */
export function addToCart(productId: string, qty: number = 1): void {
  // Trên web platform, sử dụng mock storage
  if (Platform.OS === 'web') {
    const existingItem = mockCartItems.find(item => item.product_id === productId);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      // Tìm thông tin sản phẩm từ mock data
      const product = UNIQUE_MOCK_PRODUCTS.find(p => p.product_id === productId);
      if (product) {
        const newItem = {
          id: nextId++, // Sequential ID
          product_id: productId,
          qty: qty,
          name: product.name,
          price: product.price,
          stock: product.stock,
        };
        console.log('🛒 Adding new item:', newItem);
        mockCartItems.push(newItem);
      }
    }
    return;
  }
  
  const db = openDatabase();
  
  try {
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingItem = db.getFirstSync('SELECT qty FROM cart_items WHERE product_id = ?', [productId]) as any;
    
    if (existingItem) {
      // Nếu đã có, tăng số lượng
      const currentQty = existingItem.qty;
      const newQty = currentQty + qty;
      db.runSync('UPDATE cart_items SET qty = ? WHERE product_id = ?', [newQty, productId]);
    } else {
      // Nếu chưa có, thêm mới
      db.runSync('INSERT INTO cart_items (product_id, qty) VALUES (?, ?)', [productId, qty]);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
}

/**
 * Cập nhật số lượng sản phẩm trong giỏ
 * @param id ID của cart item
 * @param qty Số lượng mới
 */
export function updateCartItemQty(id: number, qty: number): void {
  // Trên web platform, cập nhật mock data
  if (Platform.OS === 'web') {
    const item = mockCartItems.find(item => item.id === id);
    if (item) {
      if (qty <= 0) {
        // Xóa item nếu qty <= 0
        mockCartItems = mockCartItems.filter(item => item.id !== id);
      } else {
        item.qty = qty;
      }
    }
    return;
  }
  
  const db = openDatabase();
  
  try {
    if (qty <= 0) {
      // Xóa item nếu qty <= 0
      db.runSync('DELETE FROM cart_items WHERE id = ?', [id]);
    } else {
      db.runSync('UPDATE cart_items SET qty = ? WHERE id = ?', [qty, id]);
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 * @param id ID của cart item
 */
export function removeFromCart(id: number): void {
  // Trên web platform, xóa khỏi mock data
  if (Platform.OS === 'web') {
    console.log('🗑️ ===== REMOVE FROM CART DEBUG =====');
    console.log('🗑️ Removing item with id:', id, 'type:', typeof id);
    console.log('🗑️ Current mockCartItems count:', mockCartItems.length);
    console.log('🗑️ Current items:', mockCartItems.map(item => ({ 
      id: item.id, 
      type: typeof item.id, 
      name: item.name 
    })));
    
    const beforeLength = mockCartItems.length;
    
    // Thử nhiều cách so sánh
    const indexToRemove = mockCartItems.findIndex(item => {
      const match = item.id === id;
      console.log(`🗑️ Comparing ${item.id} (${typeof item.id}) === ${id} (${typeof id}) = ${match}`);
      return match;
    });
    
    console.log('🗑️ Index to remove:', indexToRemove);
    
    if (indexToRemove !== -1) {
      const removedItem = mockCartItems.splice(indexToRemove, 1)[0];
      console.log('✅ Item removed successfully:', removedItem);
    } else {
      console.log('❌ Item not found with id:', id);
      console.log('❌ Available IDs:', mockCartItems.map(item => item.id));
    }
    
    console.log('🗑️ Before removal:', beforeLength, 'items');
    console.log('🗑️ After removal:', mockCartItems.length, 'items');
    console.log('🗑️ ===== END REMOVE DEBUG =====');
    return;
  }
  
  const db = openDatabase();
  
  try {
    db.runSync('DELETE FROM cart_items WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
}

/**
 * Xóa tất cả sản phẩm khỏi giỏ hàng
 */
export function clearCart(): void {
  // Trên web platform, xóa mock data
  if (Platform.OS === 'web') {
    mockCartItems = [];
    return;
  }
  
  const db = openDatabase();
  
  try {
    db.runSync('DELETE FROM cart_items');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
}

/**
 * Tạo ID đơn hàng đơn giản
 */
const generateOrderId = () => `ORD_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

/**
 * Thanh toán: trừ tồn kho, lưu order + order_items, clear giỏ
 * Trả về orderId khi thành công.
 */
export async function checkoutCart(): Promise<{ orderId: string }> {
  try {
    const items = getAllCartItems() || [];
    if (!items || items.length === 0) {
      throw new Error('Giỏ hàng trống');
    }

    // Tính tổng
    const total = items.reduce((s: number, it: any) => s + (Number(it.price || 0) * Number(it.qty || 0)), 0);
    const orderId = generateOrderId();

    // Web: cập nhật mock products, lưu mockOrders, clear mockCartItems
    if (Platform.OS === 'web') {
      // Kiểm tra tồn kho trước
      for (const it of items) {
        const prod = UNIQUE_MOCK_PRODUCTS.find(p => p.product_id === it.product_id);
        if (!prod) throw new Error(`Sản phẩm ${it.product_id} không tồn tại`);
        if (prod.stock < (it.qty || 0)) throw new Error(`Sản phẩm ${prod.name} không đủ tồn kho`);
      }

      // Trừ tồn kho
      for (const it of items) {
        const prod = UNIQUE_MOCK_PRODUCTS.find(p => p.product_id === it.product_id)!;
        prod.stock = Math.max(0, prod.stock - (it.qty || 0));
      }

      // Lưu order
      const order = {
        order_id: orderId,
        created_at: Date.now(),
        total,
        items: items.map((it: any) => ({
          product_id: it.product_id,
          name: it.name,
          price: it.price,
          qty: it.qty,
        })),
      };
      mockOrders.push(order);

      // Clear cart
      mockCartItems = [];
      return { orderId };
    }

    // Native (SQLite)
    const db = openDatabase();

    // Tạo bảng nếu chưa có
    try {
      db.runSync(`
        CREATE TABLE IF NOT EXISTS orders (
          order_id TEXT PRIMARY KEY,
          created_at INTEGER,
          total INTEGER
        )
      `);
      db.runSync(`
        CREATE TABLE IF NOT EXISTS order_items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          order_id TEXT,
          product_id TEXT,
          qty INTEGER,
          price INTEGER
        )
      `);
    } catch (createErr) {
      console.error('Error creating orders tables:', createErr);
      throw createErr;
    }

    // Kiểm tra tồn kho cho từng item
    for (const it of items) {
      const prodRow = db.getFirstSync('SELECT stock FROM products WHERE product_id = ?', [it.product_id]) as any;
      if (!prodRow) throw new Error(`Sản phẩm ${it.product_id} không tồn tại`);
      const stock = Number(prodRow.stock || 0);
      if (stock < (it.qty || 0)) {
        throw new Error(`Sản phẩm ${it.product_id} không đủ tồn kho`);
      }
    }

    // Thực hiện giảm tồn kho và lưu order
    try {
      // Giảm tồn kho
      for (const it of items) {
        db.runSync('UPDATE products SET stock = stock - ? WHERE product_id = ?', [it.qty, it.product_id]);
      }

      // Insert order
      db.runSync('INSERT INTO orders (order_id, created_at, total) VALUES (?, ?, ?)', [
        orderId,
        Date.now(),
        total,
      ]);

      // Insert order_items
      for (const it of items) {
        db.runSync(
          'INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?, ?, ?, ?)',
          [orderId, it.product_id, it.qty, it.price]
        );
      }

      // Clear cart
      db.runSync('DELETE FROM cart_items');
      return { orderId };
    } catch (transErr) {
      console.error('Checkout transaction error:', transErr);
      throw transErr;
    }
  } catch (err) {
    console.error('checkoutCart error:', err);
    throw err;
  }
}