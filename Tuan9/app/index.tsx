/**
 Trang hiển thị danh sách sản phẩm (Trang chủ)
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
  TextInput,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '../src/models/types';
import { getAllProducts, getProductById } from '../src/db/product.repo';
import { addToCart, getAllCartItems } from '../src/db/cart.repo';

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Search
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Filters & sorting
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [sortOption, setSortOption] = useState<
    'none' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'stock_desc'
  >('none');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false);

  // UI state: show/hide advanced filter panel (UX: compact by default)
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  // Load danh sách sản phẩm và số lượng trong giỏ
  const loadProducts = useCallback(async () => {
    try {
      const data = await Promise.resolve(getAllProducts());
      setProducts(data || []);

      const cartItems = await Promise.resolve(getAllCartItems());
      setCartCount((cartItems || []).length);
    } catch (error) {
      console.error('Error loading products:', error);
      Alert.alert('Lỗi', 'Không thể tải danh sách sản phẩm');
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // cycle sort options helper
  const cycleSort = () => {
    const order: typeof sortOption[] = ['none','price_asc','price_desc','name_asc','name_desc','stock_desc'];
    const idx = order.indexOf(sortOption);
    setSortOption(order[(idx + 1) % order.length]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleAddToCart = async (productId: string) => {
    try {
      const product = await Promise.resolve(getProductById(productId));
      if (!product) {
        Alert.alert('Lỗi', 'Không tìm thấy sản phẩm');
        return;
      }
      if (product.stock <= 0) {
        Alert.alert('Hết hàng', 'Sản phẩm này hiện đã hết hàng');
        return;
      }

      const cartItems = await Promise.resolve(getAllCartItems());
      const existingItem = (cartItems || []).find((i) => i.product_id === productId);
      if (existingItem && existingItem.qty >= product.stock) {
        Alert.alert('Thông báo', `Bạn đã thêm tối đa ${product.stock} sản phẩm này vào giỏ`);
        return;
      }

      await Promise.resolve(addToCart(productId, 1));
      Alert.alert('Thành công', 'Đã thêm sản phẩm vào giỏ hàng');
      await loadProducts();
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm vào giỏ');
    }
  };

  const formatCurrency = (amount: number): string =>
    amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  // Filter products by debounced search term + filters + sorting
  const filteredProducts = useMemo(() => {
    const q = debouncedTerm.toLowerCase();
    let list = products.slice();

    // Search
    if (q) {
      list = list.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(q) ||
          String(p.product_id || '').toLowerCase().includes(q)
      );
    }

    // Price filter
    const min = Number(priceMin) || 0;
    const max = Number(priceMax) || Infinity;
    if (filtersApplied) {
      list = list.filter((p) => {
        const price = Number(p.price || 0);
        return price >= min && price <= max && (!onlyInStock || (p.stock || 0) > 0);
      });
    }

    // Sorting
    if (sortOption === 'price_asc') list.sort((a, b) => a.price - b.price);
    else if (sortOption === 'price_desc') list.sort((a, b) => b.price - a.price);
    else if (sortOption === 'name_asc') list.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    else if (sortOption === 'name_desc') list.sort((a, b) => String(b.name).localeCompare(String(a.name)));
    else if (sortOption === 'stock_desc') list.sort((a, b) => (b.stock || 0) - (a.stock || 0));

    return list;
  }, [products, debouncedTerm, priceMin, priceMax, sortOption, onlyInStock, filtersApplied]);

  const ProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>{formatCurrency(item.price)}</Text>
        <Text style={styles.productStock}>
          Còn lại: <Text style={styles.stockNumber}>{item.stock}</Text>
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.addButton, item.stock <= 0 && styles.addButtonDisabled]}
          onPress={() => handleAddToCart(item.product_id)}
          disabled={item.stock <= 0}
        >
          <Text style={styles.addButtonText}>{item.stock > 0 ? '+ Thêm' : 'Hết hàng'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailButton}
          onPress={() => router.push({ pathname: '/product', params: { id: item.product_id } })}
        >
          <Text style={styles.detailButtonText}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sản phẩm</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.cartButton} onPress={() => router.push('/cart')}>
            <Text style={styles.cartButtonText}>🛒 {cartCount}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search row (prominent) */}
      <View style={styles.searchRow}>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholder="Tìm sản phẩm theo tên..."
            style={styles.searchInput}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={() => setSearchTerm('')} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>X</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Quick controls: Filter toggle + Sort indicator */}
        <View style={styles.quickControls}>
          <TouchableOpacity style={styles.iconButton} onPress={() => setShowFilters((s) => !s)}>
            <Text style={styles.iconButtonText}>{showFilters ? '🔽' : 'Giá'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={cycleSort}>
            <Text style={styles.iconButtonText}>
              {sortOption === 'none' && 'Sắp xếp'}
              {sortOption === 'price_asc' && 'Giá ↑'}
              {sortOption === 'price_desc' && 'Giá ↓'}
              {sortOption === 'name_asc' && 'A→Z'}
              {sortOption === 'name_desc' && 'Z→A'}
              {sortOption === 'stock_desc' && 'Hàng nhiều'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Collapsible advanced filters (compact UX) */}
      {showFilters && (
        <View style={styles.filterWrapper}>
          <View style={styles.priceInputs}>
            <TextInput
              keyboardType="numeric"
              placeholder="Giá từ"
              value={priceMin}
              onChangeText={setPriceMin}
              style={styles.priceInput}
            />
            <TextInput
              keyboardType="numeric"
              placeholder="Đến"
              value={priceMax}
              onChangeText={setPriceMax}
              style={styles.priceInput}
            />
          </View>

          <View style={styles.advancedRow}>
            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>Chỉ còn hàng</Text>
              <Switch value={onlyInStock} onValueChange={setOnlyInStock} />
            </View>

            <View style={styles.filterActions}>
              <TouchableOpacity
                style={[styles.applyButton, filtersApplied && styles.applyButtonActive]}
                onPress={() => setFiltersApplied((v) => !v)}
              >
                <Text style={styles.applyButtonText}>{filtersApplied ? 'Tắt lọc' : 'Áp dụng'}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.clearFilters}
                onPress={() => {
                  setPriceMin('');
                  setPriceMax('');
                  setSortOption('none');
                  setOnlyInStock(false);
                  setFiltersApplied(false);
                }}
              >
                <Text style={styles.clearFiltersText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => String(item.product_id)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={filteredProducts.length === 0 ? styles.emptyWrapper : undefined}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {debouncedTerm ? 'Không tìm thấy sản phẩm phù hợp' : 'Không có sản phẩm'}
            </Text>
            <TouchableOpacity style={styles.reloadButton} onPress={loadProducts}>
              <Text style={styles.reloadButtonText}>Tải lại</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f6f8' },
  header: {
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e6e9eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#233044' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  cartButton: {
    backgroundColor: '#0ea5a4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  cartButtonText: { color: '#fff', fontWeight: '700' },

  // Search row
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    elevation: 1,
  },
  searchInput: { flex: 1, height: 38, paddingHorizontal: 6 },
  clearButton: {
    marginLeft: 8,
    backgroundColor: '#eee',
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: { color: '#333', fontWeight: '700' },

  quickControls: {
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonText: { color: '#333', fontWeight: '700' },

  // Filters
  filterWrapper: {
    marginHorizontal: 12,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 1,
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e6e9eb',
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  advancedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchRow: { flexDirection: 'row', alignItems: 'center' },
  switchLabel: { marginRight: 8, color: '#333', fontWeight: '600' },
  filterActions: { flexDirection: 'row', alignItems: 'center' },

  applyButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  applyButtonActive: { backgroundColor: '#1d4ed8' },
  applyButtonText: { color: '#fff', fontWeight: '700' },

  clearFilters: {
    backgroundColor: '#f87171',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearFiltersText: { color: '#fff', fontWeight: '700' },

  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 1,
  },
  productInfo: { flex: 1, marginRight: 10 },
  productName: { fontSize: 15, fontWeight: '700', color: '#0f1724' },
  productPrice: { fontSize: 14, color: '#0ea5a4', fontWeight: '700', marginTop: 6 },
  productStock: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  stockNumber: { fontWeight: '700', color: '#16a34a' },

  actions: { justifyContent: 'center', alignItems: 'flex-end' },
  addButton: { backgroundColor: '#0ea5a4', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  addButtonDisabled: { backgroundColor: '#cbd5e1' },
  addButtonText: { color: '#fff', fontWeight: '700' },
  detailButton: { marginTop: 8 },
  detailButtonText: { color: '#2563eb', fontSize: 12 },

  emptyWrapper: { flexGrow: 1 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { fontSize: 16, color: '#6b7280', marginBottom: 12 },
  reloadButton: { backgroundColor: '#0ea5a4', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 8 },
  reloadButtonText: { color: '#fff', fontWeight: '700' },
});