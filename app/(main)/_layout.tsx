import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontFamily: "Inter_600SemiBold", fontSize: 17 },
        headerBackTitle: "",
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="belirtiler" options={{ title: "Belirtiler" }} />
      <Stack.Screen name="belirti-detay" options={{ title: "Belirti Detayları" }} />
      <Stack.Screen name="belirti-takvimi" options={{ title: "Belirti Takvimi" }} />
      <Stack.Screen name="uzmana-sor" options={{ title: "Uzmana Sor" }} />
      <Stack.Screen name="hasta-deneyimleri" options={{ title: "Hasta Deneyimleri" }} />
      <Stack.Screen name="kan-tahlili" options={{ title: "Kan Tahlili Yükle" }} />
      <Stack.Screen name="covid19" options={{ title: "Covid-19 Bilgilendirme" }} />
      <Stack.Screen name="meme-kanseri" options={{ title: "Meme Kanseri Bilgilendirme" }} />
      <Stack.Screen name="iletisim" options={{ title: "İletişim" }} />
      <Stack.Screen name="hakkinda" options={{ title: "Hakkında" }} />
    </Stack>
  );
}
