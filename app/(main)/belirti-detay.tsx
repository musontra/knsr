import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

export default function BelitiDetayScreen() {
  const insets = useSafeAreaInsets();
  const { name, color, videos: videosStr } = useLocalSearchParams<{
    name: string;
    color: string;
    videos: string;
  }>();

  const videos: string[] = videosStr ? JSON.parse(videosStr) : [];
  const itemColor = color || Colors.primary;
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}
      contentContainerStyle={{ paddingBottom: bottomPad + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.header, { backgroundColor: itemColor }]}>
        <Text style={styles.headerTitle}>Öneriler</Text>
        <Text style={styles.headerSubtitle}>{name}</Text>
      </View>

      <View style={styles.section}>
        {videos.map((video, idx) => (
          <Pressable
            key={idx}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            style={({ pressed }) => [styles.videoCard, pressed && styles.cardPressed]}
          >
            <View style={[styles.videoThumb, { backgroundColor: itemColor + "25" }]}>
              <MaterialCommunityIcons name="play-circle" size={40} color={itemColor} />
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoCategory}>Kemoterapi İlişkili</Text>
              <Text style={styles.videoTitle}>{name} Yönetimi</Text>
              <Text style={styles.videoSubtitle}>{video}</Text>
            </View>
          </Pressable>
        ))}

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>{name}</Text>
          <Text style={styles.infoText}>
            Kemoterapi tedavisi sırasında {name.toLowerCase()} belirtisiyle karşılaşıyorsanız,
            lütfen sağlık ekibinizle iletişime geçin. Aşağıdaki öneriler genel bilgi amaçlıdır.
          </Text>

          <View style={styles.tipCard}>
            <Ionicons name="bulb-outline" size={22} color={Colors.warning} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.tipTitle}>Önemli Not</Text>
              <Text style={styles.tipText}>
                Bu bilgiler yalnızca genel rehberlik içindir. Belirtileriniz şiddetlenirse hemen doktorunuza başvurun.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    paddingBottom: 36,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: Colors.white,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.85)",
    marginTop: 4,
  },
  section: {
    padding: 16,
    gap: 14,
  },
  videoCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  videoThumb: {
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  videoInfo: {
    padding: 14,
  },
  videoCategory: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  videoTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    marginTop: 4,
  },
  videoSubtitle: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 2,
  },
  infoSection: {
    gap: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  infoText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  tipCard: {
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 3,
    borderLeftColor: Colors.warning,
  },
  tipTitle: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  tipText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 2,
  },
});
