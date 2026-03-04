import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

export default function KanTahlilesScreen() {
  const insets = useSafeAreaInsets();
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("İzin Gerekli", "Galeri erişimi için izin vermeniz gerekiyor.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("İzin Gerekli", "Kamera erişimi için izin vermeniz gerekiyor.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!image) {
      Alert.alert("Hata", "Lütfen önce bir görsel seçin.");
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setUploading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setUploading(false);
    setShowSuccess(true);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}
      contentContainerStyle={{ padding: 20, paddingBottom: bottomPad + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.infoCard}>
        <MaterialCommunityIcons name="test-tube" size={28} color={Colors.primary} />
        <Text style={styles.infoText}>
          Kan tahlili sonucunuzu fotoğrafını çekerek veya galerinizden seçerek yükleyebilirsiniz.
        </Text>
      </View>

      {image ? (
        <View style={styles.imagePreview}>
          <Image source={{ uri: image }} style={styles.previewImg} contentFit="cover" />
          <Pressable style={styles.removeButton} onPress={() => setImage(null)}>
            <Ionicons name="close-circle" size={28} color={Colors.error} />
          </Pressable>
        </View>
      ) : (
        <View style={styles.uploadArea}>
          <MaterialCommunityIcons name="file-image-outline" size={64} color={Colors.textMuted} />
          <Text style={styles.uploadHint}>Kan tahlili görseli seçin</Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            takePhoto();
          }}
          style={({ pressed }) => [styles.actionButton, { backgroundColor: "#E3F2FD" }, pressed && styles.pressed]}
        >
          <Ionicons name="camera" size={24} color="#1976D2" />
          <Text style={[styles.actionButtonText, { color: "#1976D2" }]}>Fotoğraf Çek</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            pickFromGallery();
          }}
          style={({ pressed }) => [styles.actionButton, { backgroundColor: Colors.primaryLight }, pressed && styles.pressed]}
        >
          <Ionicons name="images" size={24} color={Colors.primary} />
          <Text style={[styles.actionButtonText, { color: Colors.primary }]}>Galeriden Seç</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [styles.uploadButton, pressed && { opacity: 0.85 }]}
        onPress={handleUpload}
        disabled={uploading || !image}
      >
        {uploading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <>
            <MaterialIcons name="cloud-upload" size={22} color={Colors.white} />
            <Text style={styles.uploadButtonText}>Yükle</Text>
          </>
        )}
      </Pressable>

      <Modal visible={showSuccess} transparent animationType="fade">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => { setShowSuccess(false); setImage(null); }}
        >
          <View style={styles.successCard}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={40} color={Colors.white} />
            </View>
            <Text style={styles.successTitle}>Kan Tahlili Yükleme</Text>
            <Text style={styles.successSubtitle}>Kan Tahliliniz yüklendi.</Text>
            <Pressable
              style={styles.successButton}
              onPress={() => { setShowSuccess(false); setImage(null); }}
            >
              <Text style={styles.successButtonText}>Tamam</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  uploadArea: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: Colors.border,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 16,
  },
  uploadHint: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
  },
  imagePreview: {
    borderRadius: 16,
    overflow: "hidden",
    height: 220,
    marginBottom: 16,
    position: "relative",
  },
  previewImg: {
    width: "100%",
    height: "100%",
  },
  removeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  actionButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    gap: 8,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  actionButtonText: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
  },
  uploadButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  uploadButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  successCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 12,
    width: "100%",
    maxWidth: 320,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.success,
    alignItems: "center",
    justifyContent: "center",
  },
  successTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  successButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 8,
  },
  successButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
