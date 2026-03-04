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
  { title: "Meme Kanseri Öğrenme Modülü", duration: "18:30", color: "#F48FB1" },
  { title: "Tanı Süreçleri ve Testler", duration: "12:15", color: "#EC407A" },
  { title: "Kemoterapi ve Radyoterapi", duration: "15:40", color: "#AB47BC" },
  { title: "Cerrahi Seçenekler", duration: "11:05", color: "#7E57C2" },
];

const STAGES = [
  { stage: "Evre 0", desc: "Duktal karsinoma in situ (DCIS)", color: "#66BB6A" },
  { stage: "Evre 1", desc: "Tümör 2 cm'den küçük, lenf bezi yok", color: "#FFA726" },
  { stage: "Evre 2", desc: "Tümör 2-5 cm veya lenf bezi tutulumu", color: "#FF7043" },
  { stage: "Evre 3", desc: "Bölgesel lenf bezi tutulumu", color: "#EF5350" },
  { stage: "Evre 4", desc: "Uzak organ metastazı", color: "#B71C1C" },
];

export default function MemeKanseriScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}
      contentContainerStyle={{ paddingBottom: bottomPad + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <MaterialCommunityIcons name="ribbon" size={48} color={Colors.white} />
        <Text style={styles.heroTitle}>Meme Kanseri Bilgilendirme</Text>
        <Text style={styles.heroSubtitle}>Kapsamlı bilgi ve rehberlik</Text>
      </View>

      <View style={{ padding: 16, gap: 14 }}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Meme Kanseri Evreleri</Text>
          {STAGES.map((item, idx) => (
            <View key={idx} style={styles.stageRow}>
              <View style={[styles.stageBadge, { backgroundColor: item.color }]}>
                <Text style={styles.stageText}>{item.stage}</Text>
              </View>
              <Text style={styles.stageDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Risk Faktörleri</Text>
          {[
            "Aile öyküsü (genetik yatkınlık)",
            "BRCA1 ve BRCA2 gen mutasyonları",
            "Erken menarş veya geç menopoz",
            "Hormon tedavisi kullanımı",
            "Alkol tüketimi ve obezite",
            "Fiziksel aktivite eksikliği",
          ].map((risk, idx) => (
            <View key={idx} style={styles.riskItem}>
              <View style={styles.dot} />
              <Text style={styles.riskText}>{risk}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Erken Belirtiler</Text>
          {[
            "Memede ele gelen kitle veya yumru",
            "Meme cildinde değişim veya portakal kabuğu görünümü",
            "Meme başında içe çekme veya akıntı",
            "Koltuk altında şişlik",
            "Memede ağrı veya hassasiyet",
          ].map((s, idx) => (
            <View key={idx} style={styles.riskItem}>
              <Ionicons name="alert-circle" size={14} color={Colors.accent} />
              <Text style={styles.riskText}>{s}</Text>
            </View>
          ))}
        </View>

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
              <MaterialCommunityIcons name="ribbon" size={32} color={video.color} />
              <Ionicons name="play-circle" size={36} color={video.color} style={{ position: "absolute" }} />
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
    backgroundColor: Colors.accent,
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
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  stageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stageBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minWidth: 60,
    alignItems: "center",
  },
  stageText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  stageDesc: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
  },
  riskItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 6,
  },
  riskText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 20,
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
