import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchServices = createAsyncThunk(
    'services/fetchServices',
    async () => {
        const response = await axios(`http://127.0.0.1:8000/services/`);
        return response.data
    }
)

export const servicesSlice = createSlice({
    name: "servicesSlice",
    initialState: {
        services:[],
        servicesStatus:'loading',
        servicesError:null
    },
    reducers: {
        // set_certificate_pk: (state, action) => {
        //   state.certificate_pk = action.payload;
        // }
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
    },
});

export default servicesSlice.reducer;