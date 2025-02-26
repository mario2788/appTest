

import { createSlice } from '@reduxjs/toolkit'

export const loggedSlice = createSlice({
    name: 'loggedStore',
    initialState: {
        value: {
            state: false,
            token: ''
        },
    },
    reducers: {
        setLogged: (state, action) => {
            state.value = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { setLogged } = loggedSlice.actions

export default loggedSlice.reducer