/**
  Các hàm truy vấn cho bảng products
 */

import { Product } from '../models/types';
import { openDatabase } from './db';
import { Platform } from 'react-native';

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

// Create unique mock list to avoid duplicate product_id issues
const UNIQUE_MOCK_PRODUCTS = Array.from(
  new Map(MOCK_PRODUCTS.map(p => [p.product_id, p])).values()
);

/** Lấy tất cả sản phẩm từ database
 * 
 */
export function getAllProducts(): Product[] {
  // Trên web platform, trả về mock data
  if (Platform.OS === 'web') {
    return UNIQUE_MOCK_PRODUCTS;
  }
  
  const db = openDatabase();
  
  try {
    const result = db.getAllSync<Product>('SELECT * FROM products ORDER BY name');
    return result;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

/**
 * Lấy sản phẩm theo ID
 * @param productId ID của sản phẩm
 * @returns Sản phẩm hoặc null
 */
export function getProductById(productId: string): Product | null {
  // Trên web platform, tìm trong mock data
  if (Platform.OS === 'web') {
    return UNIQUE_MOCK_PRODUCTS.find(p => p.product_id === productId) || null;
  }
  
  const db = openDatabase();
  
  try {
    const result = db.getFirstSync<Product>('SELECT * FROM products WHERE product_id = ?', [productId]);
    return result;
  } catch (error) {
    console.error('Error getting product:', error);
    return null;
  }
}

/**
 * Cập nhật số lượng tồn kho
 * @param productId ID sản phẩm
 * @param newStock Số lượng mới
 */
export function updateProductStock(productId: string, newStock: number): void {
  // Trên web platform, không cần cập nhật vì dùng mock data
  if (Platform.OS === 'web') {
    console.log(`Mock: Updated stock for ${productId} to ${newStock}`);
    return;
  }
  
  const db = openDatabase();
  
  try {
    db.runSync('UPDATE products SET stock = ? WHERE product_id = ?', [newStock, productId]);
  } catch (error) {
    console.error('Error updating stock:', error);
  }
}