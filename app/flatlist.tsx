import { View, Text, FlatList, StyleSheet, Image, ScrollView } from "react-native"

import { useDispatch } from "react-redux";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "@/store/features/productSlice";
import { ThemedText } from "@/components/ThemedText";
import { Product } from "@/constants/Interface";
import { ThemeButton } from "@/components/ThemedButton";
import { router } from "expo-router";

function flatlist() {
    const { products, status } = useSelector((state: RootState) => state.products);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        console.log(products);
    }, [dispatch]);

    return (
        <View style={[styles.container, { backgroundColor: theme === "light" ? "#fff" : "#000" }]}>
            <ThemedText
                type='title'
                align='center'
                color={theme === "light" ? "#000" : "#fff"}
                style={{ marginBottom: 20 }}
            >
                Learning Flatlist
            </ThemedText>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toLocaleString()}
                renderItem={({ item, index }: { item: Product; index: number }) => (
                    <View key={index} style={[styles.item, { backgroundColor: theme === "light" ? "#ddd" : "#1a1a1a" }]}>
                        <Image source={{ uri: item.thumbnail }} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <ThemedText type="defaultSemiBold">{item.title}</ThemedText>
                            <ThemedText
                                style={{
                                    height: 42,
                                    overflow: 'hidden',
                                    wordWrap: 'break-word',
                                    textOverflow: 'ellipsis',
                                }}
                                type="small">{item.description}</ThemedText>

                            <View style={styles.tags}>
                                <ThemedText type="small">Tags: </ThemedText>
                                <FlatList
                                    data={item.tags}
                                    keyExtractor={(tag, tagIndex) => `${item.id}-${tagIndex}`}
                                    horizontal
                                    renderItem={({ item: tag }) => (
                                        <Text style={[styles.cardTags, 
                                            { 
                                                backgroundColor: theme === "light" ? "#aaa" : "#ddd",
                                                color: theme === "light" ? "#fff" : "#000"
                                             }]}>{tag}{" "}</Text>
                                    )}
                                />
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <ThemedText type="small">Price: <Text style={{ fontWeight: 600 }}>{item.price}</Text></ThemedText>
                                <ThemedText type="small">Rating: <Text style={{ fontWeight: 600 }}>{item.rating}</Text></ThemedText>
                            </View>

                        </View>
                    </View>
                )
                }
            />

            <ThemeButton
                onPress={() => router.back()}
                mx={10}
                bgColor={theme === "light" ? "#f57c00" : "#ffb74d"}
                txtColor={theme === "light" ? "#fff" : "#000"}
                txt="Go Back"
                style={{ elevation: 1 }}
            />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 10,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 10,
        marginRight: 10,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    tags: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 4
    },
    cardTags: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
        marginRight: 4
    }
})

export default flatlist