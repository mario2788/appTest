


import { createSlice } from '@reduxjs/toolkit'

export const pathSlice = createSlice({
    name: 'pathStore',
    initialState: {
        value: '/',
    },
    reducers: {
        setPath: (state, action) => {
            state.value = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setPath } = pathSlice.actions

export default pathSlice.reducer