import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {toast} from "react-toastify";

const initialState = {
    comments: [],
    isLoading: false,
}

export const getCommentByItemId = createAsyncThunk('comment/getCommentByItemId', async(id) => {
    try{
        const data = await axios.get(`/comment/${id}`)
        return data
    } catch (e) {
        console.log(e)
    }
})

export const createComment = createAsyncThunk('comment/createComment', async(params) => {
    try{
        const {data} = await axios.post(`/comment/${params.id}`, params)
        return data
    }catch (e) {
        console.log(e)
    }
})

export const CommentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: {
        //Получение всех комментариев
        [getCommentByItemId.pending]: (state)=>{
            state.isLoading = true
        },
        [getCommentByItemId.fulfilled]: (state,action)=>{
            state.isLoading = false
            state.comments = action.payload.data
        },
        [getCommentByItemId.rejected]: (state)=>{
            state.isLoading = false
        },

        //Создание комментария
        [createComment.pending]: (state)=>{
            state.isLoading = true
        },
        [createComment.fulfilled]: (state,action)=>{
            state.isLoading = false
            state.comments = [...state.comments, action.payload]
        },
        [createComment.rejected]: (state)=>{
            state.isLoading = false
        },
    }
})

export default CommentSlice.reducer