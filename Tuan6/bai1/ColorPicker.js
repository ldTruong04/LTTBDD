import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ColorPicker({ route, navigation }) {
  const { product } = route.params;
  const [selectedColor, setSelectedColor] = useState("black"); 

  return (
    <View style={styles.container}>

      <Image source={product.colors[selectedColor]} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
      <Text style={styles.rating}>⭐️⭐️⭐️⭐️☆ 789</Text>

      <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
        Chọn một màu bên dưới:
      </Text>
      <View style={styles.colors}>
        {Object.keys(product.colors).map((colorKey, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.colorBox,
              { backgroundColor: colorKey, borderWidth: selectedColor === colorKey ? 3 : 1 }
            ]}
            onPress={() => setSelectedColor(colorKey)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>XONG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: 100, height: 250, resizeMode: 'contain', marginBottom: 10 },
  title: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginVertical: 5 },
  price: { color: 'red', fontWeight: 'bold', marginBottom: 5 },
  rating: { marginBottom: 10 },
  colors: { flexDirection: 'row', marginBottom: 20 },
  colorBox: { width: 50, height: 50, margin: 5, borderColor: '#333' },
  button: { backgroundColor: '#2196F3', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' }
});
