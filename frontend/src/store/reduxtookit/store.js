import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './store'

const store = configureStore({
    reducer:{
        task : taskReducer
    }
})

export default store