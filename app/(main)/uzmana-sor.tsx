import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

type Mode = "select" | "text" | "audio";

function AudioRecorder({ onBack }: { onBack: () => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}.000000`;
  };

  const startRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsRecording(true);
    setIsPaused(false);
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
  };

  const pauseRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (isPaused) {
      setIsPaused(false);
      intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      setIsPaused(true);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setSeconds(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const sendQuestion = () => {
    if (!isRecording && seconds === 0) {
      Alert.alert("Hata", "Lütfen önce kayıt yapınız.");
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Başarılı", "Sorunuz uzmanlarımıza iletildi.", [
      { text: "Tamam", onPress: () => { resetRecording(); onBack(); } },
    ]);
  };

  return (
    <View style={styles.audioContainer}>
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
        <Text style={styles.timerStatus}>
          {!isRecording ? "Hazır" : isPaused ? "Durduruldu" : "Kaydediliyor..."}
        </Text>
        {isRecording && !isPaused && (
          <View style={styles.recordingDot} />
        )}
      </View>

      <View style={styles.audioControls}>
        {isRecording ? (
          <Pressable
            style={[styles.controlButton, styles.pauseButton]}
            onPress={pauseRecording}
          >
            <Ionicons name={isPaused ? "play" : "pause"} size={22} color={Colors.white} />
            <Text style={styles.controlButtonText}>{isPaused ? "Devam" : "Duraklat"}</Text>
          </Pressable>
        ) : (
          <View style={{ width: 100 }} />
        )}

        {isRecording ? (
          <Pressable style={styles.resetButton} onPress={resetRecording}>
            <Ionicons name="stop" size={22} color={Colors.error} />
          </Pressable>
        ) : (
          <Pressable style={styles.recordButton} onPress={startRecording}>
            <Ionicons name="mic" size={28} color={Colors.white} />
          </Pressable>
        )}

        <Pressable
          style={[styles.controlButton, styles.startButton]}
          onPress={isRecording ? () => {} : startRecording}
        >
          <Ionicons name="radio-button-on" size={22} color={Colors.white} />
          <Text style={styles.controlButtonText}>Kayda Başla</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [styles.sendButton, pressed && { opacity: 0.85 }]}
        onPress={sendQuestion}
      >
        <Ionicons name="send" size={18} color={Colors.white} />
        <Text style={styles.sendButtonText}>Soruyu Gönder</Text>
      </Pressable>
    </View>
  );
}

function TextQuestion({ onBack }: { onBack: () => void }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const send = async () => {
    if (!text.trim()) {
      Alert.alert("Hata", "Lütfen sorunuzu yazınız.");
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    Alert.alert("Başarılı", "Sorunuz uzmanlarımıza iletildi.", [
      { text: "Tamam", onPress: () => { setText(""); onBack(); } },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <Text style={styles.questionLabel}>Sormak istediğiniz soruyu yazınız...</Text>
      <TextInput
        style={styles.textArea}
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={8}
        placeholder="Sorunuzu buraya yazın..."
        placeholderTextColor={Colors.textMuted}
        textAlignVertical="top"
      />
      <Pressable
        style={({ pressed }) => [styles.sendButton, { alignSelf: "stretch" }, pressed && { opacity: 0.85 }]}
        onPress={send}
        disabled={sending}
      >
        {sending ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <>
            <Ionicons name="send" size={18} color={Colors.white} />
            <Text style={styles.sendButtonText}>Soruyu Gönder</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

export default function UzmanaSorScreen() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<Mode>("select");
  const bottomPad = Platform.OS === "web" ? 34 : insets.bottom;

  if (mode === "audio") {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Pressable onPress={() => setMode("select")} style={styles.backRow}>
          <Ionicons name="arrow-back" size={22} color={Colors.primary} />
          <Text style={styles.backText}>Geri</Text>
        </Pressable>
        <AudioRecorder onBack={() => setMode("select")} />
      </View>
    );
  }

  if (mode === "text") {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Pressable onPress={() => setMode("select")} style={styles.backRow}>
          <Ionicons name="arrow-back" size={22} color={Colors.primary} />
          <Text style={styles.backText}>Geri</Text>
        </Pressable>
        <TextQuestion onBack={() => setMode("select")} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.backgroundSecondary }}
      contentContainerStyle={{ padding: 20, paddingBottom: bottomPad + 20 }}
    >
      <View style={styles.promptCard}>
        <MaterialCommunityIcons name="doctor" size={32} color={Colors.primary} />
        <Text style={styles.promptTitle}>Uzmana Sor</Text>
        <Text style={styles.promptSubtitle}>
          Sorunuzu iletmek istediğiniz yöntemi seçiniz
        </Text>
      </View>

      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setMode("text");
        }}
        style={({ pressed }) => [styles.modeCard, pressed && styles.cardPressed]}
      >
        <View style={[styles.modeIcon, { backgroundColor: Colors.primaryLight }]}>
          <Ionicons name="document-text" size={28} color={Colors.primary} />
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.modeTitle}>Yazılı</Text>
          <Text style={styles.modeDesc}>Sorunuzu metinsel olarak hazırlayabilirsiniz</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </Pressable>

      <Pressable
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setMode("audio");
        }}
        style={({ pressed }) => [styles.modeCard, pressed && styles.cardPressed]}
      >
        <View style={[styles.modeIcon, { backgroundColor: "#E0F2F1" }]}>
          <Ionicons name="mic" size={28} color="#26A69A" />
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.modeTitle}>Sesli</Text>
          <Text style={styles.modeDesc}>Sorunuzu uygulamayı sesinizle kayıt şeklinde gönderebilirsiniz</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 8,
  },
  backText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: Colors.primary,
  },
  promptCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  promptTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: Colors.text,
  },
  promptSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    textAlign: "center",
  },
  modeCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  modeIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modeTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: Colors.text,
  },
  modeDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: Colors.textSecondary,
    marginTop: 2,
    lineHeight: 18,
  },
  audioContainer: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    gap: 32,
  },
  timerBox: {
    alignItems: "center",
    gap: 8,
  },
  timerText: {
    fontSize: 36,
    fontFamily: "Inter_700Bold",
    color: Colors.primary,
    letterSpacing: 1,
  },
  timerStatus: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  recordingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.error,
  },
  audioControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  resetButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFEBEE",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.error,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    gap: 4,
    width: 100,
  },
  pauseButton: {
    backgroundColor: Colors.textSecondary,
  },
  startButton: {
    backgroundColor: Colors.primary,
  },
  controlButtonText: {
    fontSize: 11,
    fontFamily: "Inter_500Medium",
    color: Colors.white,
    textAlign: "center",
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  sendButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
  },
  questionLabel: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: Colors.textSecondary,
  },
  textArea: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: Colors.text,
    minHeight: 160,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
});
