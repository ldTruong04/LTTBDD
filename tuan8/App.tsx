import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import EditScreen from "./screens/EditScreen";
import GalleryScreen from "./screens/GalleryScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Trang chủ" component={HomeScreen} />
        <Stack.Screen name="Chỉnh sửa ảnh" component={EditScreen} />
        <Stack.Screen name="Thư viện ảnh" component={GalleryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
