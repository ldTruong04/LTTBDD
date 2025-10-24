/**
 * File: src/db/product.repo.ts
 * Mô tả: Các hàm truy vấn cho bảng products
 */

import { Product } from '../models/types';
import { openDatabase } from './db';
import { Platform } from 'react-native';

// Mock data cho web platform
const MOCK_PRODUCTS = [
  { product_id: 'P001', name: 'iPhone 15 Pro Max', price: 29990000, stock: 10 },
  { product_id: 'P002', name: 'Samsung Galaxy S24', price: 22990000, stock: 15 },
  { product_id: 'P003', name: 'MacBook Pro M3', price: 52990000, stock: 5 },
  { product_id: 'P004', name: 'iPad Air', price: 15990000, stock: 20 },
  { product_id: 'P005', name: 'AirPods Pro', price: 6490000, stock: 30 },
  { product_id: 'P006', name: 'Apple Watch Series 9', price: 10990000, stock: 12 },
];

/**
 * Lấy tất cả sản phẩm từ database
 * @returns Mảng các sản phẩm
 */
export function getAllProducts(): Product[] {
  // Trên web platform, trả về mock data
  if (Platform.OS === 'web') {
    return MOCK_PRODUCTS;
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
    return MOCK_PRODUCTS.find(p => p.product_id === productId) || null;
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