import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7} style={styles.button}>
            <Text style={styles.icon}>{isDarkMode ? "🌙" : "☀️"}</Text>
        </TouchableOpacity>
    );
};

export default ThemeToggle;

const styles = StyleSheet.create({
    button: {
        padding: 10,
    },
    icon: {
        fontSize: 26,
    },
});
