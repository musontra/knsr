import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Linking,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

const FEATURES = [
  { icon: "shield-checkmark", label: "Güvenli", desc: "Kişisel verileriniz şifrelenerek saklanır", color: "#66BB6A" },
  { icon: "people", label: "Uzman Kadro", desc: "Onkoloji uzmanları tarafından hazırlanmıştır", color: "#42A5F5" },
  { icon: "heart", label: "Empati", desc: "Hastaları ve yakınlarını desteklemek için tasarlandı", color: "#F48FB1" },
];

export default function HakkindaScreen() {
  const insets = useSafeAreaInsets();
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}
      contentContainerStyle={{ paddingBottom: bottomPad + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroSection}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="ribbon" size={48} color={Colors.white} />
        </View>
        <Text style={styles.appName}>Meme Kanseri Destek Mobil</Text>
        <Text style={styles.version}>Versiyon 1.0.0</Text>
      </View>

      <View style={{ padding: 16, gap: 14 }}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Uygulama Hakkında</Text>
          <Text style={styles.bodyText}>
            Meme Kanseri Destek Mobil uygulaması, meme kanseri teşhisi almış hastalar ve
            yakınları için kapsamlı bir destek platformudur. Uygulamamız; hastalara belirti
            takibi, uzman danışmanlığı, bilgilendirici içerikler ve hasta deneyimleri ile
            güçlü bir destek sistemi sunmaktadır.
          </Text>
          <Text style={styles.bodyText}>
            Kemoterapi sürecindeki yan etkileri yönetmek, uzmanlarla iletişim kurmak ve
            diğer hastaların deneyimlerinden yararlanmak artık çok daha kolay.
          </Text>
        </View>

        <View style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>Özelliklerimiz</Text>
          {FEATURES.map((f, idx) => (
            <View key={idx} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: f.color + "20" }]}>
                <Ionicons name={f.icon as any} size={22} color={f.color} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.featureLabel}>{f.label}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Geliştirici Notu</Text>
          <Text style={styles.bodyText}>
            Bu uygulama, meme kanseri hastaları ve yakınlarına destek olmak amacıyla
            sevgi ve özenle geliştirilmiştir. Her geri bildiriminiz bizim için değerlidir.
          </Text>
          <View style={styles.divider} />
          <View style={styles.statRow}>
            <View style={styles.stat}>
              <Text style={styles.statNum}>12+</Text>
              <Text style={styles.statLabel}>Belirti Kategorisi</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>5+</Text>
              <Text style={styles.statLabel}>Uzman Video</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statNum}>24/7</Text>
              <Text style={styles.statLabel}>Destek</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Gizlilik ve Yasal</Text>
          {["Gizlilik Politikası", "Kullanım Koşulları", "KVKK Aydınlatma Metni"].map((item, idx) => (
            <Pressable
              key={idx}
              style={({ pressed }) => [styles.legalRow, pressed && { opacity: 0.7 }]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Text style={styles.legalText}>{item}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </Pressable>
          ))}
        </View>

        <View style={styles.disclaimerCard}>
          <Ionicons name="information-circle" size={20} color={Colors.warning} />
          <Text style={styles.disclaimerText}>
            Bu uygulama tıbbi tavsiye verme amacı taşımaz. Sağlık sorunlarınız için
            mutlaka bir sağlık uzmanına başvurun.
          </Text>
        </View>

        <Text style={styles.copyright}>
          © 2024 Meme Kanseri Destek Mobil. Tüm hakları saklıdır.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 36,
    alignItems: "center",
    gap: 10,
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: Colors.white,
    textAlign: "center",
  },
  version: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.7)",
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  featuresCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  bodyText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  featureIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  featureLabel: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  featureDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stat: {
    alignItems: "center",
    gap: 2,
  },
  statNum: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  legalRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  legalText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: Colors.primary,
  },
  disclaimerCard: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  copyright: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textMuted,
  },
});
