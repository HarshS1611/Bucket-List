import { AUTH } from "../constants/types";

import * as api from "../api/api.js";

export const signin = (userData,router) => async (dispatch) => {
    try {
        const { data } = await api.signIn(userData);
        dispatch({ type: AUTH, data });
        router.push("/");
    } catch (error) {
        console.log(error);
    }
};
export const signup = (userData,router) => async (dispatch) => {
    try {
        const { data } = await api.signUp(userData);

        dispatch({ type: AUTH, data });
        router.push("/");
    } catch (error) {
        console.log(error);
    }
};


