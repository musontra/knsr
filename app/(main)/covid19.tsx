import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

const VIDEOS = [
  { title: "COVID-19 Bilgilendirme Modülü", duration: "14:20", color: "#42A5F5" },
  { title: "Kanserlilerde COVID-19 Riski", duration: "10:45", color: "#26C6DA" },
  { title: "Aşılama ve Kanser Hastaları", duration: "8:30", color: "#29B6F6" },
  { title: "Koruyucu Önlemler", duration: "6:15", color: "#4DB6AC" },
];

const INFO_CARDS = [
  {
    icon: "shield-check",
    title: "Korunma Yöntemleri",
    text: "Maske kullanımı, el hijyeni ve sosyal mesafe kanserliler için daha da önemlidir.",
    color: "#42A5F5",
    bg: "#E3F2FD",
  },
  {
    icon: "needle",
    title: "Aşılanma",
    text: "Kanser tedavisi görenler COVID-19 aşısı hakkında onkologlarına danışmalıdır.",
    color: "#26C6DA",
    bg: "#E0F7FA",
  },
  {
    icon: "hospital-building",
    title: "Hastane Ziyaretleri",
    text: "Tedavi randevularınızı aksatmayın. Hastaneler gerekli önlemleri almaktadır.",
    color: "#66BB6A",
    bg: "#E8F5E9",
  },
  {
    icon: "phone-alert",
    title: "Belirtiler Gelişirse",
    text: "Ateş, öksürük veya nefes darlığı durumunda hemen sağlık ekibinizi arayın.",
    color: "#EF5350",
    bg: "#FFEBEE",
  },
];

export default function Covid19Screen() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}
      contentContainerStyle={{ paddingBottom: bottomPad + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <Ionicons name="shield-checkmark" size={48} color={Colors.white} />
        <Text style={styles.heroTitle}>COVID-19 Bilgilendirme</Text>
        <Text style={styles.heroSubtitle}>
          Kanser hastaları için COVID-19 bilgileri
        </Text>
      </View>

      <View style={{ padding: 16, gap: 14 }}>
        {INFO_CARDS.map((card, idx) => (
          <View key={idx} style={styles.infoCard}>
            <View style={[styles.infoIcon, { backgroundColor: card.bg }]}>
              <MaterialCommunityIcons name={card.icon as any} size={24} color={card.color} />
            </View>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.infoTitle}>{card.title}</Text>
              <Text style={styles.infoText}>{card.text}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Bilgilendirme Videoları</Text>

        {VIDEOS.map((video, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              Alert.alert("Video", `"${video.title}" videosu açılıyor...`);
            }}
            style={({ pressed }) => [styles.videoCard, pressed && styles.cardPressed]}
          >
            <View style={[styles.videoThumb, { backgroundColor: video.color + "25" }]}>
              <Ionicons name="play-circle" size={40} color={video.color} />
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              <View style={styles.durationRow}>
                <Ionicons name="time-outline" size={13} color={Colors.textMuted} />
                <Text style={styles.duration}>{video.duration}</Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: "#42A5F5",
    paddingHorizontal: 24,
    paddingVertical: 36,
    alignItems: "center",
    gap: 10,
  },
  heroTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: Colors.white,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  infoIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  infoText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 18,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
    marginTop: 8,
  },
  videoCard: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    overflow: "hidden",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  videoThumb: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  videoInfo: {
    flex: 1,
    padding: 14,
    gap: 6,
  },
  videoTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  duration: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
  },
});
