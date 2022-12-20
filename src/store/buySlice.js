import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChoices = createAsyncThunk(
    'choice/fetchChoice',
    async () => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(`http://127.0.0.1:8000/choice/`, requestOptions);
        return response.data
    }
)
export const addChoice = createAsyncThunk(
    'choice/addChoice',
    async (newChoice) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`http://127.0.0.1:8000/choice/`, newChoice, requestOptions);
        return response.data
    }
)
export const deleteChoice = createAsyncThunk(
    'choice/deleteChoice',
    async (id_choice) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.delete(`http://127.0.0.1:8000/choice/${id_choice}`, requestOptions);
        return response.data
    }
)

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (newOrder) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`http://127.0.0.1:8000/order/`,
            {
                id_client:newOrder.id_client,
                id_manager:newOrder.id_manager,
                status:newOrder.status
            }, requestOptions);
        return response.data
    }
)

export const putOrder = createAsyncThunk(
    'order/putOrder',
    async (newOrder) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        console.log(newOrder)
        const response = await axios.put(`http://127.0.0.1:8000/order/${newOrder.id_order}/`,
            {
                sum:newOrder.sum,
                id_client:newOrder.id_client,
                id_manager:newOrder.id_manager,
                status:newOrder.status
            }, requestOptions);
        return response.data
    }
)

export const fetchCart = createAsyncThunk(
    'buy/fetchCart',
    async () => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        console.log(requestOptions)
        console.log(token)
        const response = await axios(`http://127.0.0.1:8000/curr_order?user=${localStorage.getItem('userId')}`, requestOptions);
        return response.data
    }
)

export const fetchCurrChoice = createAsyncThunk(
    'buy/fetchCurrChoice',
    async () => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(`http://127.0.0.1:8000/curr_choice?user=${localStorage.getItem('userId')}`, requestOptions);
        return response.data
    }
)

export const fetchOrder = createAsyncThunk(
    'buy/fetchOrder',
    async () => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(`http://127.0.0.1:8000/order?user=${localStorage.getItem('userId')}&current`, requestOptions);
        return response.data
    }
)
export const fetchOldOrder = createAsyncThunk(
    'buy/fetchOldOrder',
    async () => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(`http://127.0.0.1:8000/order?user=${localStorage.getItem('userId')}&old`, requestOptions);
        return response.data
    }
)
export const getSum = createAsyncThunk(
    'buy/getSum',
    async (items) => {
        let sum=0
        for(let item in items){
            sum+=item.id_service.price
        }
        return sum
    }
)


export const buySlice = createSlice({
    name: "buySlice",
    initialState: {
        choices:[],
        curr_choices:[],
        buyStatus:'loading',
        buyError:null,
        cart:[],
        order:null,
        oldOrder:[],
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
                state.sum+=item.id_service.price
            }
        },
        updateUserState: (state, action) => {
            state.isUser = !(state.isUser);
            console.log('update user state')
            if(state.isUser){
                state.auth = 'Выйти';
            }
            else{
                state.auth='Войти';
            }
        },
        updateUserComment: (state, action) => {
            state.user_comment = action.payload
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder

            .addCase(fetchChoices.pending, (state, action) => {
                state.buyStatus = 'loading'
            })
            .addCase(fetchChoices.fulfilled, (state, action) => {
                state.choices=action.payload
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
                state.cart=action.payload[0]
                state.buyStatus = 'succeeded'
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.buyStatus = 'failed'
                state.buyError = action.error.message
            })
            .addCase(fetchCurrChoice.pending, (state, action) => {
                state.buyStatus = 'loading'
            })
            .addCase(fetchCurrChoice.fulfilled, (state, action) => {
                state.curr_choices=action.payload
                state.buyStatus = 'succeeded'
            })
            .addCase(fetchCurrChoice.rejected, (state, action) => {
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
export const { updateAmount, updateSum, countSum, updateUserState, updateUserComment} = buySlice.actions;

export default buySlice.reducer;