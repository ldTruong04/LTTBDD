/**
 Trang hiển thị Trang thanh toán hoá đơn
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
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Invoice, InvoiceItem } from '../src/models/types';
import { getAllCartItems, clearCart } from '../src/db/cart.repo';
import { getProductById, updateProductStock } from '../src/db/product.repo';
import { MaterialIcons } from '@expo/vector-icons';

const VAT_RATE = 0.11;

export default function InvoiceScreen() {
  const router = useRouter();
  const [invoice, setInvoice] = useState<Invoice | null>(null);

  const generateInvoice = () => {
    const items = getAllCartItems();
    if (!items.length) {
      Alert.alert('Thông báo', 'Giỏ hàng trống', [{ text: 'OK', onPress: () => router.back() }]);
      return;
    }

    const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const vat = subtotal * VAT_RATE;
    const total = subtotal + vat;
    const date = new Date().toLocaleString('vi-VN');

    setInvoice({ items, subtotal, vat, total, date });
  };

  useEffect(() => {
    generateInvoice();
  }, []);

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const handleCheckout = () => {
    if (!invoice) return;

    Alert.alert(
      'Xác nhận thanh toán',
      `Tổng tiền: ${formatCurrency(invoice.total)}\nBạn có chắc muốn thanh toán?`,
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Thanh toán',
          onPress: () => {
            try {
              invoice.items.forEach((item) => {
                const product = getProductById(item.product_id);
                if (product) updateProductStock(item.product_id, product.stock - item.qty);
              });
              clearCart();
              Alert.alert('Thành công', 'Cảm ơn đã mua hàng.', [
                { text: 'OK', onPress: () => router.push('/') },
              ]);
            } catch {
              Alert.alert('Lỗi', 'Thanh toán không thành công');
            }
          },
        },
      ]
    );
  };

  const renderInvoiceItem = ({ item }: { item: InvoiceItem }) => (
    <View style={styles.invoiceCard}>
      {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} />}
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
      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>HOÁ ĐƠN</Text>
          <Text style={styles.dateText}>{invoice.date}</Text>
        </View>

        {/* Danh sách sản phẩm */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Chi tiết đơn hàng</Text>
          <FlatList
            data={invoice.items}
            keyExtractor={(item) => item.product_id.toString()}
            renderItem={renderInvoiceItem}
            scrollEnabled={false}
          />
        </View>

        {/* Tổng tiền */}
        <View style={styles.section}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>{formatCurrency(invoice.subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>VAT (11%)</Text>
            <Text style={styles.summaryValue}>{formatCurrency(invoice.vat)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.total)}</Text>
          </View>
        </View>
      </ScrollView>

     {/* Footer */}
<View style={styles.footer}>
  <TouchableOpacity
    style={styles.cancelBtn}
    activeOpacity={0.7}
    onPress={() => router.back()}
  >
    <Text style={styles.cancelText}>Huỷ</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.payBtn}
    activeOpacity={0.7}
    onPress={handleCheckout}
  >
    <Text style={styles.payText}>Xác nhận</Text>
    <MaterialIcons name="payment" size={20} color="#fff" />
  </TouchableOpacity>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  scrollView: { flex: 1 },
  header: {
    backgroundColor: '#ffcc00ff',
    padding: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#fff', marginBottom: 5 },
  dateText: { fontSize: 14, color: '#fff' },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 12, color: '#333' },
  invoiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#fafafa',
    marginBottom: 12,
    elevation: 2,
  },
  itemImage: { width: 50, height: 50, borderRadius: 8, marginRight: 10 },
  itemDetails: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: '600', color: '#333', marginBottom: 3 },
  itemInfo: { fontSize: 13, color: '#666' },
  itemSubtotal: { fontSize: 15, fontWeight: '700', color: '#E53935' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 15, color: '#666' },
  summaryValue: { fontSize: 15, fontWeight: '600', color: '#333' },
  divider: { height: 1, backgroundColor: '#ddd', marginVertical: 8 },
  totalLabel: { fontSize: 18, fontWeight: '700', color: '#333' },
  totalValue: { fontSize: 22, fontWeight: '700', color: '#E53935' },
  footer: {
  flexDirection: 'row',
  padding: 16,
  paddingBottom: 24,
  backgroundColor: '#fff',
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -3 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 8,
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
},

cancelBtn: {
  flex: 1,
  backgroundColor: '#B0BEC5',
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
},

cancelText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 16,
},

payBtn: {
  flex: 1.2,
  backgroundColor: '#4caf81ff',
  paddingVertical: 14,
  borderRadius: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
},

payText: {
  color: '#fff',
  fontWeight: '700',
  fontSize: 16,
},

});
