import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import ReservationReducer from "./reducers/ReservationReducer";

const store=configureStore({
    reducer :{
        user:UserReducer,
        reservation:ReservationReducer
    }
}
)
export default store;