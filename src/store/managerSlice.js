import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCategory = createAsyncThunk(
    'manager/addCategory',
    async (newCategory) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`http://127.0.0.1:8000/categories/`,
            {
                category_name:newCategory.category_name
            }, requestOptions);
        return response.data
    }
)


export const putCategory = createAsyncThunk(
    'manager/putCategory',
    async (newCategory) => {
        const token = localStorage.getItem('accessToken')
        console.log('DATA TO PUT', newCategory)
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put(`http://127.0.0.1:8000/categories/${newCategory.id_category}/`,
            {
                id_category:newCategory.id_category,
                category_name:newCategory.category_name
            }, requestOptions);
        return response.data
    }
)


export const deleteCategory = createAsyncThunk(
    'manager/deleteCategory',
    async (id_category) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.delete(`http://127.0.0.1:8000/categories/${id_category}/`,
            requestOptions);
        return response.data
    }
)


export const fetchCategories = createAsyncThunk(
    'manager/fetchCategories',
    async () => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(`http://127.0.0.1:8000/categories/`, requestOptions);
        return response.data
    }
)


export const addService = createAsyncThunk(
    'manager/addService',
    async (newService) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.post(`http://127.0.0.1:8000/services/`,
            {
                service_name:newService.service_name,
                price: newService.price,
                image:newService.image,
                description:newService.description,
                id_category: newService.id_category,
            }, requestOptions);
        return response.data
    }
)

export const putService = createAsyncThunk(
    'manager/putService',
    async (newService) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.put(`http://127.0.0.1:8000/services/${newService.id_service}/`,
            {
                id_service:newService.id_service,
                service_name:newService.service_name,
                price: newService.price,
                image:newService.image,
                description:newService.description,
                id_category: newService.id_category,
            }, requestOptions);
        return response.data
    }
)


export const deleteService = createAsyncThunk(
    'manager/deleteService',
    async (id_service) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios.delete(`http://127.0.0.1:8000/services/${id_service}/`,
            requestOptions);
        return response.data
    }
)


export const fetchUsers = createAsyncThunk(
    'manager/fetchUsers',
    async () => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(`http://127.0.0.1:8000/users/`, requestOptions);
        return response.data
    }
)

export const fetchStatus = createAsyncThunk(
    'manager/fetchStatus',
    async (old=false) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        let reqStr=`http://127.0.0.1:8000/status/`;
        if(old){
            reqStr+=`?old`;
        }
        const response = await axios(reqStr, requestOptions);
        return response.data
    }
)
export const accessUser = createAsyncThunk(
    'manager/accessUser',
    async (old=false) => {
        const token = localStorage.getItem('accessToken')
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        }
        const response = await axios(`http://localhost:8000/api/user`, requestOptions);
        return response.data
    }
)


export const managerSlice = createSlice({
    name: "buySlice",
    initialState: {
        categories:[],
        users:[],
        statusList:[],
        pickedStatus:0,
        pickedStart:null,
        pickedEnd: null,
        pickedUser:0,
        isManager:false,


    },
    reducers: {
        pickStatus: (state, action) => {
            state.pickedStatus = Number(action.payload);
        },
        pickUser: (state, action) => {
            state.pickedUser = Number(action.payload);
        },
        pickStart: (state, action) => {
            state.pickedStart = action.payload;
        },
        pickEnd: (state, action) => {
            state.pickedEnd = action.payload;
        },
        setIsManager: (state, action) => {
            state.isManager = action.payload;
        },

    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder

            .addCase(addCategory.pending, (state, action) => {
                // state.buyStatus = 'loading'
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                // state.choices=action.payload
                // state.buyStatus = 'succeeded'
            })
            .addCase(addCategory.rejected, (state, action) => {
                // state.buyStatus = 'failed'
                // state.buyError = action.error.message
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories=action.payload
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users=action.payload
            })
            .addCase(fetchStatus.fulfilled, (state, action) => {
                state.statusList=action.payload
            })
            .addCase(accessUser.fulfilled, (state, action) => {
                state.isManager = action.payload.groups.includes('Manager');
            })

    },
});


// Action creators are generated for each case reducer function
export const {pickEnd, pickStart, pickStatus, pickUser, setIsManager} = managerSlice.actions;

export default managerSlice.reducer;