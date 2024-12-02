import { ThemedText } from '@/components/ThemedText';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <View>
      <ThemedText>Abdul</ThemedText>
    </View>
  );
}
