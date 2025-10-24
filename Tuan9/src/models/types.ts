/**
 * File: src/models/types.ts
 * Mô tả: Định nghĩa các kiểu dữ liệu TypeScript cho ứng dụng
 */

/**
 * Đại diện cho một sản phẩm trong hệ thống
 */
export interface Product {
    product_id: string;  // Mã sản phẩm (PK)
    name: string;        // Tên sản phẩm
    price: number;       // Giá (>= 0)
    stock: number;       // Số lượng tồn kho (>= 0)
  }
  
  /**
   * Đại diện cho một mặt hàng trong giỏ hàng
   */
  export interface CartItem {
    id?: number;         // ID tự động tăng (PK)
    product_id: string;  // Mã sản phẩm (FK -> products)
    qty: number;         // Số lượng (> 0)
  }
  
  /**
   * Đại diện cho một dòng trong hoá đơn (JOIN cart_items + products)
   */
  export interface InvoiceItem {
    product_id: string;
    name: string;
    price: number;
    qty: number;
    subtotal: number;    // price * qty
  }
  
  /**
   * Đại diện cho toàn bộ hoá đơn
   */
  export interface Invoice {
    items: InvoiceItem[];
    subtotal: number;    // Tổng tiền trước VAT
    vat: number;         // Thuế VAT (ví dụ 10%)
    total: number;       // Tổng tiền sau VAT
    date: string;        // Ngày giờ tạo hoá đơn
  }