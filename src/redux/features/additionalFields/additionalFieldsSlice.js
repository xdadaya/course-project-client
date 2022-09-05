import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";
import {registerUser} from "../auth/authSlice";
import {toast} from "react-toastify";

const initialState = {
    isLoading: false,
    fields: []
}

export const getAdditionalFields = createAsyncThunk('additionalFields/getAdditionalFields', async(id) => {
    try{
        const data = await axios.get(`/addfields/${id}`)
        return data
    } catch (e) {
        console.log(e)
    }
})


export const additionalFieldsSlice = createSlice({
    name: 'additionalFields',
    initialState,
    reducers: {
        addAdditionalField(state, action){
            const fieldName = action.payload['fieldName']
            const fieldType = action.payload['fieldType']
            const index = state.fields.findIndex(field => {
                return field.inputName === fieldName && field.inputType === fieldType
            });
            if(index === -1) state.fields = [...state.fields, {inputName: fieldName, inputType: fieldType}]
            else toast("This additional field is already exists")
        },
        deleteAdditionalField(state, action){
            const fieldName = action.payload['inputName']
            const fieldType = action.payload['inputType']
            const index = state.fields.findIndex(field => {
                return field.inputName === fieldName && field.inputType === fieldType
            });
            state.fields = [...state.fields.slice(0, index),
                ...state.fields.slice(index + 1)
            ]
        },
        resetAdditionalField(state){
            state.fields = []
        }
    },
    extraReducers: {
        [getAdditionalFields.pending]: (state) => {
            state.isLoading = true
        },
        [getAdditionalFields.fulfilled]: (state, action) => {
            state.isLoading = false
            state.fields = action.payload.data
        },
        [getAdditionalFields.rejected]: (state, action) => {
            state.isLoading = false
        },
    }
})

export const { addAdditionalField, deleteAdditionalField, resetAdditionalField } = additionalFieldsSlice.actions
export default additionalFieldsSlice.reducer