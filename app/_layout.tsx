import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { store } from '@/store/store';
import { Provider } from 'react-redux'
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<Provider store={store}>
			<Stack screenOptions={{ headerShown: false }} initialRouteName="index">
				<Stack.Screen name="index" />
				<Stack.Screen name="themeChanger" />
				<Stack.Screen name="flatlist" />
			</Stack>
		</Provider>
	);
}
