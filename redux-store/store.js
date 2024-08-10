import { createSlice, configureStore } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'users',
    initialState: {value: []},
    reducers: {
        setUser: (state, action) => {
            state.value = [...state.value, JSON.stringify(action.payload)]
        }
    }
})

export const store = configureStore({
    reducer:{
        userSlice: userSlice.reducer
    }
})

export const { setUser } = userSlice.actions