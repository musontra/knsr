import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

const SYMPTOMS = [
  { id: "1", name: "Enfeksiyon", icon: "bacteria", color: "#EF5350", videos: ["Enfeksiyon Yönetimi", "Antibiyotik Kullanımı"] },
  { id: "2", name: "Kanama", icon: "water", color: "#E53935", videos: ["Kanama Kontrolü", "İlk Yardım"] },
  { id: "3", name: "Ağrı", icon: "lightning-bolt", color: "#FF7043", videos: ["Ağrı Yönetimi", "Ağrı Kesiciler"] },
  { id: "4", name: "Nefes Darlığı", icon: "lungs", color: "#42A5F5", videos: ["Nefes Egzersizleri", "Oksijen Kullanımı"] },
  { id: "5", name: "Ağız Kuruluğu", icon: "water-off", color: "#26A69A", videos: ["Ağız Bakımı", "Hidrasyon"] },
  { id: "6", name: "Ağız Yaraları", icon: "emoticon-sick", color: "#AB47BC", videos: ["Oral Mukozit Bakımı", "Ağız Gargaraları"] },
  { id: "7", name: "Bulantı ve Kusma", icon: "stomach", color: "#66BB6A", videos: ["Bulantı Önleme", "Antiemetik İlaçlar"] },
  { id: "8", name: "İştahsızlık", icon: "food-off", color: "#FFA726", videos: ["Beslenme İpuçları", "İştah Açıcılar"] },
  { id: "9", name: "Tat ve Koku Değişiklikleri", icon: "nose", color: "#7E57C2", videos: ["Tat Değişimleriyle Başa Çıkma"] },
  { id: "10", name: "Kabızlık", icon: "human", color: "#78909C", videos: ["Kabızlık Önleme", "Diyet"] },
  { id: "11", name: "Yorgunluk ve Halsizlik", icon: "sleep", color: "#EC407A", videos: ["Enerji Tasarrufu", "Dinlenme"] },
  { id: "12", name: "Cilt Sorunları", icon: "face-woman", color: "#FF8A65", videos: ["Cilt Bakımı", "Güneş Koruma"] },
];

function SymptomItem({ item }: { item: typeof SYMPTOMS[0] }) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        router.push({
          pathname: "/(main)/belirti-detay",
          params: { name: item.name, color: item.color, videos: JSON.stringify(item.videos) },
        });
      }}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <View style={[styles.iconBox, { backgroundColor: item.color + "20" }]}>
        <MaterialCommunityIcons name={item.icon as any} size={22} color={item.color} />
      </View>
      <Text style={styles.itemText}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </Pressable>
  );
}

export default function BelirtilerScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}>
      <View style={styles.searchBar}>
        <Text style={styles.searchText}>Belirtinizi seçiniz</Text>
      </View>
      <FlatList
        data={SYMPTOMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SymptomItem item={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: bottomPad + 20, gap: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  searchText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
  },
  item: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  itemPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: Colors.text,
  },
});
