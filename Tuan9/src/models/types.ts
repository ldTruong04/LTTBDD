/**
Định nghĩa các kiểu dữ liệu TypeScript cho ứng dụng
 */

//sản phẩm trong hệ thống
export interface Product {
    product_id: string;  // Mã sản phẩm (PK)
    name: string;        // Tên sp
    price: number;       // Giá (>= 0)
    stock: number;       // Sl tồn (>= 0)
  }

  // sản phẩm trong giỏ hàng
  export interface CartItem {
    id?: number;         // ID tự động tăng (PK)
    product_id: string;  // Mã sp (FK -> products)
    qty: number;         // Sl (> 0)
  }

  // sản phẩm trong hoá đơn (JOIN cart_items + products)
  export interface InvoiceItem {
    product_id: string;
    name: string;
    price: number;
    qty: number;
    subtotal: number;    // price * qty
  }
  
  //toàn bộ hoá đơn
  export interface Invoice {
    items: InvoiceItem[];
    subtotal: number;    // Tổng VAT
    vat: number;         // Thuế VAT 11%
    total: number;       // Tổng tiền sau VAT
    date: string;        // Ngày giờ tạo
  }