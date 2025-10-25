/**
Layout chính cho expo-router, khởi tạo database
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { Platform, Alert } from 'react-native';
import { initDatabase, seedProducts } from '../src/db/db';

export default function RootLayout() {
  // Khởi tạo database khi app khởi động
  useEffect(() => {
    const setup = async () => {
      // SQLite chỉ hoạt động trên mobile (Android/iOS)
      if (Platform.OS === 'web') {
        console.warn('SQLite không hỗ trợ web platform hãy chạy trên Android hoặc iOS');
        return;
      }

      try {
        console.log('loading database setup...');

      } catch (error) {
        console.error('Error details:', JSON.stringify(error, null, 2));
      }
    };
    
    setup();
  }, []);

  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Các Sản phẩm có ở cửa hàng',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="cart" 
        options={{ 
          title: 'Giỏ hàng',
          headerStyle: { backgroundColor: '#2196F3' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="invoice" 
        options={{ 
          title: '',
          headerStyle: { backgroundColor: '#ffcc00ff' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack>
  );
}