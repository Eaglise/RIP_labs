import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async () => {
        const response = await axios(`http://127.0.0.1:8000/services/`);
        return response.data
    }
)
export const filterServices = createAsyncThunk(
    'services/filterServices',
    async (params) => {
        const response = await axios(`http://127.0.0.1:8000/services?search=${params.search}&min=${params.min}&max=${params.max}`);
        return response.data
    }
)
export const fetchPrices = createAsyncThunk(
    'services/fetchPrices',
    async (params) => {
        const response = await axios(`http://127.0.0.1:8000/min_max_price`);
        return response.data
    }
)

export const servicesSlice = createSlice({
    name: "servicesSlice",
    initialState: {
        services:[],
        servicesStatus:'loading',
        servicesError:null,
        search_input:'',
        prices:[],
        maxPrice:0,
        minPrice:0,
        maxBorder:0,
        minBorder:0
    },
    reducers: {
        updateSearchInput: (state, action) => {
            state.search_input = action.payload;
        },
        updatePrices: (state, action) => {
            state.maxPrice = action.payload.maxPrice;
            state.minPrice = action.payload.minPrice;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchServices.pending, (state, action) => {
                state.servicesStatus = 'loading'
            })
            .addCase(fetchServices.fulfilled, (state, action) => {
                state.services=action.payload
                state.servicesStatus = 'succeeded'

            })
            .addCase(fetchServices.rejected, (state, action) => {
                state.servicesStatus = 'failed'
                state.servicesError = action.error.message

            })

            .addCase(filterServices.pending, (state, action) => {
                state.servicesStatus = 'loading'
            })
            .addCase(filterServices.fulfilled, (state, action) => {
                state.services=action.payload
                state.servicesStatus = 'succeeded'

            })
            .addCase(filterServices.rejected, (state, action) => {
                state.servicesStatus = 'failed'
                state.servicesError = action.error.message
            })
            .addCase(fetchPrices.fulfilled, (state, action) => {
                state.maxPrice=action.payload.max_price
                state.minPrice=action.payload.min_price
                state.maxBorder=action.payload.max_price
                state.minBorder=action.payload.min_price
            })
    },
});
export const { updateSearchInput, updatePrices} = servicesSlice.actions;
export default servicesSlice.reducer;