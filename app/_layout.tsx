import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
/**
 * 堆栈导航器是应用程序中不同屏幕之间导航的基础。在 Android 系统中，
 * 堆栈路由会在​​当前屏幕上方以动画形式显示。在 iOS 系统中，
 * 堆栈路由会从右侧以动画形式显示。Expo Router 提供了一个Stack组件，用于创建导航堆栈并添加新的路由。
 *
 * Stack 组件用于创建导航堆栈并添加新的路由。
 * */
export default function RootLayout() {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
            </Stack>
            <StatusBar style="light" />
        </>
    );
}
