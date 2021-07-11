import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_USERDETAIL,
  CLEAR_AUTH_USERDETAIL,
  CREATE_USER_ACC,
  SET_CREATE_ERROR,
  SET_CREATE_LOADING,
  CLEAR_CREATE_ERROR,
  SET_FETCH_USERS_LOADING,
  SET_FETCH_USERS_ERROR,
  SET_FETCH_USERS
} from "../actions/auth";

const initialState = {
  loading: false,
  token: null,
  error: null,
  userId: null,
  userDetail: null,

  userDetailsList: [],
  createUserLoading: false,
  createUserError: null,

  fetchLoading: false,
  fetchError: null,

};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };
    case AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case AUTH_LOGOUT: {
      return {
        ...state,
        loading: false,
        token: null,
        userId: null,
        error: null,
      };
    }
    case AUTH_USERDETAIL: {
      let userDetail = action.payload;
      return {
        ...state,
        userDetail,
      };
    }
    case CLEAR_AUTH_USERDETAIL: {
      return {
        ...state,
        userDetail: {},
      };
    }
    case SET_CREATE_LOADING: {
      return {
        ...state,
        createUserLoading: true,
      };
    }
    case SET_CREATE_ERROR: {
      return {
        ...state,
        createUserLoading: false,
        createUserError: action.payload,
      };
    }
    case CLEAR_CREATE_ERROR: {
        return {
            ...state,
            createUserError: null,
        }
    }
    case CREATE_USER_ACC: {
      const newUser = { ...action.payload };
      console.log()
      const updatedUserList = [newUser, ...state.userDetailsList]
      return {
        ...state,
        createUserLoading: false,
        createUserError: null,
        userDetailsList: updatedUserList,
      };
    }
    case SET_FETCH_USERS_LOADING: {
        return {
            ...state,
            fetchLoading: true,
            fetchError: null
        }
    }
    case SET_FETCH_USERS_ERROR: {
        return {
            ...state,
            fetchLoading: false, 
            fetchError: action.payload
        }
    }
    case SET_FETCH_USERS: {
        const userList = [...action.payload];
        return {
            ...state,
            fetchLoading: false,
            fetchError: null,
            userDetailsList: userList,
        }
    }
    default:
      return state;
  }
};

export default authReducer;
