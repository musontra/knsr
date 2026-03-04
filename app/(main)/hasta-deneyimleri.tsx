import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

const EXPERIENCES = [
  {
    id: "1",
    name: "Ayşe K.",
    title: "Meme Kanseri Tanısı Alan Hasta Deneyimi 1",
    duration: "8:42",
    color: "#F48FB1",
    icon: "account-heart",
  },
  {
    id: "2",
    name: "Fatma M.",
    title: "Meme Kanseri Tanısı Alan Hasta Deneyimi 2",
    duration: "12:15",
    color: "#4CBFB4",
    icon: "account-star",
  },
  {
    id: "3",
    name: "Zeynep A.",
    title: "Kemoterapi Süreci ve Başa Çıkma Yöntemleri",
    duration: "15:30",
    color: "#7E57C2",
    icon: "account-voice",
  },
  {
    id: "4",
    name: "Emine Y.",
    title: "Tedavi Sonrası Yeni Hayat",
    duration: "10:08",
    color: "#66BB6A",
    icon: "account-check",
  },
  {
    id: "5",
    name: "Hatice S.",
    title: "Ailevi Destek ve İyileşme Yolculuğu",
    duration: "9:55",
    color: "#FF7043",
    icon: "account-group",
  },
];

function ExperienceCard({ item }: { item: typeof EXPERIENCES[0] }) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Video", `"${item.title}" videosu açılıyor...`);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={[styles.thumbnail, { backgroundColor: item.color + "20" }]}>
        <MaterialCommunityIcons name={item.icon as any} size={36} color={item.color} />
        <View style={styles.playOverlay}>
          <Ionicons name="play-circle" size={44} color={item.color} />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{item.duration}</Text>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.patientName}>{item.name}</Text>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>HASTA DENEYİMİ</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function HastaDeneyimleriScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}>
      <FlatList
        data={EXPERIENCES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExperienceCard item={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 12, paddingBottom: bottomPad + 20 }}
        columnWrapperStyle={{ gap: 12 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <MaterialCommunityIcons name="account-heart" size={24} color={Colors.primary} />
            <Text style={styles.headerTitle}>Gerçek hasta deneyimlerini izleyin</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  headerTitle: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.97 }],
  },
  thumbnail: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  playOverlay: {
    position: "absolute",
  },
  durationBadge: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  durationText: {
    color: Colors.white,
    fontSize: 11,
    fontFamily: "Inter_500Medium",
  },
  cardInfo: {
    padding: 10,
    gap: 4,
  },
  patientName: {
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
  },
  videoTitle: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: Colors.text,
    lineHeight: 16,
  },
  categoryBadge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  categoryText: {
    fontSize: 9,
    fontFamily: "Inter_600SemiBold",
    color: Colors.primary,
    letterSpacing: 0.5,
  },
});
