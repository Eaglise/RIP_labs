import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {fetchServices} from "./servicesSlice";

export const fetchService = createAsyncThunk(
    'service/fetchService',
    async (id_service) => {
        const response = await axios(`http://127.0.0.1:8000/ext_services/${id_service}/`);
        return response.data
    }
)


export const serviceSlice = createSlice({
    name: "serviceSlice",
    initialState: {
        service:null,
        serviceStatus:'loading',
        serviceError:null
    },
    reducers: {

    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchService.pending, (state, action) => {
                state.serviceStatus = 'loading'
            })
            .addCase(fetchService.fulfilled, (state, action) => {
                state.service=action.payload
                state.serviceStatus = 'succeeded'

            })
            .addCase(fetchService.rejected, (state, action) => {
                state.serviceStatus = 'failed'
                state.serviceError = action.error.message

            })
    },
});

export default serviceSlice.reducer;