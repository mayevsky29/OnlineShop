import { LOGIN, REGISTER } from "../constants/actionTypes";

const initialState ={
    isAuth: false,
    username: ""
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case REGISTER:
        case LOGIN: {
            return {
                isAuth: true,
                username: payload
            };
        } 
    }
    return state;

}

export default authReducer; 