import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Bookservice from "../../services/solution.service";

const initialState = {
    books: [],
    currentBook: null,
    currentQuestion: null,
    loading: false,
    error: null,
}

// getAllBooks
export const getAllBooks = createAsyncThunk(
    "books/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await Bookservice.getAll();
            return response.data?.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "An error occurred");
        }
    }
);

// getOnebook
export const getOnebook = createAsyncThunk(
    "books/getOnebook",
    async (id, { rejectWithValue }) => {
        try {
            const response = await Bookservice.get(id);
            return response.data?.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "An error occurred");
        }
    }
);

export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        setCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBooks.fulfilled, (state, action) => {
                state.books = action.payload;
                state.loading = false;
            })
            .addCase(getAllBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOnebook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOnebook.fulfilled, (state, action) => {
                state.currentBook = action.payload;
                state.loading = false;
            })
            .addCase(getOnebook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectAllBooks = state => state.books.books;
export const selectCurrentBook = state => state.books.currentBook;
export const selectCurrentQuestion = state => state.books.currentQuestion;
export const selectBooksLoading = state => state.books.loading;
export const selectBooksError = state => state.books.error;

export const { setCurrentQuestion } = bookSlice.actions;
export default bookSlice.reducer;
