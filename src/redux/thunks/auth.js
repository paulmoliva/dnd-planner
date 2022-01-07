import axios from "axios"
import { setError, setLoading, setC, login } from "../auth";

export const signupUser = (signUpData) => async (dispatch, getState) => {
    dispatch(setLoading(true))
    const signUpResponse = await axios.post('/api/auth/signup', signUpData);
    const { data } = signUpResponse
    if (data.ok) {
        dispatch(setError(null))
        const { token, email, username } = data;
        dispatch(login({ token, username, email }))
    } else {
        dispatch(setError(data.message))
    }
    dispatch(setLoading(false))
}
export const loginUser = (loginData) => async (dispatch, getState) => {
    dispatch(setLoading(true))
    const loginResponse = await axios.post('/api/auth/login', loginData);
    const { data } = loginResponse
    if (data.ok) {
        dispatch(setError(null))
        const { token, email, username } = data;
        dispatch(login({ token, username, email }))
    } else {
        dispatch(setError(data.message))
    }
    dispatch(setLoading(false))
}