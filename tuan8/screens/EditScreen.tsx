import React, { useState, useEffect } from "react";
import { View, Image, Button, StyleSheet, Alert } from "react-native";
import * as ImageManipulator from "expo-image-manipulator";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Định nghĩa kiểu cho navigation params
type RootStackParamList = {
  EditScreen: { uri: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "EditScreen">;

export default function EditScreen({ route, navigation }: Props) {
  const { uri } = route.params;
  const [editedUri, setEditedUri] = useState<string>(uri);

  //  Hàm chuyển ph:// -> file:// (cho iOS)
  const convertToFileUri = async (uri: string): Promise<string> => {
    if (!uri) return uri;
    if (uri.startsWith("ph://")) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(" Không có quyền truy cập thư viện ảnh");
        return uri;
      }
      try {
        const info = await MediaLibrary.getAssetInfoAsync(uri);
        if (info?.localUri) {
          return info.localUri.startsWith("file://")
            ? info.localUri
            : "file://" + info.localUri;
        }
        const asset = await MediaLibrary.createAssetAsync(uri);
        const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
        if (assetInfo?.localUri) {
          return assetInfo.localUri.startsWith("file://")
            ? assetInfo.localUri
            : "file://" + assetInfo.localUri;
        }

        const dest = FileSystem.cacheDirectory + `temp-${Date.now()}.jpg`;
        await FileSystem.copyAsync({ from: uri, to: dest });
        return dest.startsWith("file://") ? dest : "file://" + dest;
      } catch (e) {
        console.warn("convertToFileUri error:", e);
        return uri;
      }
    }

    if (uri.startsWith("/")) return "file://" + uri;
    return uri;
  };

  useEffect(() => {
    (async () => {
      const fixedUri = await convertToFileUri(uri);
      setEditedUri(fixedUri);
    })();
  }, [uri]);

  //Xoay ảnh
  const rotateImage = async () => {
    try {
      const source = await convertToFileUri(editedUri);
      const result = await ImageManipulator.manipulateAsync(
        source,
        [{ rotate: 90 }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setEditedUri(result.uri);
    } catch (e) {
      console.error("rotateImage error:", e);
      Alert.alert("Xoay ảnh thất bại");
    }
  };

  //Lật ảnh
  const flipImage = async () => {
    try {
      const source = await convertToFileUri(editedUri);
      const result = await ImageManipulator.manipulateAsync(
        source,
        [{ flip: ImageManipulator.FlipType.Horizontal }],
        { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
      );
      setEditedUri(result.uri);
    } catch (e) {
      console.error("flipImage error:", e);
      Alert.alert("Lật ảnh thất bại");
    }
  };

  //Lưu ảnh
  const saveImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Không có quyền truy cập thư viện ảnh.");
      return;
    }
    try {
      const source = await convertToFileUri(editedUri);
      const asset = await MediaLibrary.createAssetAsync(source);
      const albumName = "Edited from App";
      const albums = await MediaLibrary.getAlbumsAsync();
      const existing = albums.find((a) => a.title === albumName);
      if (existing) {
        await MediaLibrary.addAssetsToAlbumAsync([asset.id], existing.id, false);
      } else {
        await MediaLibrary.createAlbumAsync(albumName, asset.id, false);
      }
      Alert.alert("Ảnh đã được lưu vào thư viện!");
    } catch (e: any) {
      console.error("saveImage error:", e);
      Alert.alert("Lưu ảnh thất bại", e.message ?? String(e));
    }
  };

  return (
    <View style={styles.container}>
      {editedUri && <Image source={{ uri: editedUri }} style={styles.image} />}
      <View style={styles.buttons}>
        <Button title="Xoay ảnh" onPress={rotateImage} />
        <Button title="Lật ảnh" onPress={flipImage} />
        <Button title="Lưu ảnh" onPress={saveImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  image: { width: 300, height: 300, margin: 20, borderRadius: 10 },
  buttons: { flexDirection: "row", justifyContent: "space-around", width: "100%" },
});
