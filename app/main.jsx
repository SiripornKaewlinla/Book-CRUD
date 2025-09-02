import React, { useRef } from "react";
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    Animated,
    TouchableWithoutFeedback,
} from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../context/ThemeContext";

const AnimatedCard = ({ children, color }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={[styles.card, { backgroundColor: color.surface, transform: [{ scale }] }]}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const Home = () => {
    const { color } = useTheme();

    return (
        <ScrollView style={{ backgroundColor: color.background }}>
            <View style={styles.container}>
                {/* โปรไฟล์ */}
                <View style={styles.profileBox}>
                    <Image source={require("../assets/image/653450513-4.jpg")} style={styles.profile} />
                    <Text style={[styles.name, { color: color.text }]}>นางสาว ศิริพร แก้วลินลา</Text>
                    <Text style={[styles.sub, { color: color.textSecondary }]}>รหัสนักศึกษา: 653450513-4</Text>
                </View>

                {/* การศึกษา */}
                <AnimatedCard color={color}>
                    <Text style={[styles.cardTitle, { color: color.primary }]}>🎓 การศึกษา</Text>
                    <Text style={[styles.text, { color: color.textSecondary }]}>มหาวิทยาลัยขอนแก่น</Text>
                    <Text style={[styles.text, { color: color.textSecondary }]}>สาขา: วิทยาการคอมพิวเตอร์สารสนเทศ</Text>
                    <Text style={[styles.text, { color: color.textSecondary }]}>ปริญญาตรี</Text>
                </AnimatedCard>

                {/* สกิล */}
                <AnimatedCard color={color}>
                    <Text style={[styles.cardTitle, { color: color.primary }]}>💡 สกิล</Text>
                    <Text style={[styles.text, { color: color.textSecondary }]}>UI/UX Design</Text>
                    <Text style={[styles.text, { color: color.textSecondary }]}>Frontend Development (HTML, CSS, JS, React)</Text>
                    <Text style={[styles.text, { color: color.textSecondary }]}>Backend Development (Node.js, PHP, MySQL)</Text>
                </AnimatedCard>

            
                <Link href="/about" style={[styles.button, { backgroundColor: color.buttonAbout }]}>
                    <Text style={styles.buttonText}>เกี่ยวกับรายวิชา</Text>
                </Link>

                <Link href="/book" style={[styles.button, { backgroundColor: color.buttonBooks }]}>
                    <Text style={styles.buttonText}>คลังหนังสือ</Text>
                </Link>
            </View>
        </ScrollView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    profileBox: {
        alignItems: "center",
        marginBottom: 30,
    },
    profile: {
        height: 140,
        width: 140,
        borderRadius: 70,
        borderWidth: 4,
        borderColor: "#1D4ED8",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    name: {
        fontSize: 26,
        fontWeight: "800",
    },
    sub: {
        fontSize: 15,
        marginTop: 4,
    },
    card: {
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        elevation: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 12,
    },
    text: {
        fontSize: 15,
        marginBottom: 6,
        lineHeight: 22,
    },
    button: {
        marginTop: 20,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        textAlign: "center",
        fontSize: 16,
    },
});
