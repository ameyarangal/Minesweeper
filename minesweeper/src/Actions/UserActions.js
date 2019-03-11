import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../Constants/Constants";
import { postApi } from "../Common/Api";

export const login = (username, password, onSuccessfulLogin) => dispatch => {
  let url = `http://localhost:3010/users/verify`;
  let postdata = {
    Username: username,
    Password: password
  };
  postApi(
    url,
    data => {
      console.log(`data in login success`, data);
      dispatch(set_User(data));
      onSuccessfulLogin();
    },
    err => {
      console.log("one failure of login", err);
      dispatch(set_login_failure("Invalid Username and Password"));
    },
    postdata
  );
};

function set_User(user) {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
}
function set_login_failure(error) {
  return { type: LOGIN_FAILURE, payload: error };
}

export const logout = () => dispatch => {
  dispatch(logout_user());
};

function logout_user() {
  return {
    type: LOGOUT,
    payload: null
  };
}

export const register = (
  firstName,
  lastName,
  username,
  password,
  onSuccessfulRegister
) => dispatch => {
  let url = `http://localhost:3010/users/`;
  let postdata = {
    FirstName: firstName,
    LastName: lastName,
    username: username,
    password: password
  };
  postApi(
    url,
    data => {
      console.log(`data in login success`, data);
      onSuccessfulRegister();
    },
    err => {
      console.log("one error of register", err);
    },
    postdata
  );
};
