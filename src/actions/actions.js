import * as actionTypes from "../actionTypes/actionTypes"

// const apiHost = process.env.API_HOST;

const action = (type, payload) => {
    return {
        type,
        payload
    }
}

export const setWalletData = (payload) => {
    return action(actionTypes.SET_WALLET_DATA, payload)
}
export const setProductForBuying = (payload) => {
    return action(actionTypes.SET_PRODUCT_FOR_BUYING, payload)
}
export const ordersByAddressData = (payload) => {
    return action(actionTypes.ORDERS_BY_ADDRESS, payload)
}
export const showLoader = (payload) => {
    return action(actionTypes.LOADER, payload)
}