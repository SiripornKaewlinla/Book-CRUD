import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "expo-router";
import BookNewModal from "./BookNewModal";
import { useIsFocused } from "@react-navigation/native";

const AnimatedCard = ({ children, onPress }) => {
    const scale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={{ transform: [{ scale }], marginBottom: 20 }}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

const Book = () => {
    const [data, setData] = useState([]);
    const { color } = useTheme();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();

    const bookData = async () => {
        try {
            const response = await fetch("http://10.26.144.187:3000/api/books?page=1&limit=10");
            const result = await response.json();
            setData(result.books);
        } catch (error) {
            console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหนังสือ:", error);
        }
    };

    useEffect(() => {
        bookData();
    }, [isFocused]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { backgroundColor: color.background }]} showsVerticalScrollIndicator={false}>
                {data.length > 0 ? (
                    data.map((book) => (
                        <AnimatedCard key={book._id} onPress={() => router.push(`/book_detail?id=${book._id}`)}>
                            <View style={[styles.card, { backgroundColor: color.surface }]}>
                                <Image
                                    source={require("../assets/image/book.png")} 
                                    style={styles.coverImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.cardContent}>
                                    <Text style={[styles.title, { color: "#1E40AF" }]} numberOfLines={1}>
                                        {book.title}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>ผู้แต่ง: </Text>{book.author}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>ประเภท: </Text>{book.genre}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={styles.label}>ปีที่พิมพ์: </Text>{book.year}
                                    </Text>
                                    <Text style={[styles.availability, { color: book.available ? "#22C55E" : "#EF4444" }]}>
                                        {book.available ? "มีจำหน่าย ✅" : "ไม่มีจำหน่าย ❌"}
                                    </Text>
                                    <Text style={styles.price}>ราคา: ${book.price}</Text>
                                </View>
                            </View>
                        </AnimatedCard>
                    ))
                ) : (
                    <Text style={styles.noData}>ไม่พบหนังสือ</Text>
                )}
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <BookNewModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreate={bookData}
            />
        </View>
    );
};

export default Book;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        flexDirection: "row",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 6,
        overflow: "hidden",
    },
    coverImage: {
        width: 100,
        height: 150,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    cardContent: {
        flex: 1,
        padding: 12,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
        fontStyle: "italic",
        color: "#1E40AF",
    },
    text: {
        fontSize: 14,
        marginBottom: 2,
        color: "#374151",
    },
    label: {
        fontWeight: "600",
        color: "#1E3A8A",
    },
    availability: {
        fontWeight: "600",
        marginTop: 6,
    },
    price: {
        marginTop: 4,
        fontSize: 15,
        fontWeight: "bold",
        color: "#1E40AF",
    },
    noData: {
        textAlign: "center",
        fontSize: 16,
        marginTop: 40,
        color: "#9CA3AF",
    },
    fab: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1E40AF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    fabText: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 34,
    },
});

