import axios from "axios"

export const setLenderReservations = (dispatch) => () => {

    axios.get("http://localhost:8080/api/rental/getByLenderId",
        { headers: { "Authorization": "Bearer " + localStorage.getItem('token') } })
        .then(function (response) {
            console.log(response.data);
            dispatch({
                'payload': response.data,
                'type': 'SET_LENDER_RESERVATIONS'
            })
        })

}