import { configureStore } from "@reduxjs/toolkit";
import { loginReducer} from '../Slices/LoginSlice'

const Store = configureStore({
    reducer: {
        loginInfo : loginReducer
    }
})

export default Store;