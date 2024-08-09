import { createSlice, configureStore } from '@reduxjs/toolkit'

const informationsSlice = createSlice({
    name: 'informations',
    initialState: {value: 'data'},
    reducers: {
        setInformation: (state, action) => {
            state.value = action.payload
        }
    }
})

export const store = configureStore({
    reducer:{
        informations: informationsSlice.reducer
    }
})

export const { setInformation } = informationsSlice.actions