import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {fetchServices} from "./servicesSlice";

export const fetchService = createAsyncThunk(
    'service/fetchService',
    async (service_pk) => {
        const response = await axios(`http://127.0.0.1:8000/services/${service_pk}/`);
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
        // set_certificate_pk: (state, action) => {
        //   state.certificate_pk = action.payload;
        // }
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