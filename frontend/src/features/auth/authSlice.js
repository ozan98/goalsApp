import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null, // if there is user in local storage use that user if not null
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Register User // async thunk fucntions
//createAsyncThunk takes in a string as the action and a function that takes in a user and thinkAPI
//user is sent in throug the register page
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
                        error.message || error.toString()
        
        return thunkAPI.rejectWithValue(message)
    }
})


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: () => {}
}) 

export const {reset} = authSlice.actions
export default authSlice.reducer