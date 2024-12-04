import React from 'react'
import { View } from 'react-native'
import { ThemeButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function themeChanger() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();
  console.log('first==>',theme);


  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 12 }} >
      <ThemedText type='title' align='center' style={{backgroundColor: '#000'}}>Change Theme</ThemedText>
      <ThemeButton mx={10} txt="Light" />
      <ThemeButton mx={10} txt="Dark" />
    </View>
  )
}
