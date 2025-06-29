import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import ReservationReducer from "./reducers/ReservationReducer";
import ReservationLenderReducer from "./reducers/ReservationLenderReducer";

const store=configureStore({
    reducer :{
        user:UserReducer,
        reservation:ReservationReducer,
        lenderReservation:ReservationLenderReducer
    }
}
)
export default store;