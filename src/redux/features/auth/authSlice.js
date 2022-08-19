import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "../../../utils/axios";
import {toast} from "react-toastify";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
}

export const registerUser = createAsyncThunk('auth/registerUser', async ({username, password}) => {
    try {
        const {data} = await axios.post('/auth/register', {
            username,
            password
        })
        toast(data.message)
        if (data.token) window.localStorage.setItem('token', data.token)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async ({username, password}) => {
    try {
        const {data} = await axios.post('/auth/login', {
            username,
            password
        })
        toast(data.message)
        if (data.token) window.localStorage.setItem('token', data.token)
        else window.localStorage.clear()
        return data
    } catch (e) {
        console.log(e)
    }
})

export const getUser = createAsyncThunk('auth/loginUser', async () => {
    if(window.localStorage.getItem('token')){
    try {
        const {data} = await axios.get('/auth/getuser')
        return data
    } catch (e) {
        console.log('auth failed')
    }}
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoading = false
            state.status = null
        }
    },
    extraReducers: {
        //Register user
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //Login user
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },

        //Get user
        [getUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        },
        [getUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        },
        [getUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        },
    }
})

export const checkIsAuth = state => Boolean(state.auth.token)
export const checkIsAdmin = state => (state.auth.user) ?  Boolean(state.auth.user.isAdmin) : false

export const { logout } = authSlice.actions
export default authSlice.reducer