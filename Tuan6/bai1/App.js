import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductList from './screens/ProductList';
import ColorPicker from './screens/ColorPicker';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: "Danh sách sản phẩm" }} />
        <Stack.Screen name="ColorPicker" component={ColorPicker} options={{ title: "Chọn màu" }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
