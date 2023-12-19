import { initialState } from "./initialState";
import * as actionTypes from '../actionTypes/actionTypes'


const initState = initialState


export const appReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.USER_DETAILS:
      return {
        ...state,
        user: action.payload
      };
    case actionTypes.GET_CATGORIES:
        return {
            ...state,
            categories: action.payload
        }
    case actionTypes.GET_ALL_EXPENDITURES:
        return {
            ...state,
            expenditures: action.payload
        }
    case actionTypes.ADD_EXPENDITURES:
        return {
            ...state,
            expenditures: action.payload
        }
    case actionTypes.SAVINGS_TARGET:
        return {
            ...state,
            savingsTargetInfo: action.payload
        }
    case actionTypes.ADD_NEW_SAVINGS_TARGET:
        return {
            ...state,
            savingsTargetInfo: action.payload
        }
    case actionTypes.LOADER:
        return {
            ...state,
            loader: action.payload
        }
    case actionTypes.CATEGORY_LOADER:
        return {
            ...state,
            categoryLoader: action.payload
        }
    case actionTypes.CHART_DATA:
        return {
            ...state,
            chartData: action.payload
        }
    case actionTypes.RESET_CHART_DATA:
        return {
            ...state,
            chartData: {}
        }
    case actionTypes.SET_WALLET_DATA:
        return {
            ...state,
            wallet: action.payload
        }
    default:
      return state;
  }
};
