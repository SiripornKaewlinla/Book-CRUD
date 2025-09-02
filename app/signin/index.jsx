import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, Link } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

const API_URL = "http://10.26.144.187:3000"; 

const Signin = () => {
  const { color } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSignin = async () => {
    if (!email || !password) {
      Alert.alert("ข้อผิดพลาด", "กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      setLoading(false);
      console.log("Signin Response:", result);

      if (response.ok) {
        await AsyncStorage.setItem("authToken", result.token);
        await AsyncStorage.setItem("user", JSON.stringify(result.user));
        Alert.alert("สำเร็จ", "เข้าสู่ระบบเรียบร้อยแล้ว");
        router.replace("/main");
      } else {
        Alert.alert("ข้อผิดพลาด", result.message || "อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      setLoading(false);
      console.error("Network Error:", error);
      Alert.alert("ปัญหาเครือข่าย", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: color.background }]}>
      <View style={[styles.container, { backgroundColor: color.surface }]}>
        <Text style={[styles.header, { color: color.text }]}>ยินดีต้อนรับ</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="อีเมล"
          placeholderTextColor={color.textSecondary}
          style={[styles.input, { color: color.text, borderColor: color.textSecondary }]}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="รหัสผ่าน"
          placeholderTextColor={color.textSecondary}
          secureTextEntry
          style={[styles.input, { color: color.text, borderColor: color.textSecondary }]}
        />

        {loading ? (
          <ActivityIndicator size="large" color={color.primary} />
        ) : (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: color.primary }]}
            onPress={handleSignin}
          >
            <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
        )}

        <Link href="/signup" style={styles.link}>
          <Text style={{ color: color.primary }}>ยังไม่มีบัญชี? สมัครสมาชิก</Text>
        </Link>
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center", padding: 20 },
  container: {
    borderRadius: 18,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  header: { fontSize: 26, fontWeight: "700", marginBottom: 28, textAlign: "center" },
  input: { borderWidth: 1, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 16, marginBottom: 18, fontSize: 15 },
  button: { paddingVertical: 14, borderRadius: 12, alignItems: "center", marginTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  link: { marginTop: 22, alignSelf: "center" },
});
