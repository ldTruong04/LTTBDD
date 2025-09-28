import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";

export default function ProductList({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  
  const images = {
    black: require("../assets/vs_black.png"),
    red: require("../assets/vs_red.png"),
    blue: require("../assets/vs_blue.png"),
    silver: require("../assets/vs_silver.png"),
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://68d3ef62214be68f8c67c74c.mockapi.io/user");
      const json = await res.json();
      setProducts(json);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#00bfff" style={{ marginTop: 20 }} />
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image source={images[item.imageBlack]} style={styles.image} />

          <Text style={styles.title}>{item.name}</Text>
          <Text>⭐️⭐️⭐️⭐️☆ 789</Text>
          <Text style={styles.price}>{item.price} đ</Text>

          <Button
            title="CHỌN MÀU"
            onPress={() =>
              navigation.navigate("ColorPicker", {
                product: {
                  ...item,
                  colors: {
                    black: images[item.imageBlack],
                    red: images[item.imageRed],
                    blue: images[item.imageBlue],
                    silver: images[item.imageSilver],
                  },
                },
              })
            }
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  image: { width: 150, height: 200, marginBottom: 10, resizeMode: "contain" },
  title: { fontWeight: "bold", fontSize: 14, textAlign: "center", marginVertical: 5 },
  price: { color: "red", marginBottom: 10, fontWeight: "bold" },
});
