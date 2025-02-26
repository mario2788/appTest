
import { configureStore } from '@reduxjs/toolkit'

import pathSlice from './slices/paths'
import loggedSlice from './slices/logged'


export default configureStore({
    reducer: {
        pathStore: pathSlice,
        loggedStore: loggedSlice
    },
})