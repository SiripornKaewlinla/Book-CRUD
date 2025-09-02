import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
    const { color, isDarkMode } = useTheme();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userString = await AsyncStorage.getItem("user");
            if (userString) {
                setUser(JSON.parse(userString));
            }
        };
        fetchUser();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color.background }]}>
            <View
                style={[
                    styles.card,
                    { backgroundColor: isDarkMode ? "#fff" : color.surface },
                ]}
            >
                <Image
                    source={require("../../assets/image/653450513-4.jpg")}
                    style={styles.avatar}
                />
                <Text style={[styles.name, { color: color.primary }]}>
                    {user?.username || "Guest User"}
                </Text>

                <Text style={[styles.email, { color: color.textSecondary }]}>
                    {user?.email || "No email"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: "90%",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 6,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: "#4a90e2",
    },
    name: {
        fontSize: 24,
        fontWeight: "800",
        marginBottom: 8,
    },
    email: {
        fontSize: 16,
        marginBottom: 4,
    },
    studentNumber: {
        fontSize: 16,
        marginTop: 2,
        fontWeight: "500",
    },
});