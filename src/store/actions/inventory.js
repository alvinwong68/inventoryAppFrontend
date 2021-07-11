import axios from "axios";

export const ADD_INVENTORY = "ADD_INVENTORY";
export const SET_ADD_LOADING = "SET_ADD_LOADING";
export const SET_ADD_ERROR = "SET_ADD_ERROR";

export const FETCH_INVENTORY = "FETCH_INVENTORY";
export const SET_FETCH_LOADING = "SET_FETCH_LOADING";
export const SET_FETCH_ERROR = "SET_FETCH_ERROR";

export const EDIT_INVENTORY = "EDIT_INVENTORY";
export const DELETE_INVENTORY = "DELETE_INVENTORY";

export const addInventory = (title, description, quantity) => {
  return (dispatch) => {
    dispatch({ type: SET_ADD_LOADING });
    let url =
      "http://localhost:5000/inventory-app-1aa4b/asia-east2/api/inventory";
    axios
      .post(
        url,
        { title, description, quantity },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        dispatch({
          type: ADD_INVENTORY,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ADD_ERROR,
          payload: err.response.data,
        });
      });
  };
};

export const fetchInventory = () => {
  return (dispatch) => {
    dispatch({ type: SET_FETCH_LOADING });
    let url =
      "http://localhost:5000/inventory-app-1aa4b/asia-east2/api/inventories";
    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({
          type: FETCH_INVENTORY,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_FETCH_ERROR,
          payload: err.response.data,
        });
      });
  };
};

export const deleteInventory = (id) => {
  return (dispatch) => {
    let url = `http://localhost:5000/inventory-app-1aa4b/asia-east2/api/inventory/${id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        dispatch({ type: DELETE_INVENTORY, payload: id });
      })
      .catch((err) => {
        //console.log(err.response.data);
      });
  };
};

export const editInventory = (id, obj) => {
  return (dispatch) => {
    let url = `http://localhost:5000/inventory-app-1aa4b/asia-east2/api/inventory/${id}`;
    axios
      .put(url, obj ,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: EDIT_INVENTORY, payload: { ...obj, id } });
      })
      .catch((err) => {
        //console.log(err.response.data);
      });
  };
};
