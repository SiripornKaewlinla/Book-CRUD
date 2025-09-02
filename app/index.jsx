import { useEffect } from "react";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function IndexPage() {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem("authToken");

            if (!token) {
                router.replace("/signin");  // ไปหน้า signin ถ้าไม่มี token
            } else {
                router.replace("/main");    // ไปหน้า main ถ้ามี token
            }
        };

        checkLogin();
    }, []);

    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
    </View>
    );
}
