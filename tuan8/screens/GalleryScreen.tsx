import React, { useEffect, useState } from "react";
import { View, FlatList, Image, StyleSheet, Button, Alert, Text, TouchableOpacity } from "react-native";
import * as MediaLibrary from "expo-media-library";

export default function GalleryScreen() {
  const [photos, setPhotos] = useState<Array<{ id: string; uri: string }>>([]);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    setLoading(true);
    try {
      const perm = await MediaLibrary.requestPermissionsAsync();
      const status = (perm as any).status ?? perm.status;
      const accessPrivileges = (perm as any).accessPrivileges;

      if (status !== "granted" && status !== "limited") {
        Alert.alert("Không có quyền truy cập thư viện ảnh");
        setLoading(false);
        return;
      }

      // Lấy assets, ưu tiên ảnh gần nhất được chỉnh sửa
      const res = await MediaLibrary.getAssetsAsync({
        mediaType: "photo",
        first: 200,
        sortBy: [MediaLibrary.SortBy.modificationTime, MediaLibrary.SortBy.creationTime],
      });

      const assets = res.assets ?? [];
      console.log("assets count:", assets.length);

      const mapped = await Promise.all(
        assets.map(async (a) => {
          try {
            const info = await MediaLibrary.getAssetInfoAsync(a.id);
            const usable = info?.localUri ?? info?.uri ?? a.uri ?? null;
            return { id: a.id, uri: usable };
          } catch (err) {
            console.warn("getAssetInfoAsync failed for", a.id, err);
            return { id: a.id, uri: a.uri ?? null };
          }
        })
      );

      const filtered = mapped.filter((m) => m.uri);
      setPhotos(filtered as Array<{ id: string; uri: string }>);
    } catch (e) {
      console.error("loadImages error:", e);
      Alert.alert("Không thể tải ảnh");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Tải lại ảnh" onPress={loadImages} />
      {loading && <Text style={{ textAlign: "center", margin: 8 }}>Đang tải...</Text>}
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id ?? item.uri}
        numColumns={3}
        renderItem={({ item }) =>
          item.uri ? (
            <TouchableOpacity activeOpacity={0.8}>
              <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <View style={[styles.image, styles.placeholder]} />
          )
        }
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>Không có ảnh để hiển thị</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: 110, height: 110, margin: 3, borderRadius: 10, backgroundColor: "#eee" },
  placeholder: { backgroundColor: "#ddd" },
});
