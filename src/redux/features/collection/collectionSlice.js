import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    collections: [],
    fiveBiggestCollection: [],
    isLoading: false,
}

export const createCollection = createAsyncThunk('collection/createCollection', async(params) => {
    try{
        const data = await axios.post('/collection', params)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const deleteCollection = createAsyncThunk('collection/deleteCollection', async(id) =>{
    try{
        const {data} = axios.delete(`/collection/${id}`, id)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const updateCollection = createAsyncThunk('collection/deleteCollection', async(params) => {
    try{
        const {data} = await axios.put(`/collection/${params.id}`, params)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const getAllCollections = createAsyncThunk('collection/getAllCollections', async() => {
    try{
        const data = await axios.get('/collection')
        return data
    }catch (e) {
        console.log(e)
    }
})

export const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {},
    extraReducers: {
        //Создание коллекции
        [createCollection.pending]: (state) => {
            state.isLoading = true
        },
        [createCollection.fulfilled]: (state, action) => {
            state.isLoading = false
            state.collections = [action.payload.data, ...state.collections]
        },
        [createCollection.rejected]: (state) => {
            state.isLoading = false
        },

        //Удаление коллекции
        [deleteCollection.pending]: (state) => {
            state.isLoading = true
        },
        [deleteCollection.fulfilled]: (state, action) => {
            state.isLoading = false
            state.collections = state.collections.filter((collection) => collection._id !== action.payload._id)
        },
        [deleteCollection.rejected]: (state) => {
            state.isLoading = false
        },

        //Обновление коллекции
        [updateCollection.pending]: (state) => {
            state.isLoading = true
        },
        [updateCollection.fulfilled]: (state, action) => {
            state.isLoading = false
            const index = state.collections.findIndex((collection) => collection._id === action.payload._id)
            state.collections[index] = action.payload
        },
        [updateCollection.rejected]: (state) => {
            state.isLoading = false
        },

        //Получение всех коллекций
        [getAllCollections.pending]: (state) => {
            state.isLoading = true
        },
        [getAllCollections.fulfilled]: (state, action) => {
            state.isLoading = false
            state.collections = action.payload.data.collections
            state.fiveBiggestCollection = action.payload.data.fiveBiggestCollection
        },
        [getAllCollections.rejected]: (state) => {
            state.isLoading = false
        },
    },
})

export default collectionSlice.reducer