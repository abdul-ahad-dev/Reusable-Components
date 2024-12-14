import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, RefreshControl } from "react-native"
import { useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { ThemedText } from "@/components/ThemedText";
import { ThemeButton } from "@/components/ThemedButton";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Category, Product } from "@/constants/Interface";

import { useSelector } from "react-redux";
import { fetchProducts } from "@/store/features/productSlice";


function FlatListScreen() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [limit, setLimit] = useState<number>(20);
    const [total, setTotal] = useState<number>(0);
    const [chosenCategory, setChosenCategory] = useState<string>("all");
    const [loading, setLoading] = useState<Boolean>(false)
    const [refreshing, setRefreshing] = useState<Boolean>(false);
    
    useEffect(() => {
        getCategories()
    }, []);

    useEffect(() => {
        getProducts()
    }, [chosenCategory, limit])

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setProducts();
    }, []);

    async function getCategories() {
        let categories: any = await axios("https://dummyjson.com/products/categories");
        setCategories(categories.data);
    }

    async function getProducts() {
        let url = chosenCategory && chosenCategory != "all"
            ? `https://dummyjson.com/products/category/${chosenCategory}`
            : "https://dummyjson.com/products"
        let products: any = await axios(`${url}?limit=${limit}`)
        setProducts(products.data.products);
        setTotal(products.data.total)
        setRefreshing(false);
    }

    // const { products, status } = useSelector((state: RootState) => state.products);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchProducts());
    //     console.log(products);
    // }, [dispatch]);

    return (
        <ThemedView style={[styles.container, { backgroundColor: theme === "light" ? "#fff" : "#000" }]}>
            <ThemedText
                type='title'
                align='center'
                color={theme === "light" ? "#000" : "#fff"}
                style={{ marginBottom: 20 }}
            >
                Learning Flatlist
            </ThemedText>

            <View style={{ marginVertical: 10, }}>
                <FlatList
                    data={[{ slug: "all", name: "All" }, ...categories]}
                    keyExtractor={(data) => data.slug}
                    horizontal={true}
                    contentContainerStyle={{ gap: 5 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }: { item: Category }) => {
                        let isChosen = item.slug == chosenCategory
                        return (
                            <ThemeButton
                                activeOpacity={0.9}
                                onPress={() => setChosenCategory(item.slug)}
                                style={styles.chip}
                                bgColor={isChosen ? "#000" : "#fff"}
                                txtColor={isChosen ? "#fff" : "#000"}
                                txt={item.name}
                            />
                        )
                    }}
                />
            </View>

            <FlatList
                data={products}
                numColumns={2}
                columnWrapperStyle={{ gap: 5 }}
                onEndReachedThreshold={0.8}
                onEndReached={() => {
                    if (limit < total) {
                        setLimit(limit + 20)
                    }
                }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toLocaleString()}
                renderItem={({ item, index }: { item: Product; index: number }) => (
                    <View key={index} style={[styles.item, { backgroundColor: theme === "light" ? "#ddd" : "#1a1a1a", flex: 1, flexDirection: 'column' }]}>
                        <Image source={{ uri: item.thumbnail }} style={styles.image} />
                        <View style={{ flex: 1 }}>
                            <ThemedText numberOfLines={2} type="defaultSemiBold">{item.title}</ThemedText>
                            <ThemedText
                                numberOfLines={2}
                                type="small">{item.description}</ThemedText>
                            <ThemedText type="small">Price: <Text style={{ fontWeight: 600 }}>{item.price}</Text></ThemedText>
                            <ThemedText type="small">Rating: <Text style={{ fontWeight: 600 }}>{item.rating}</Text></ThemedText>
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
        </ThemedView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    chip: {
        borderColor: "gray",
        borderWidth: 1,
        paddingVertical: 5
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
        resizeMode: 'contain',
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

export default FlatListScreen