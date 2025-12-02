import { ImageSourcePropType, StyleSheet, Image } from "react-native";
// import { Image } from "expo-image";

type Props = {
    imgSource: ImageSourcePropType;
    selectedImage?: string;
};

export default function ImageViewer({ imgSource, selectedImage }: Props) {
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

    return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
});
