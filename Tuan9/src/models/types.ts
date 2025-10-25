//Định nghĩa dữ liệu TypeScript

//sản phẩm trong hệ thống
export interface Product {
    product_id: string;  // Mã (PK)
    name: string;        
    price: number;       
    stock: number;       
  }

  // sản phẩm trong hoá đơn
  export interface InvoiceItem {
    product_id: string;
    name: string;
    price: number;
    qty: number;
    subtotal: number;   
  }

  // sản phẩm trong giỏ hàng
  export interface CartItem {
    id?: number;         // ID tự động tăng (PK)
    product_id: string;  // Mã sp (FK -> products)
    qty: number;         
  }

  
  //toàn bộ hoá đơn
  export interface Invoice {
    items: InvoiceItem[];
    subtotal: number;    
    vat: number;         // Thuế 11%
    total: number;       // Tổng tiền sau VAT
    date: string;        // Ngày giờ tạo
  }