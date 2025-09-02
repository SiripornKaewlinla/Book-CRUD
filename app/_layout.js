import { Stack, usePathname } from "expo-router";
import ThemeToggle from "./components/ThemeToggle";
import AuthToggle from "./components/AuthToggle";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function AppStack() {
    const pathname = usePathname();
    const { color } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: color.background },
                headerTintColor: color.text,
                headerTitleStyle: { color: color.text, fontWeight: "700" },
                headerTitleAlign: "center",
                headerLeft: () => (pathname === "/main" ? <AuthToggle /> : null),
                headerRight: () => <ThemeToggle />,
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="main" options={{ title: "หน้าหลัก" }} />
            <Stack.Screen name="about" options={{ title: "เกี่ยวกับรายวิชา" }} />
            <Stack.Screen name="book" options={{ title: "คลังหนังสือ" }} />
            <Stack.Screen name="book_detail" options={{ title: "รายละเอียดหนังสือ" }} />
            <Stack.Screen name="signup/index" options={{ title: "สมัครสมาชิก" }} />
            <Stack.Screen name="signin/index" options={{ title: "เข้าสู่ระบบ" }} />
            <Stack.Screen name="profile/index" options={{ title: "โปรไฟล์" }} />
        </Stack>
    );
}

export default function Layout() {
    return (
        <ThemeProvider>
            <AppStack />
        </ThemeProvider>
    );
}
