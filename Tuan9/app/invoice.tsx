/**
 * File: app/invoice.tsx
 * Mô tả: Trang Hoá đơn - hiển thị chi tiết hoá đơn và tổng tiền
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Invoice, InvoiceItem } from '../src/models/types';
import { getAllCartItems, clearCart } from '../src/db/cart.repo';
import { getProductById, updateProductStock } from '../src/db/product.repo';

// Tỷ lệ VAT (10%)
const VAT_RATE = 0.1;

export default function InvoiceScreen() {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  // Tạo hoá đơn
  const generateInvoice = () => {
    try {
      const items = getAllCartItems();
      
      if (items.length === 0) {
        Alert.alert('Thông báo', 'Giỏ hàng trống', [
          { text: 'OK', onPress: () => router.back() }
        ]);
        return;
      }

      const subtotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const vat = subtotal * VAT_RATE;
      const total = subtotal + vat;
      const date = new Date().toLocaleString('vi-VN');

      const invoiceData: Invoice = {
        items,
        subtotal,
        vat,
        total,
        date,
      };

      setInvoice(invoiceData);
    } catch (error) {
      console.error('Error generating invoice:', error);
      Alert.alert('Lỗi', 'Không thể tạo hoá đơn');
    }
  };

  useEffect(() => {
    generateInvoice();
  }, []);

  // Xử lý thanh toán (Nâng cao)
  const handleCheckout = () => {
    if (!invoice) return;

    Alert.alert(
      'Xác nhận thanh toán',
      `Tổng tiền: ${formatCurrency(invoice.total)}\n\nBạn có chắc muốn thanh toán?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Thanh toán',
          onPress: () => {
            try {
              // TODO (Nâng cao): Trừ tồn kho và lưu đơn hàng
              // Ở đây chúng ta chỉ trừ tồn kho và xoá giỏ
              
              invoice.items.forEach((item) => {
                const product = getProductById(item.product_id);
                if (product) {
                  const newStock = product.stock - item.qty;
                  updateProductStock(item.product_id, newStock);
                }
              });

              // Xoá giỏ hàng
              clearCart();

              Alert.alert(
                'Thành công',
                'Thanh toán thành công! Cảm ơn bạn đã mua hàng.',
                [
                  {
                    text: 'OK',
                    onPress: () => router.push('/'),
                  },
                ]
              );
            } catch (error) {
              console.error('Error during checkout:', error);
              Alert.alert('Lỗi', 'Không thể hoàn tất thanh toán');
            }
          },
        },
      ]
    );
  };

  // Format tiền tệ
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  // Render từng dòng hoá đơn
  const renderInvoiceItem = ({ item, index }: { item: InvoiceItem; index: number }) => (
    <View style={styles.invoiceItem}>
      <Text style={styles.itemIndex}>{index + 1}.</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemInfo}>
          {formatCurrency(item.price)} × {item.qty}
        </Text>
      </View>
      <Text style={styles.itemSubtotal}>{formatCurrency(item.price * item.qty)}</Text>
    </View>
  );

  if (!invoice) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Đang tải hoá đơn...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header hoá đơn */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HOÁ ĐƠN</Text>
          <Text style={styles.dateText}>{invoice.date}</Text>
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết đơn hàng</Text>
          {invoice.items.map((item, index) => (
            <View key={item.product_id}>
              {renderInvoiceItem({ item, index })}
            </View>
          ))}
        </View>

        {/* Tính toán tổng tiền */}
        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính:</Text>
            <Text style={styles.summaryValue}>{formatCurrency(invoice.subtotal)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>VAT (10%):</Text>
            <Text style={styles.summaryValue}>{formatCurrency(invoice.vat)}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.total)}</Text>
          </View>
        </View>

        
      </ScrollView>

      {/* Footer: Các nút hành động */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FF9800',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  invoiceItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemIndex: {
    fontSize: 14,
    color: '#999',
    width: 25,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
  },
  itemName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  itemInfo: {
    fontSize: 13,
    color: '#666',
  },
  itemSubtotal: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2196F3',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 15,
    color: '#666',
  },
  summaryValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ff5900ff',
  },
  
  footer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    gap: 10,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#9E9E9E',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  checkoutButton: {
    flex: 2,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
  },
});