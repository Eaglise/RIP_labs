import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChoices = createAsyncThunk(
    'choice/fetchChoice',
    async () => {
        const response = await axios(`http://127.0.0.1:8000/choice/`);
        return response.data
    }
)
export const addChoice = createAsyncThunk(
    'choice/addChoice',
    async (newChoice) => {
        const response = await axios.post(`http://127.0.0.1:8000/choice/`, newChoice);
        return response.data
    }
)
export const deleteChoice = createAsyncThunk(
    'choice/deleteChoice',
    async (choice_pk) => {
        const response = await axios.delete(`http://127.0.0.1:8000/choice/${choice_pk}`);
        return response.data
    }
)

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (newOrder) => {
        const response = await axios.post(`http://127.0.0.1:8000/order/`,
            {
                id_choice:newOrder.choice_pk,
                id_client:newOrder.client_pk,
                id_manager:newOrder.manager_pk,
                id_status:newOrder.status_pk
            });
        return response.data
    }
)

export const putOrder = createAsyncThunk(
    'order/putOrder',
    async (newOrder) => {
        const response = await axios.put(`http://127.0.0.1:8000/order/${newOrder.order_pk}/`,
            {
                sum:newOrder.sum,
                id_choice:newOrder.choice_pk,
                id_client:newOrder.client_pk,
                id_manager:newOrder.manager_pk,
                id_status:newOrder.status_pk
            });
        return response.data
    }
)

export const fetchCart = createAsyncThunk(
    'buy/fetchCart',
    async () => {
        const response = await axios(`http://127.0.0.1:8000/curr_order?user=${1}`);
        return response.data
    }
)

export const fetchOrder = createAsyncThunk(
    'buy/fetchOrder',
    async () => {
        const response = await axios(`http://127.0.0.1:8000/order?user=${1}&current`);
        return response.data
    }
)
export const fetchOldOrder = createAsyncThunk(
    'buy/fetchOldOrder',
    async () => {
        const response = await axios(`http://127.0.0.1:8000/order?user=${1}&old`);
        return response.data
    }
)
export const getSum = createAsyncThunk(
    'buy/getSum',
    async (items) => {
        let sum=0
        for(let item in items){
            sum+=item.service_pk.price
        }
        return sum
    }
)


export const buySlice = createSlice({
    name: "buySlice",
    initialState: {
        sales:[],
        buyStatus:'loading',
        buyError:null,
        amount:0,
        basket:[],
        delivery:null,
        oldDelivery:[],
        sum:0,
        sumStatus : 'loading',
        isUser:true,
        auth:'Выйти',

    },
    reducers: {
        // updateAmount: (state, action) => {
        //     state.amount = Math.abs(action.payload);
        // },
        updateSum: (state, action) => {
            state.sum = Math.abs(action.payload);
        },
        countSum: (state, action) => {
            state.sum=0;
            for (let item in state.order){
                state.sum+=item.service_pk.price
            }
        },
        updateUserState: (state, action) => {
            state.isUser = !(state.isUser);
            if(state.isUser){
                state.auth = 'Выйти';
            }
            else{
                state.auth='Войти';
            }
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder

            .addCase(fetchChoices.pending, (state, action) => {
                state.buyStatus = 'loading'
            })
            .addCase(fetchChoices.fulfilled, (state, action) => {
                state.choice=action.payload
                state.buyStatus = 'succeeded'

            })
            .addCase(fetchChoices.rejected, (state, action) => {
                state.buyStatus = 'failed'
                state.buyError = action.error.message
            })
            .addCase(fetchCart.pending, (state, action) => {
                state.buyStatus = 'loading'
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.cart=action.payload
                state.buyStatus = 'succeeded'
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.buyStatus = 'failed'
                state.buyError = action.error.message
            })
            .addCase(deleteChoice.pending, (state, action) => {
                // state.buyStatus = 'loading'
            })
            .addCase(deleteChoice.fulfilled, (state, action) => {
                // state.buyStatus = 'succeeded'
            })
            .addCase(deleteChoice.rejected, (state, action) => {
                // state.buyStatus = 'failed'
                // state.buyError = action.error.message
            })
            .addCase(getSum.fulfilled, (state, action) => {
                // state.buyStatus = 'succeeded'
                state.sum=action.payload
            })
            .addCase(fetchOrder.pending, (state, action) => {
                state.buyStatus = 'loading'
            })
            .addCase(fetchOrder.fulfilled, (state, action) => {
                state.order=action.payload[0]
                state.buyStatus = 'succeeded'
            })
            .addCase(fetchOrder.rejected, (state, action) => {
                state.buyStatus = 'failed'
                state.buyError = action.error.message
            })
            .addCase(fetchOldOrder.fulfilled, (state, action) => {
                state.oldOrder=action.payload
            })
    },
});


// Action creators are generated for each case reducer function
export const { updateAmount, updateSum, countSum, updateUserState} = buySlice.actions;

export default buySlice.reducer;