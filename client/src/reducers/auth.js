import * as types from "../constants/types";

const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case types.AUTH:
            localStorage.setItem("userProfile", JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data, loading: false, errors: null };
        case types.LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };

        default:
            return state;
    }
}
export default authReducer;