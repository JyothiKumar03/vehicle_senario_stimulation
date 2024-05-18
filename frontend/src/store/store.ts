import {configureStore} from "@reduxjs/toolkit"
import ScenarioReducer from "./ScenarioSlice"

const store = configureStore({
    reducer : {
        scenario : ScenarioReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store