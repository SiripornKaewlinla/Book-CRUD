import { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    Text,
    TouchableOpacity,
} from "react-native";
import { useRouter, Link } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

const Signup = () => {
    const { color } = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSignup = async () => {
        if (password.length < 6) {
            Alert.alert("ข้อผิดพลาด", "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร");
            return;
        }

        try {
            const response = await fetch("http://10.26.144.187:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const result = await response.json();
            console.log("Response JSON:", result);

            if (response.ok) {
                Alert.alert("สำเร็จ", "สมัครสมาชิกเรียบร้อย!", [
                    { text: "ตกลง", onPress: () => router.push("/signin") },
                ]);
            } else {
                const errorMsg = result.errors
                    ? result.errors.map((e) => e.msg).join("\n")
                    : result.message || "ไม่สามารถสมัครสมาชิกได้";
                Alert.alert("ข้อผิดพลาด", errorMsg);
            }
        } catch (error) {
            console.error("ปัญหาเครือข่าย:", error);
            Alert.alert("ปัญหาเครือข่าย", "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
        }
    };

    return (
        <View style={[styles.screen, { backgroundColor: color.background }]}>
            <View style={[styles.container, { backgroundColor: color.surface }]}>
                <Text style={[styles.header, { color: color.text }]}>
                    สมัครสมาชิก ✨
                </Text>

                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="ชื่อผู้ใช้"
                    placeholderTextColor={color.textSecondary}
                    style={[
                        styles.input,
                        { color: color.text, borderColor: color.textSecondary },
                    ]}
                />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="อีเมล"
                    placeholderTextColor={color.textSecondary}
                    keyboardType="email-address"
                    style={[
                        styles.input,
                        { color: color.text, borderColor: color.textSecondary },
                    ]}
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
                    placeholderTextColor={color.textSecondary}
                    secureTextEntry
                    style={[
                        styles.input,
                        { color: color.text, borderColor: color.textSecondary },
                    ]}
                />

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: color.primary }]}
                    onPress={handleSignup}
                >
                    <Text style={styles.buttonText}>สมัครสมาชิก</Text>
                </TouchableOpacity>

                <Link href="/signin" style={styles.link}>
                    <Text style={{ color: color.primary }}>
                        มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
                    </Text>
                </Link>
            </View>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    container: {
        borderRadius: 18,
        padding: 28,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    header: {
        fontSize: 26,
        fontWeight: "700",
        marginBottom: 28,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 18,
        fontSize: 15,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    link: {
        marginTop: 22,
        alignSelf: "center",
    },
});
