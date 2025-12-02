import { useState } from "react";
import {
    ImageSourcePropType,
    StyleSheet,
    FlatList,
    Platform,
    Pressable,
} from "react-native";
import { Image } from "expo-image";

type Props = {
    onSelect: (image: ImageSourcePropType) => void;
    onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
    const [emoji] = useState<ImageSourcePropType[]>([
        require("@/assets/images/emoji1.png"),
        require("@/assets/images/emoji2.png"),
        require("@/assets/images/emoji3.png"),
        require("@/assets/images/emoji4.png"),
        require("@/assets/images/emoji5.png"),
        require("@/assets/images/emoji6.png"),
    ]);

    return (
        <FlatList
            horizontal //  如果启用true此选项，则项目将水平并排渲染，而不是垂直堆叠。
            showsHorizontalScrollIndicator={Platform.OS === "web"}  // 如果启用true此选项，则会在水平滚动条显示时显示一个小的滚动指示器。
            data={emoji} // 一个数组，包含要渲染的元素。
            contentContainerStyle={styles.listContainer} // 一个对象，包含要应用于 FlatList 内容的样式。
            renderItem={({ item, index }) => (
                <Pressable onPress={() => { onSelect(item); onCloseModal(); }}>
                    <Image source={item} key={index} style={styles.image} />
                </Pressable>
            )} // 一个函数，用于渲染每个元素。
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
});
