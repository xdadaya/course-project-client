import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {toast} from "react-toastify";

const initialState = {
    items: [],
    isLoading: false,
}

export const getItemsByCollectionId = createAsyncThunk('item/getItemsByCollectionId', async(id) => {
    try{
        const data = await axios.get(`/item/${id}`)
        return data
    }catch (e) {
        console.log(e)
    }
})

export const createItemInCollection = createAsyncThunk('item/createItemInCollection', async(params) => {
    try{
        const data = await axios.post(`/item/${params.id}`, params)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const deleteItemInCollection = createAsyncThunk('item/deleteItemInCollection', async(id)=>{
    try{
        const {data} = await axios.delete(`/item/${id}`, id)
        toast(data.message)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const likeItem = createAsyncThunk('item/likeItem', async(id) => {
    try{
        const {data} = await axios.put(`/item/like`, id)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const dislikeItem = createAsyncThunk('item/dislikeItem', async(id) => {
    try{
        const {data} = await axios.put(`/item/dislike`, id)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const ItemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение всех предметов
        [getItemsByCollectionId.pending]: (state) => {
            state.isLoading = true
        },
        [getItemsByCollectionId.fulfilled]: (state, action) => {
            state.isLoading = false
            state.items = action.payload.data
        },
        [getItemsByCollectionId.rejected]: (state) => {
            state.isLoading = false
        },

        //Создание предмета
        [createItemInCollection.pending]: (state) => {
            state.isLoading = true
        },
        [createItemInCollection.fulfilled]: (state, action) => {
            state.isLoading = false
            state.items = [...state.items, action.payload.data]
        },
        [createItemInCollection.rejected]: (state) => {
            state.isLoading = false
        },

        //Удаление предмета
        [deleteItemInCollection.pending]: (state) => {
            state.isLoading = true
        },
        [deleteItemInCollection.fulfilled]: (state, action) => {
            state.isLoading = false
            const index = state.items.findIndex(item => {
                return item.id === action.payload._id;
            });
            state.items=[
                ...state.items.slice(0, index),
                ...state.items.slice(index + 1)
            ]
        },
        [deleteItemInCollection.rejected]: (state) => {
            state.isLoading = false
        },

        //Like
        [likeItem.pending]: (state) => {
            state.isLoading = true
        },
        [likeItem.fulfilled]: (state, action) => {
            state.isLoading = false
            const index = state.items.findIndex(item => {
                return item.id === action.payload._id;
            });
            state.items=[
                ...state.items.slice(0, index),
                action.payload.item,
                ...state.items.slice(index + 1)
            ]
        },
        [likeItem.rejected]: (state) => {
            state.isLoading = false
        },

        //Like
        [dislikeItem.pending]: (state) => {
            state.isLoading = true
        },
        [dislikeItem.fulfilled]: (state, action) => {
            state.isLoading = false
            const index = state.items.findIndex(item => {
                return item.id === action.payload._id;
            });
            state.items=[
                ...state.items.slice(0, index),
                action.payload.item,
                ...state.items.slice(index + 1)
            ]
        },
        [dislikeItem.rejected]: (state) => {
            state.isLoading = false
        },
    }
})


export default  ItemSlice.reducer