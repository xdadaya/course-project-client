import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {toast} from "react-toastify";

const initialState = {
    users: [],
    isLoading: false,
}

export const getUsers = createAsyncThunk('users/getUsers', async() => {
    try{
        const data = await axios.get('/users')
        return data
    }catch (e) {
        console.log(e)
    }
})

export const blockUsers = async(ids) => {
    try{
        const {data} = await axios.post('/users/block', {ids})
        toast(data.message)
    } catch (e) {
        toast(e.response.data.message)
    }
}

export const unblockUsers = async(ids) => {
    try{
        const {data} = await axios.post('/users/unblock', {ids})
        toast(data.message)
    } catch (e) {
        toast(e.response.data.message)
    }
}

export const setAdminUsers = async(ids) => {
    try{
        const {data} = await axios.post('/users/setadmin', {ids})
        toast(data.message)
    } catch (e) {
        toast(e.response.data.message)
    }
}

export const removeAdminUsers = async(ids) => {
    try{
        const {data} = await axios.post('/users/removeadmin', {ids})
        toast(data.message)
    } catch (e) {
        toast(e.response.data.message)
    }
}

export const deleteUsers = async(ids) => {
    try{
        const {data} = await axios.post('/users/delete', {ids})
        toast(data.message)
    } catch (e) {
        toast(e.response.data.message)
    }
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state) => {
            state.isLoading = true
        },
        [getUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.users = action.payload.data.users
        },
        [getUsers.rejected]: (state) => {
            state.isLoading = false
        },

    }
})

export default usersSlice.reducer