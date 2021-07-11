import axios from "axios";
import { CLEAR_ADD_ERROR } from "./inventory";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

export const CLEAR_AUTH_USERDETAIL = "CLEAR_AUTH_USERDETAIL";

export const CREATE_USER_ACC = "CREATE_USER_ACC";
export const SET_CREATE_LOADING = "SET_CREATE_LOADING";
export const SET_CREATE_ERROR = "SET_CREATE_ERROR;";
export const CLEAR_CREATE_ERROR = "CLEAR_CREATE_ERROR";

export const SET_FETCH_USERS_LOADING = "SET_FETCH_USERS_LOADING";
export const SET_FETCH_USERS_ERROR = "SET_FETCH_USERS_ERROR";
export const SET_FETCH_USERS = "SET_FETCH_USERS";

export const authStart = () => {
  return (dispatch) => {
    dispatch({
      type: AUTH_START,
    });
  };
};

export const authSuccess = (token, userId, name, email, role) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_SUCCESS,
      idToken: token,
      userId: userId,
      name,
      email, 
      role
    });
  };
};

export const authFail = (error) => {
  return (dispatch) => {
    dispatch({
      type: AUTH_FAIL,
      error: error,
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    dispatch({
      type: AUTH_LOGOUT,
    });
    dispatch(clearUserDetail());
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://asia-east2-inventory-app-1aa4b.cloudfunctions.net/api/user/login";
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", response.data.role);
        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.localId,
            response.data.name,
            response.data.email,
            response.data.role
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");
        const role = localStorage.getItem("role");
        dispatch(authSuccess(token, userId, name, email, role));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};

export const clearUserDetail = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_AUTH_USERDETAIL });
  };
};

export const createUser = (email, password, role, displayName) => {
  return (dispatch) => {
    dispatch({ type: SET_CREATE_LOADING });
    let url =
      "https://asia-east2-inventory-app-1aa4b.cloudfunctions.net/api/user/create";
    axios
      .post(
        url,
        { email, password, role, displayName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch({
          type: CREATE_USER_ACC,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_CREATE_ERROR,
          payload: err.response.data,
        });
      });
  };
};

export const userList = () => {
  return (dispatch) => {
    dispatch({ type: SET_FETCH_USERS_LOADING });
    let url = "https://asia-east2-inventory-app-1aa4b.cloudfunctions.net/api/users";
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({
          type: SET_FETCH_USERS,
          payload: res.data.userList,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_FETCH_USERS_ERROR,
          payload: err.response.data,
        });
      });
  };
};

export const clearAddUserError = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ADD_ERROR,
    });
  };
};
