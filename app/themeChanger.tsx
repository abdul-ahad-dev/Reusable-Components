import React from 'react'
import { View } from 'react-native'
import { ThemeButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/store/features/themeSlice';
import { router } from 'expo-router';


export default function themeChanger() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  console.log('first==>', theme);


  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12, backgroundColor: theme === "light" ? "#fff" : "#000" }} >
      <ThemedText type='title' align='center' style={{ color: theme === "light" ? "#000" : "#fff" }}>
        Change Theme App
      </ThemedText>

      <ThemeButton
        onPress={() => dispatch(toggleTheme())}
        mx={10}
        bgColor={theme === "light" ? "#000" : "#fff"}
        txtColor={theme === "light" ? "#fff" : "#000"}
        txt="Change Theme"
        style={{ elevation: 1 }}
      />
      <ThemeButton
        onPress={() => router.back()}
        mx={10}
        bgColor={theme === "light" ? "#E65100" : "#FFB74D"}
        txtColor={theme === "light" ? "#fff" : "#000"}
        txt="Go Back"
        style={{ elevation: 1 }}
      />
    </View>
  )
}
