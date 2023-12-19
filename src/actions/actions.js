import * as actionTypes from "../actionTypes/actionTypes"

// const apiHost = process.env.API_HOST;

const action = (type, payload) => {
    return {
        type,
        payload
    }
}

export const test = (payload) => {
    return action(actionTypes.TEST, payload)
}
export const userDetails = (payload) => {
    return action(actionTypes.USER_DETAILS, payload)
}
export const allExpenditures = (payload) => {
    return action(actionTypes.GET_ALL_EXPENDITURES_API, payload)
}
export const addExpenditures = (payload) => {
    return action(actionTypes.ADD_EXPENDITURES_API, payload)
}
export const addNewSavingsTarget = (payload) => {
    return action(actionTypes.ADD_NEW_SAVINGS_TARGET_API, payload)
}
export const getAllCategories = (payload) => {
    return action(actionTypes.GET_CATGORIES_API, payload)
}
export const addNewCategory = (payload) => {
    return action(actionTypes.ADD_CATEGORY_API, payload)
}
export const getSavingsTarget = (payload) => {
    return action(actionTypes.GET_SAVINGS_TARGET, payload)
}
export const loader = (payload) => {
    return action(actionTypes.LOADER, payload)
}
export const categoryloader = (payload) => {
    return action(actionTypes.CATEGORY_LOADER, payload)
}
export const deleteExpenditure = (payload) => {
    return action(actionTypes.DELETE_EXPENDITURE_API, payload)
}
export const fetchChartData = (payload) => {
    return action(actionTypes.CHART_DATA_API, payload)
}
export const resetChartData = (payload) => {
    return action(actionTypes.RESET_CHART_DATA, payload)
}
