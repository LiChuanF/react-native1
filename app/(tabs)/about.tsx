// App.js
import React from "react";
import { View, Text, Image as RNImage, StyleSheet } from "react-native";
import { Image as ExpoImage } from "expo-image";

export default function App() {
    const remoteUrl = "https://picsum.photos/400/400"; // 随机示例图

    return (
        <View style={styles.container}>
            <Text style={styles.title}>React Native vs Expo Image</Text>

            <View style={styles.row}>
                {/* 左边：React Native 内置 Image */}
                <View style={styles.card}>
                    <Text style={styles.label}>RN Image</Text>
                    <RNImage
                        source={{ uri: remoteUrl }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                {/* 右边：expo-image */}
                <View style={styles.card}>
                    <Text style={styles.label}>expo-image</Text>
                    <ExpoImage
                        source={remoteUrl}
                        style={styles.image}
                        contentFit="cover"
                        transition={1000}
                        cachePolicy="memory-disk"
                        placeholder={require("@/assets/images/background-image.png")}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    card: {
        alignItems: "center",
    },
    label: {
        marginBottom: 10,
        fontWeight: "500",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
        backgroundColor: "#eee",
    },
});
