import { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookNewModal = ({ visible, onClose, onCreate }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [available, setAvailable] = useState(true);

    const handleCreate = async () => {
        if (!title || !author || !genre || !year || !price) {
            Alert.alert("ข้อผิดพลาด", "กรุณากรอกข้อมูลให้ครบทุกช่อง!");
            return;
        }

        const bookData = {
            title,
            author,
            description,
            genre,
            year: parseInt(year),
            price: parseFloat(price),
            available,
        };

        try {
            const token = await AsyncStorage.getItem("authToken");
            if (!token) {
                Alert.alert("ข้อผิดพลาด", "ผู้ใช้งานยังไม่ได้เข้าสู่ระบบ!");
                return;
            }

            const response = await fetch("http://10.26.144.187:3000/api/books", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(bookData),
            });

            const result = await response.json();

            if (response.ok) {
                Alert.alert("สำเร็จ", "สร้างหนังสือเรียบร้อยแล้ว!");
                onCreate();
                onClose();
            } else {
                Alert.alert("ข้อผิดพลาด", result.message || "สร้างหนังสือไม่สำเร็จ");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("ข้อผิดพลาด", "สร้างหนังสือไม่สำเร็จ");
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <ScrollView>
                        <Text style={styles.modalTitle}>สร้างหนังสือใหม่</Text>

                        <TextInput style={styles.input} placeholder="ชื่อหนังสือ" value={title} onChangeText={setTitle} />
                        <TextInput style={styles.input} placeholder="ผู้แต่ง" value={author} onChangeText={setAuthor} />
                        <TextInput style={styles.input} placeholder="คำอธิบาย" value={description} onChangeText={setDescription} />
                        <TextInput style={styles.input} placeholder="ประเภท" value={genre} onChangeText={setGenre} />
                        <TextInput style={styles.input} placeholder="ปีที่พิมพ์" keyboardType="numeric" value={year} onChangeText={setYear} />
                        <TextInput style={styles.input} placeholder="ราคา" keyboardType="numeric" value={price} onChangeText={setPrice} />

                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={handleCreate}>
                                <Text style={styles.buttonText}>สร้าง</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                                <Text style={styles.buttonText}>ยกเลิก</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default BookNewModal;

const styles = StyleSheet.create({
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
    modalContent: { width: "90%", backgroundColor: "#fff", borderRadius: 20, padding: 20, elevation: 10 },
    modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 20, textAlign: "center", color: "#1E40AF" },
    input: { borderWidth: 1, borderColor: "#1E40AF", borderRadius: 10, padding: 12, marginBottom: 12 },
    buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    button: { flex: 1, backgroundColor: "#1E40AF", padding: 14, borderRadius: 10, marginHorizontal: 5, alignItems: "center" },
    cancelButton: { backgroundColor: "#3B82F6" },
    buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
