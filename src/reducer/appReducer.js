import { initialState } from "./initialState";
import * as actionTypes from '../actionTypes/actionTypes'


const initState = initialState


export const appReducer = (state = initState, action) => {
  switch (action.type) {
   
    case actionTypes.SET_WALLET_DATA:
        return {
            ...state,
            wallet: action.payload
        }
    case actionTypes.SET_PRODUCT_FOR_BUYING:
        return {
            ...state,
            product: action.payload
        }
    case actionTypes.ORDERS_BY_ADDRESS:
        return {
            ...state,
            orders: action.payload
        }
    case actionTypes.LOADER:
        return {
            ...state,
            showLoader: action.payload
        }
    default:
      return state;
  }
};
