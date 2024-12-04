import { ThemeButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<ThemedText type='title' align='center'>Welcome to Ur page</ThemedText>
			<ThemeButton
				txtColor='#fff'
				txt='Login To Continue'
				style={{ elevation: 1 }}
				icon={<AntDesign name='google' size={20} color='#fff' />}
				mx={10}
				my={10}
			/>
		</View>
	);
}
