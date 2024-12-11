import React from 'react'
import { ThemeButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function index() {
    const theme = useSelector((state: RootState) => state.theme.theme);

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: theme === "light" ? "#fff" : "#000" }}>
            <ThemeButton
                txt='Theme Page'
                style={{ elevation: 1 }}
                bgColor={theme === "light" ? "#000" : "#fff"}
                txtColor={theme === "light" ? "#fff" : "#000"}
                onPress={() => router.push("./themeChanger")}
                mx={10} my={10} />
            <ThemeButton
                txt='Flatlist Page'
                style={{ elevation: 1 }}
                bgColor={theme === "light" ? "#f57c00" : "#ffb74d"}
                txtColor={theme === "light" ? "#fff" : "#000"}
                onPress={() => router.push("./flatlist")}
                mx={10} my={10} />
            <ThemedText type='title' align='center' color={theme === "light" ? "#000" : "#fff"}>Welcome to Ur page</ThemedText>
            <ThemeButton
                txtColor='#fff'
                txt='Login To Continue'
                style={{ elevation: 1 }}
                icon={<AntDesign name='google' size={20} color='#fff' />}
                mx={10}
                my={10}
            />
            <ThemeButton
                txtColor='#fff'
                bgColor='#4267B2'
                txt='Login To Facebook'
                style={{ elevation: 1 }}
                icon={<FontAwesome name="facebook" size={20} color="#fff" />}
                mx={10}
                my={10}
            />
        </View>
    )
}