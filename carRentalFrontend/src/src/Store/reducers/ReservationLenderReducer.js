const initialState = {
    lenderReservations:[]
}
const ReservationLenderReducer = (state = initialState, action) => {

    if (action.type === "SET_LENDER_RESERVATIONS") {  
        let user = action.payload;
        return {
            ...state,
            lenderReservations:action.payload
        }
    }
    return state;
}
export default ReservationLenderReducer;