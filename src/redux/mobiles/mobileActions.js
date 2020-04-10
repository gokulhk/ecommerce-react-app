import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    SET_QUANTITY,
    PLACE_ORDER,
    CANCEL_ORDER,
    COMPLETE_ORDER
} from './mobileTypes'

//Cart Actions
export const addToCart = ( oneProduct ) => {
    return {
        type : ADD_TO_CART, 
        payload : oneProduct 
    }
}

export const removeFromCart = (code) => {
    return {
        type : REMOVE_FROM_CART,
        payload : code
    }
}

export const emptyCart = () => {
    return {
        type : EMPTY_CART
    }
}

export const setQuantity = (code, newQuantity) => {
    return {
        type : SET_QUANTITY,
        payload : newQuantity,
        code : code
    }
}

//Order Actions
export const placeOrder = ( order ) => {
    return {
        type : PLACE_ORDER,
        payload : order
    }
}

export const cancelOrder = ( orderId ) => {
    return {
        type : CANCEL_ORDER,
        payload : orderId
    }
}

export const completeOrder = ( orderId ) => {
    return {
        type : COMPLETE_ORDER,
        payload : orderId
    }
}