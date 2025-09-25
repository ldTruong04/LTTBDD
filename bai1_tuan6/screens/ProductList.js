import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

export default function ProductList({ navigation }) {

  const product = {
    id: 1,
    name: "Điện Thoại Vsmart Joy 3 - Hàng chính hãng",
    price: "1.790.000 đ",
    image: require("../assets/vs_black.png"), 
    colors: {
      black: require("../assets/vs_black.png"),
      red: require("../assets/vs_red.png"),
      blue: require("../assets/vs_blue.png"),
      silver: require("../assets/vs_silver.png"),
    }
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text>⭐️⭐️⭐️⭐️☆ 789</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Button
        title="CHỌN MÀU"
        onPress={() => navigation.navigate("ColorPicker", { product })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 150, height: 200, marginBottom: 10, resizeMode: 'contain' },
  title: { fontWeight: 'bold', fontSize: 14, textAlign: 'center', marginVertical: 5 },
  price: { color: 'red', marginBottom: 10, fontWeight: 'bold' }
});
