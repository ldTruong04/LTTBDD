import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
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
import { MaterialIcons } from '@expo/vector-icons';

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
      Alert.alert('Lỗi', 'Không thể tải giỏ hàng');
    }
  }, []);

  useEffect(() => { loadCart(); }, [loadCart]);

  const formatCurrency = (amount: number | undefined) =>
    (Number(amount || 0)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const changeQty = async (item: InvoiceItem, nextQty: number) => {
    try {
      setLoading(true);
      const product = await Promise.resolve(getProductById(item.product_id));
      if (!product) return;
      if (nextQty <= 0) await removeFromCart(item.id ?? item.product_id);
      else if (nextQty > product.stock) Alert.alert('Thông báo', `Chỉ còn ${product.stock} sản phẩm`);
      else await updateCartItemQty(item.id ?? item.product_id, nextQty);
      await loadCart();
    } finally { setLoading(false); }
  };

  const handleRemove = async (item: InvoiceItem) => {
    try { setLoading(true); await removeFromCart(item.id ?? item.product_id); await loadCart(); } finally { setLoading(false); }
  };

  const CartRow = ({ item }: { item: InvoiceItem }) => (
    <View style={styles.card}>
      {item.image && <Image source={{ uri: item.image }} style={styles.itemImage} />}
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
            <MaterialIcons name="remove" size={20} color="#2563eb" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.qty}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => changeQty(item, Number(item.qty) + 1)}>
            <MaterialIcons name="add" size={20} color="#2563eb" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.removeBtn} onPress={() => handleRemove(item)}>
          <MaterialIcons name="delete" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tạm tính</Text>
            <Text style={styles.totalVal}>{formatCurrency(total)}</Text>
          </View>

          <View style={styles.footerActions}>
            <TouchableOpacity style={styles.invoiceBtn} onPress={() => router.push('/invoice')}>
              <Text style={styles.invoiceText}>Xem chi tiết</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/invoice')}>
              <Text style={styles.checkoutText}>Thanh toán</Text>
              <MaterialIcons name="payment" size={20} color="#fff" />
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
    marginHorizontal: 15,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  cardLeft: { flex: 1 },
  cardRight: { alignItems: 'center' },

  name: { fontSize: 15, fontWeight: '700', color: '#0f1724' },
  price: { fontSize: 14, color: '#2563eb', marginTop: 4, fontWeight: '700' },
  sub: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  subValue: { fontWeight: '800', color: '#e52b2bff' },

  qtyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    overflow: 'hidden',
    marginBottom: 8,
  },
  qtyBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  qtyText: { marginHorizontal: 10, fontWeight: '700', color: '#0f1724' },

  removeBtn: { backgroundColor: '#e12727ff', padding: 8, borderRadius: 8 },

  footer: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 24,
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
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalVal: { fontSize: 18, fontWeight: '800', color: '#e52b2bff' },

  footerActions: { flexDirection: 'row', justifyContent: 'space-between' },
  invoiceBtn: { flex: 1, backgroundColor: '#2196F3', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginRight: 10 },
  invoiceText: { color: '#fff', fontWeight: '700', fontSize: 15 },
  checkoutBtn: { flex: 1.2, backgroundColor: '#4caf81ff', paddingVertical: 14, borderRadius: 12, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  checkoutText: { color: '#fff', fontWeight: '800', fontSize: 15 },

  continueBtn: { marginTop: 12, backgroundColor: '#0ea5a4', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  continueText: { color: '#fff', fontWeight: '700' },
});
