import React, { useState } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      quality: 1,
      copyToCacheDirectory: true, 
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />
      {selectedImage && (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Button
            title="Chỉnh sửa ảnh"
            onPress={() => navigation.navigate("Chỉnh sửa ảnh", { uri: selectedImage })}
          />
        </>
      )}
      <Button title="Xem ảnh đã chỉnh sửa" onPress={() => navigation.navigate("Thư viện ảnh")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 300, height: 300, margin: 20, borderRadius: 10 },
});
