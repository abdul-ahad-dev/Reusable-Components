import { Product } from '@/constants/Interface';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('https://dummyjson.com/products');
    console.log(response.data.products);
    return response.data.products;
});

interface ProductsState {
    products: Product[]
    status: 'idle' | 'pending' | 'succeeded' | 'failed'
}

const initialState: ProductsState = {
    products: [],
    status: 'idle'
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'pending';
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    },
});


export const { toggleTheme } = productSlice.actions;

export default productSlice.reducer;