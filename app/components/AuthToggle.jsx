import { useEffect, useState } from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Modal,
    Pressable,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthToggle() {
    const router = useRouter();
    const pathname = usePathname();
    const isSignin = pathname.includes("signin");

    const [usernameInitial, setUsernameInitial] = useState(null);
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await AsyncStorage.getItem("user");
            if (userData) {
                try {
                    const parsed = JSON.parse(userData);
                    if (parsed?.username) {
                        setUsernameInitial(parsed.username.charAt(0).toUpperCase());
                    }
                } catch (e) {
                    console.error("ไม่สามารถอ่านข้อมูลผู้ใช้จาก storage");
                }
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("user");
        setShowMenu(false);
        router.replace("/signin");
    };

    const handlePress = () => {
        if (usernameInitial) {
            setShowMenu(true);
        } else {
            router.push(isSignin ? "/signup" : "/signin");
        }
    };

    return (
        <>
            <TouchableOpacity onPress={handlePress}>
                {usernameInitial ? (
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{usernameInitial}</Text>
                    </View>
                ) : (
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            {isSignin ? "สมัครสมาชิก" : "เข้าสู่ระบบ"}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>

            {/* Modal เมนู */}
            <Modal
                transparent
                animationType="fade"
                visible={showMenu}
                onRequestClose={() => setShowMenu(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowMenu(false)}>
                    <View style={styles.menu}>
                        <Pressable
                            style={styles.menuItemBox}
                            onPress={() => {
                                setShowMenu(false);
                                router.push("/profile");
                            }}
                        >
                            <Text style={styles.menuItem}>ดูโปรไฟล์</Text>
                        </Pressable>
                        <Pressable style={styles.menuItemBox} onPress={handleLogout}>
                            <Text style={[styles.menuItem, { color: "#e74c3c" }]}>ออกจากระบบ</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        marginLeft: 16,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: "#6C63FF", // โทนม่วงฟ้า
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    avatar: {
        marginLeft: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#6C63FF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    avatarText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 60,
        paddingRight: 16,
    },
    menu: {
        backgroundColor: "#fff",
        borderRadius: 12,
        paddingVertical: 8,
        width: 160,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    menuItemBox: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    menuItem: {
        fontSize: 15,
        fontWeight: "500",
        color: "#333",
    },
});
