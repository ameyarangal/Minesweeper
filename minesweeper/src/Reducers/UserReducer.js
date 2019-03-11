import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../Constants/Constants";

const initialState = {
  isLoggedIn: false,
  Id: null,
  FirstName: null,
  LastName: null,
  Username: null,
  loginMessage: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        Id: payload.Id,
        FirstName: payload.FirstName,
        LastName: payload.LastName,
        Username: payload.Username
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        loginMessage: payload
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
