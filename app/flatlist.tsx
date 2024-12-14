import { View, Text, FlatList, StyleSheet, Image, ScrollView } from "react-native"

import { useDispatch } from "react-redux";

import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/store/features/productSlice";
import { ThemedText } from "@/components/ThemedText";
import { Category, Product } from "@/constants/Interface";
import { ThemeButton } from "@/components/ThemedButton";
import { router } from "expo-router";
import axios from "axios";


function flatlist() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [limit, setLimit] = useState<number>(20);
    const [skip, setSkip] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [chosenCategory, setChosenCategory] = useState<string>("");
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        getProducts()
    }, [chosenCategory, limit, skip])

    useEffect(() => {
        getCategories()
    }, [])
    console.log("products=>", products)
    console.log("setCategories=>", categories)
    console.log("total=>", total)
    console.log("chosenCategory=>", chosenCategory)

    async function getCategories() {
        let categories: any = await axios("https://dummyjson.com/products/categories")
        setCategories(categories.data);
    }

    async function getProducts() {
        let url = chosenCategory && chosenCategory != "all"
            ? `https://dummyjson.com/products/category/${chosenCategory}`
            : "https://dummyjson.com/products"
        let products: any = await axios(`${url}?limit=${limit}&skip${skip}`)
        setProducts(products.data.products);
        console.log('first', products.data.total)
        setTotal(products.data.total)
    }

    // const { products, status } = useSelector((state: RootState) => state.products);
    const theme = useSelector((state: RootState) => state.theme.theme);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchProducts());
    //     console.log(products);
    // }, [dispatch]);

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

            <View style={{ margin: 10, }}>
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
                                    showsVerticalScrollIndicator={false}
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