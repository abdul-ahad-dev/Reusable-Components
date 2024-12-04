import React from 'react'
import { ThemeButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View } from 'react-native';
import { router } from 'expo-router';



export default function index() {

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ThemeButton
                txt='Theme Page'
                style={{ elevation: 1 }}
                bgColor='#fff'
                txtColor='#000'
                onPress={() => router.push("./themeChanger")}
                mx={10} my={10} />
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
    )
}