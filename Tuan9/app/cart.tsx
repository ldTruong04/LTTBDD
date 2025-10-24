/**
 * File: app/cart.tsx
 * Mô tả: Trang Giỏ hàng - hiển thị và chỉnh sửa giỏ
 */

import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { InvoiceItem } from '../src/models/types';
import {
  getAllCartItems,
  updateCartItemQty,
  removeFromCart,
  clearCart,
} from '../src/db/cart.repo';
import { getProductById } from '../src/db/product.repo';

export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<InvoiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const loadCart = useCallback(async () => {
    try {
      const items = await Promise.resolve(getAllCartItems()) || [];
      setCartItems(items);
      const cartTotal = items.reduce(
        (sum: number, it: any) => sum + (Number(it.price || 0) * Number(it.qty || 0)),
        0
      );
      setTotal(cartTotal);
    } catch (err) {
      console.error('Error loading cart:', err);
      Alert.alert('Lỗi', 'Không thể tải giỏ hàng');
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const formatCurrency = (amount: number | undefined) =>
    (Number(amount || 0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const changeQty = async (item: InvoiceItem, nextQty: number) => {
    try {
      setLoading(true);
      const product = await Promise.resolve(getProductById(item.product_id));
      if (!product) {
        Alert.alert('Lỗi', 'Sản phẩm không tồn tại');
        setLoading(false);
        return;
      }
      if (nextQty <= 0) {
        await Promise.resolve(removeFromCart(item.id ?? item.product_id));
      } else {
        if (nextQty > product.stock) {
          Alert.alert('Thông báo', `Chỉ còn ${product.stock} sản phẩm trong kho`);
          setLoading(false);
          return;
        }
        await Promise.resolve(updateCartItemQty(item.id ?? item.product_id, nextQty));
      }
      await loadCart();
    } catch (err) {
      console.error('Error changing qty:', err);
      Alert.alert('Lỗi', 'Không thể cập nhật giỏ hàng');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (item: InvoiceItem) => {
    try {
      setLoading(true);
      await Promise.resolve(removeFromCart(item.id ?? item.product_id));
      await loadCart();
      Alert.alert('Thành công', 'Đã xoá sản phẩm khỏi giỏ hàng');
    } catch (err) {
      console.error('Error removing item:', err);
      Alert.alert('Lỗi', 'Không thể xoá sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (cartItems.length === 0) return;
    Alert.alert(
      'Xác nhận',
      'Bạn có muốn xoá toàn bộ giỏ hàng?',
      [
        { text: 'Huỷ', style: 'cancel' },
        {
          text: 'Xoá',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await Promise.resolve(clearCart());
              await loadCart();
            } catch (err) {
              console.error('Error clearing cart:', err);
              Alert.alert('Lỗi', 'Không thể xoá giỏ hàng');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleViewInvoice = () => {
    if (cartItems.length === 0) {
      Alert.alert('Thông báo', 'Giỏ hàng của bạn đang trống');
      return;
    }
    router.push('/invoice');
  };

  const CartRow = ({ item }: { item: InvoiceItem }) => (
    <View style={styles.card}>
      <View style={styles.cardLeft}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>{formatCurrency(Number(item.price))}</Text>
        <Text style={styles.sub}>
          Tạm tính: <Text style={styles.subValue}>{formatCurrency(Number(item.price) * Number(item.qty))}</Text>
        </Text>
      </View>

      <View style={styles.cardRight}>
        <View style={styles.qtyBox}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item, Number(item.qty) - 1)}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item, Number(item.qty) + 1)}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item)}>
          <Text style={styles.removeText}>Xoá</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      

      {/* Body */}
      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}

      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartRow item={item} />}
        keyExtractor={(it) => String(it.product_id ?? it.id)}
        contentContainerStyle={cartItems.length === 0 ? { flex: 1, justifyContent: 'center', alignItems: 'center' } : undefined}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', padding: 40 }}>
            <Text style={{ color: '#6b7280', fontSize: 16 }}>🛒 Giỏ hàng trống</Text>
            <TouchableOpacity style={styles.continueBtn} onPress={() => router.replace('/')}>
              <Text style={styles.continueText}>Tiếp tục mua sắm</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Footer */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tạm tính</Text>
            <Text style={styles.totalVal}>{formatCurrency(total)}</Text>
          </View>

          <View style={styles.footerActions}>
            <TouchableOpacity style={styles.invoiceBtn} onPress={() => router.push('/invoice')}>
              <Text style={styles.invoiceText}>Xem hoá đơn</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/invoice')}>
              <Text style={styles.checkoutText}>Thanh toán →</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f6f8' },
  


  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 1,
  },
  cardLeft: { flex: 1, paddingRight: 8 },
  cardRight: { alignItems: 'flex-end' },

  name: { fontSize: 15, fontWeight: '700', color: '#0f1724' },
  price: { fontSize: 14, color: '#0ea5a4', marginTop: 6, fontWeight: '700' },
  sub: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  subValue: { fontWeight: '800', color: '#2563eb' },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2f7',
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  qtyBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  qtyBtnText: { fontSize: 18, color: '#2563eb', fontWeight: '700' },
  qtyText: { marginHorizontal: 12, fontWeight: '700', color: '#0f1724' },

  removeBtn: { backgroundColor: '#ef4444', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  removeText: { color: '#fff', fontWeight: '700' },

  footer: {
    backgroundColor: '#fff',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#e6e9eb',
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalVal: { fontSize: 18, fontWeight: '800', color: '#fa6c06ff' },

  footerActions: { flexDirection: 'row', justifyContent: 'space-between' },
  invoiceBtn: { flex: 1, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginRight: 8 },
  invoiceText: { color: '#fff', fontWeight: '700' },
  checkoutBtn: { flex: 1.2, backgroundColor: '#45ff61ff', paddingVertical: 12, borderRadius: 8, alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: '800' },

  continueBtn: { marginTop: 12, backgroundColor: '#0ea5a4', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  continueText: { color: '#fff', fontWeight: '700' },
});