import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "../../services/question.service";

const initialState = {
    questions: [],
    loading: false,
    error: null,
}

export const getAllquestions = createAsyncThunk(
    "questions/get",
    async () => {
        try {
            const response = await questionService.getAll();
            return response.data?.data;
        } catch (err) {
            if (!err.response) {
                throw err;
            }
            Promise.reject(err.response);
        }
    })

export const getAllquestionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllquestions.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllquestions.fulfilled, (state, action) => {
                state.loading = false;
                state.questions = action.payload;
                state.error = null;
            })
            .addCase(getAllquestions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
})

export const selectGetAllquestions = (state) => state.questions.questions;
export const getquestionsStatus = (state) => state.questions.loading;
export const getquestionsError = (state) => state.questions.error;
export default getAllquestionsSlice.reducer;

