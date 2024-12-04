import { ThemedText } from '@/components/ThemedText';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ThemedText type='title' align='center' lightColor='green'>Abdul Ahad</ThemedText>
      <ThemedText type='subtitle' align='center' lightColor='orange'>Abdul Ahad</ThemedText>
      <ThemedText align='center'>Abdul Ahad</ThemedText>
    </View>
  );
}
