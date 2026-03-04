import React, { useState } from "react";
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
import Svg, { Rect, Line, Text as SvgText, Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

const DAYS = ["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"];
const FREQUENCY_DATA = [3, 1, 4, 2, 5, 3, 2];
const SEVERITY_DATA = [2, 1, 3, 2, 4, 3, 1];

function BarChart({
  data,
  color,
  label,
}: {
  data: number[];
  color: string;
  label: string;
}) {
  const W = 280;
  const H = 120;
  const maxVal = Math.max(...data) || 1;
  const barWidth = 28;
  const gap = (W - data.length * barWidth) / (data.length + 1);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{label}</Text>
      <Svg width={W} height={H + 30}>
        {data.map((val, i) => {
          const barH = (val / maxVal) * H;
          const x = gap + i * (barWidth + gap);
          const y = H - barH;
          return (
            <React.Fragment key={i}>
              <Rect
                x={x}
                y={y}
                width={barWidth}
                height={barH}
                fill={color}
                rx={6}
                opacity={0.85}
              />
              <SvgText
                x={x + barWidth / 2}
                y={H + 18}
                textAnchor="middle"
                fontSize={11}
                fill={Colors.textSecondary}
              >
                {DAYS[i]}
              </SvgText>
            </React.Fragment>
          );
        })}
        <Line
          x1={0}
          y1={H}
          x2={W}
          y2={H}
          stroke={Colors.border}
          strokeWidth={1}
        />
      </Svg>
    </View>
  );
}

const SYMPTOM_OPTIONS = [
  "Ağrı", "Bulantı", "Yorgunluk", "Ağız Kuruluğu", "Nefes Darlığı", "Kabızlık",
];

const SEVERITY_LABELS = ["Hafif", "Orta", "Şiddetli", "Çok Şiddetli", "Dayanılmaz"];

export default function BelitiTakvimiScreen() {
  const insets = useSafeAreaInsets();
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState<number | null>(null);
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleAdd = () => {
    if (!selectedSymptom || selectedSeverity === null) {
      Alert.alert("Hata", "Lütfen belirti ve şiddet seçiniz.");
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Başarılı", `${selectedSymptom} belirtisi kaydedildi.`);
    setSelectedSymptom("");
    setSelectedSeverity(null);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}
      contentContainerStyle={{ padding: 16, paddingBottom: bottomPad + 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Belirti Periyodu</Text>
        <BarChart data={FREQUENCY_DATA} color={Colors.primary} label="Haftalık Belirti Sıklığı" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Belirti Şiddeti</Text>
        <BarChart data={SEVERITY_DATA} color={Colors.accent} label="Günlük Şiddet Ortalaması" />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Yeni Belirti Ekle</Text>
        <Text style={styles.label}>Belirti Seçin</Text>
        <View style={styles.chipRow}>
          {SYMPTOM_OPTIONS.map((s) => (
            <Pressable
              key={s}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedSymptom(s);
              }}
              style={[styles.chip, selectedSymptom === s && styles.chipSelected]}
            >
              <Text style={[styles.chipText, selectedSymptom === s && styles.chipTextSelected]}>
                {s}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 16 }]}>Şiddet Seçin</Text>
        <View style={styles.severityRow}>
          {SEVERITY_LABELS.map((label, idx) => (
            <Pressable
              key={idx}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedSeverity(idx + 1);
              }}
              style={[styles.severityButton, selectedSeverity === idx + 1 && styles.severitySelected]}
            >
              <Text style={[styles.severityNum, selectedSeverity === idx + 1 && { color: Colors.white }]}>
                {idx + 1}
              </Text>
              <Text style={[styles.severityLabel, selectedSeverity === idx + 1 && { color: Colors.white }]}>
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.85 }]}
          onPress={handleAdd}
        >
          <Ionicons name="add-circle" size={20} color={Colors.white} />
          <Text style={styles.addButtonText}>Belirti Ekle</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
    alignSelf: "flex-start",
    marginBottom: 14,
  },
  chartContainer: {
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    color: Colors.textSecondary,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignSelf: "flex-start",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  chipTextSelected: {
    color: Colors.white,
  },
  severityRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  severityButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1.5,
    borderColor: Colors.border,
    alignItems: "center",
    minWidth: 58,
  },
  severitySelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  severityNum: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  severityLabel: {
    fontSize: 9,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    justifyContent: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
});
