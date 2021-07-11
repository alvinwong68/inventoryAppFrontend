import {
  ADD_INVENTORY,
  SET_ADD_LOADING,
  SET_ADD_ERROR,
  CLEAR_ADD_ERROR,
  FETCH_INVENTORY,
  SET_FETCH_ERROR,
  SET_FETCH_LOADING,
  DELETE_INVENTORY,
  EDIT_INVENTORY,
} from "../actions/inventory";

const initialState = {
  inventoryList: [],
  addLoading: false,
  addError: null,

  fetchLoading: false,
  fetchError: null,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADD_LOADING: {
      return {
        ...state,
        addLoading: true,
        addError: null,
      };
    }
    case ADD_INVENTORY: {
      const newInventory = action.payload;
      const updatedInventoryList = [newInventory, ...state.inventoryList];
      return {
        ...state,
        addError: null,
        addLoading: false,
        inventoryList: updatedInventoryList,
      };
    }
    case SET_ADD_ERROR: {
      return {
        ...state,
        addError: action.payload,
        addLoading: false,
      };
    }
    case CLEAR_ADD_ERROR: {
      return {
        ...state,
        addError: null,
      }
    }
    case SET_FETCH_LOADING: {
      return {
        ...state,
        fetchError: null,
        fetchLoading: true,
      };
    }
    case SET_FETCH_ERROR: {
      return {
        ...state,
        fetchError: action.payload,
        fetchLoading: false,
      };
    }
    case FETCH_INVENTORY: {
      return {
        ...state,
        inventoryList: action.payload,
        fetchError: null,
        fetchLoading: false,
      };
    }
    case DELETE_INVENTORY: {
      const inventoryId = action.payload;
      const updatedInventory = state.inventoryList.filter((item) => {
        return item.id !== inventoryId;
      });

      return {
        ...state,
        inventoryList: updatedInventory,
      };
    }
    case EDIT_INVENTORY: {
      let updatedItem = { ...action.payload };
      let updatedItemIndex = state.inventoryList.findIndex((item) => {
        return item.id === updatedItem.id;
      })

      let updatedInventoryList = [...state.inventoryList];
      let item = {...updatedInventoryList[updatedItemIndex]};
      item.quantity = updatedItem.quantity;
      updatedInventoryList[updatedItemIndex] = item;
      return {
        ...state,
        inventoryList: updatedInventoryList,
      }
    }
    default:
      return initialState;
  }
};

export default inventoryReducer;
