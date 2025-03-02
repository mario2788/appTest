

import { createSlice } from '@reduxjs/toolkit'

const stateFromLocalStorage = () => {
    const state = localStorage.getItem('state')
    return state ? JSON.parse(state) : { state: false, token: '' }
}

export const loggedSlice = createSlice({
    name: 'loggedStore',
    initialState: {
        value: stateFromLocalStorage(),
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