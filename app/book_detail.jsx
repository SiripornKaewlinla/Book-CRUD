import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookDetail = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { color } = useTheme();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://10.26.144.187:3000/api/books/${id}`);
                const data = await response.json();
                setBook(data.book);
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchBook();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) {
                Alert.alert("Error", "User not authenticated!");
                return;
            }

            const response = await fetch(`http://10.26.144.187:3000/api/books/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (response.ok) {
                Alert.alert("Deleted", "Book deleted successfully", [
                    { text: "OK", onPress: () => router.back() },
                ]);
            } else {
                const result = await response.json();
                Alert.alert("Error", result.message || "Failed to delete book.");
            }
        } catch (error) {
            Alert.alert("Error", "Failed to delete book.");
            console.error(error);
        }
    };

    const confirmDelete = () => {
        Alert.alert("Confirm Deletion", "Are you sure you want to delete this book?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: handleDelete },
        ]);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={color.primary} />
            </View>
        );
    }

    if (!book) {
        return (
            <View style={styles.center}>
                <Text style={{ color: color.text }}>Book not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: color.background }]}>
            <View style={[styles.card, { backgroundColor: color.surface }]}>
                <Image
                    source={require("../assets/image/book.png")}
                    style={styles.bookImage}
                    resizeMode="cover"
                />

                <View style={styles.info}>
                    <Text style={[styles.title, { color: color.primary }]}>{book.title}</Text>
                    <Text style={[styles.author, { color: color.textSecondary }]}>{book.author}</Text>
                    
                    <View style={styles.row}>
                        <Text style={[styles.label, { color: color.textSecondary }]}>Genre: </Text>
                        <Text style={{ color: color.text }}>{book.genre}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.label, { color: color.textSecondary }]}>Year: </Text>
                        <Text style={{ color: color.text }}>{book.year}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.label, { color: color.textSecondary }]}>Price: </Text>
                        <Text style={{ color: color.text }}>${book.price}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.label, { color: color.textSecondary }]}>Available: </Text>
                        <Text style={{ color: book.available ? "#28a745" : "#dc3545" }}>
                            {book.available ? "✅ Yes" : "❌ No"}
                        </Text>
                    </View>
                    <Text style={[styles.description, { color: color.textSecondary }]}>
                        {book.description || "No description available."}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: "#dc3545" }]} onPress={confirmDelete}>
                <Text style={styles.buttonText}>Delete Book</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default BookDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    card: {
        borderRadius: 20,
        padding: 0,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        overflow: "hidden",
    },
    bookImage: {
        width: "100%",
        height: 200,
    },
    info: {
        padding: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 4,
    },
    author: {
        fontSize: 16,
        fontStyle: "italic",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        marginBottom: 6,
    },
    label: {
        fontWeight: "600",
    },
    description: {
        fontSize: 14,
        marginTop: 10,
        lineHeight: 22,
        textAlign: "justify",
    },
    button: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 12,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
