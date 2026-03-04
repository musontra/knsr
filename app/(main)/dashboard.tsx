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
import { router } from "expo-router";
import { Ionicons, MaterialIcons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useAuth } from "@/context/AuthContext";
import Colors from "@/constants/colors";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  color: string;
  lightColor: string;
}

function MenuItem({ icon, title, subtitle, onPress, color, lightColor }: MenuItemProps) {
  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress();
      }}
      style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
    >
      <View style={[styles.menuIcon, { backgroundColor: lightColor }]}>
        <View style={[styles.menuIconInner, { backgroundColor: color }]}>
          {icon}
        </View>
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSubtitle}>{subtitle}</Text>
    </Pressable>
  );
}

const menuItems = [
  {
    icon: <Ionicons name="shield-checkmark" size={22} color="#fff" />,
    title: "Covid-19",
    subtitle: "Bilgilendirme",
    route: "/(main)/covid19",
    color: "#42A5F5",
    lightColor: "#E3F2FD",
  },
  {
    icon: <MaterialCommunityIcons name="ribbon" size={22} color="#fff" />,
    title: "Meme Kanseri",
    subtitle: "Bilgilendirme",
    route: "/(main)/meme-kanseri",
    color: "#F48FB1",
    lightColor: "#FCE4EC",
  },
  {
    icon: <MaterialCommunityIcons name="heart-pulse" size={22} color="#fff" />,
    title: "Belirti",
    subtitle: "Yönetimi",
    route: "/(main)/belirtiler",
    color: "#EF5350",
    lightColor: "#FFEBEE",
  },
  {
    icon: <Ionicons name="chatbubbles" size={22} color="#fff" />,
    title: "Uzmana Sor",
    subtitle: "Mesaj gönder",
    route: "/(main)/uzmana-sor",
    color: "#26A69A",
    lightColor: "#E0F2F1",
  },
  {
    icon: <Ionicons name="people" size={22} color="#fff" />,
    title: "Hasta",
    subtitle: "Deneyimleri",
    route: "/(main)/hasta-deneyimleri",
    color: "#FF7043",
    lightColor: "#FBE9E7",
  },
  {
    icon: <MaterialCommunityIcons name="calendar-heart" size={22} color="#fff" />,
    title: "Belirti",
    subtitle: "Takvimi",
    route: "/(main)/belirti-takvimi",
    color: "#7E57C2",
    lightColor: "#EDE7F6",
  },
  {
    icon: <MaterialIcons name="biotech" size={22} color="#fff" />,
    title: "Kan Tahlili",
    subtitle: "Yükle",
    route: "/(main)/kan-tahlili",
    color: "#66BB6A",
    lightColor: "#E8F5E9",
  },
  {
    icon: <Feather name="info" size={22} color="#fff" />,
    title: "Hakkında",
    subtitle: "Bilgi",
    route: "/(main)/hakkinda",
    color: "#78909C",
    lightColor: "#ECEFF1",
  },
  {
    icon: <Feather name="phone" size={22} color="#fff" />,
    title: "İletişim",
    subtitle: "Bize ulaşın",
    route: "/(main)/iletisim",
    color: "#AB47BC",
    lightColor: "#F3E5F5",
  },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await logout();
    router.replace("/(auth)/login");
  };

  const topPad = Platform.OS === "web" ? 67 : insets.top;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={[styles.header, { paddingTop: topPad + 16 }]}>
        <View>
          <Text style={styles.headerGreeting}>Merhaba,</Text>
          <Text style={styles.headerName}>{user?.fullName?.split(" ")[0] || "Kullanıcı"}</Text>
        </View>
        <Pressable onPress={handleLogout} style={styles.logoutButton}>
          <Feather name="log-out" size={20} color={Colors.white} />
        </Pressable>
      </View>

      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <MaterialCommunityIcons name="ribbon" size={28} color={Colors.accent} />
          <View style={{ flex: 1, marginLeft: 14 }}>
            <Text style={styles.bannerTitle}>Meme Kanseri Destek Mobil</Text>
            <Text style={styles.bannerText}>Size özel sağlık desteği</Text>
          </View>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.grid,
          { paddingBottom: (Platform.OS === "web" ? 34 : insets.bottom) + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.row}>
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              icon={item.icon}
              title={item.title}
              subtitle={item.subtitle}
              onPress={() => router.push(item.route as any)}
              color={item.color}
              lightColor={item.lightColor}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerGreeting: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  headerName: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    color: Colors.white,
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: -18,
    marginBottom: 8,
  },
  banner: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  bannerTitle: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  bannerText: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 2,
  },
  grid: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  menuItem: {
    width: "30%",
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    minHeight: 100,
    justifyContent: "center",
    gap: 6,
  },
  menuItemPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.96 }],
  },
  menuIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIconInner: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    textAlign: "center",
  },
  menuSubtitle: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
