import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useRef } from "react";

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
            <Animated.View
                style={[
                    styles.card,
                    { backgroundColor: color.surface, transform: [{ scale }] },
                ]}
            >
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const About = () => {
    const { color } = useTheme();

    return (
        <ScrollView style={{ backgroundColor: color.background }}>
            <View style={styles.wrapper}>
                <AnimatedCard color={color}>
                    <View style={styles.content}>
                        <Text style={[styles.title, { color: color.text }]}>
                            เกี่ยวกับรายวิชา
                        </Text>
                        <Text style={[styles.code, { color: color.textSecondary }]}>
                            IN405109 - Hybrid Mobile Application Programming
                        </Text>

                        <Text style={[styles.sectionTitle, { color: color.primary }]}>
                             คำอธิบายรายวิชา
                        </Text>
                        <Text style={[styles.description, { color: color.textSecondary }]}>
                            สถาปัตยกรรมฮาร์ดแวร์ คุณลักษณะและข้อจำกัดของอุปกรณ์เคลื่อนที่
                            เครื่องมือและภาษาที่ใช้สำหรับพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่
                            การพัฒนาโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่โดยใช้ภาษาหลากหลายแพลตฟอร์ม
                            การใช้หน่วยความจำและส่วนเก็บบันทึกข้อมูล การขออนุญาตและการเข้าถึงส่วนฮาร์ดแวร์
                            ส่วนติดต่อกับผู้ใช้ การสื่อสารเครือข่ายกับภายนอก การเชื่อมโยงกับระบบเครื่องแม่ข่าย
                            การทดสอบโปรแกรมประยุกต์บนอุปกรณ์เคลื่อนที่ ประเด็นด้านความมั่นคง และการฝึกปฏิบัติ
                        </Text>
                    </View>
                </AnimatedCard>
            </View>
        </ScrollView>
    );
};

export default About;

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 60,
    },
    card: {
        borderRadius: 18,
        padding: 24,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    content: {
        paddingHorizontal: 6,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 8,
    },
    code: {
        fontSize: 16,
        fontStyle: "italic",
        textAlign: "center",
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 6,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: "justify",
    },
});
