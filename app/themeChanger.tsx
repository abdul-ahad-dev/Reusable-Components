import React from 'react'
import { View } from 'react-native'
import { ThemeButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { Theme } from '@react-navigation/native';


export default function themeChanger() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12 }} >
      <ThemedText type='title' align='center'>Change Theme</ThemedText>
      <ThemeButton mx={10} txt="Light" />
      <ThemeButton mx={10} txt="Dark" />
    </View>
  )
}
