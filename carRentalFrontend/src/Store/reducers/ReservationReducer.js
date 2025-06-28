const initialState = {
    reservations:[]
}
const ReservationReducer = (state = initialState, action) => {

    if (action.type === "SET_RESERVATIONS") {  
        let user = action.payload;
        return {
            ...state,
            reservations:action.payload
        }
    }
    return state;
}
export default ReservationReducer;