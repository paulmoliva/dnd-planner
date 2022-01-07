import axios from "axios"
import { error } from "../auth";

export const signupUser = (signUpData) => async (getState, dispatch) => {
    const signUpResponse = await axios.post('/api/auth/signup', signUpData);
    const { data } = signUpResponse
    if (data.ok) {
        dispatch(error(null))
    } else {
        dispatch(error(data.message))
    }
}