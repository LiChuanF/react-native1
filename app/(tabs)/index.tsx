import { ImageSourcePropType, View, StyleSheet, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useRef } from "react";

import domtoimage from "dom-to-image"; // 图片转base64
import { GestureHandlerRootView } from "react-native-gesture-handler"; // 手势处理根视图
import * as MediaLibrary from "expo-media-library"; // 访问敏感信息
import { captureRef } from "react-native-view-shot"; // 截图

import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require("@/assets/images/background-image.jpg");

export default function Index() {
    // 选择的图片
    const [selectedImage, setSelectedImage] = useState<string | undefined>(
        undefined
    );
    // 是否显示应用选项
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    // 是否显示表情选择器
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    // 选择的表情
    const [pickedEmoji, setPickedEmoji] = useState<
        ImageSourcePropType | undefined
    >(undefined);

    // 媒体库权限
    const [permissionResponse, requestPermission] =
        MediaLibrary.usePermissions();

    // 图片引用
    const imageRef = useRef<View>(null);

    useEffect(() => {
        console.log("isModalVisible", isModalVisible);
    }, [isModalVisible]);

    useEffect(() => {
        if (!permissionResponse?.granted) {
            requestPermission();
        }
    }, []);

    // 选择图片
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert("You did not select any image.");
        }
    };
    // 重置
    const onReset = () => {
        setShowAppOptions(false);
    };

    // 添加表情
    const onAddSticker = () => {
        setIsModalVisible(true);
    };

    // 关闭表情选择器
    const onModalClose = () => {
        setIsModalVisible(false);
    };

    // 保存图片
    const onSaveImageAsync = async () => {
        if (Platform.OS !== "web") {
            try {
                const localUri = await captureRef(imageRef, {
                    height: 440,
                    quality: 1,
                });

                await MediaLibrary.saveToLibraryAsync(localUri);
                if (localUri) {
                    alert("Saved!");
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                const dataUrl = await domtoimage.toJpeg(imageRef.current, {
                    quality: 0.95,
                    width: 320,
                    height: 440,
                });

                let link = document.createElement("a");
                link.download = "sticker-smash.jpeg";
                link.href = dataUrl;
                link.click();
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* 图片容器 */}
            <View style={styles.imageContainer}>
                <View
                    ref={imageRef}
                    collapsable={false} // 防止被折叠
                >
                    <ImageViewer
                        imgSource={PlaceholderImage}
                        selectedImage={selectedImage}
                    />
                    {pickedEmoji && (
                        <EmojiSticker
                            imageSize={40}
                            stickerSource={pickedEmoji}
                        />
                    )}
                </View>
            </View>

            {/* 应用选项 */}
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton
                            icon="refresh"
                            label="重置"
                            onPress={onReset}
                        />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton
                            icon="save-alt"
                            label="保存"
                            onPress={onSaveImageAsync}
                        />
                    </View>
                </View>
            ) : (
                // 底部按钮
                <View style={styles.footerContainer}>
                    <Button
                        theme="primary"
                        label="选择图片"
                        onPress={pickImageAsync}
                    />
                    <Button
                        label="选中"
                        onPress={() => setShowAppOptions(true)}
                    />
                </View>
            )}

            {/* 表情选择器 */}
            <EmojiPicker
                isVisible={isModalVisible}
                onClose={onModalClose}
            >
                <EmojiList
                    onSelect={setPickedEmoji}
                    onCloseModal={onModalClose}
                />
            </EmojiPicker>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        alignItems: "center",
    },
    imageContainer: {
        flex: 1,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
    optionsContainer: {
        position: "absolute",
        bottom: 80,
    },
    optionsRow: {
        alignItems: "center",
        flexDirection: "row",
    },
});
