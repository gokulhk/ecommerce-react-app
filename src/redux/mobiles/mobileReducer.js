import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    SET_QUANTITY,
    PLACE_ORDER,
    CANCEL_ORDER,
    COMPLETE_ORDER
} from './mobileTypes'


//set initial State 
const initialState = {
    orderIdCounter : 0, 
    completedOrders : [],
    cancelledOrders : [],
    activeOrders : [],
    cart : []
}

//Reducer function 
const mobileReducer = ( state = initialState, action ) => {

    switch(action.type){

        case ADD_TO_CART : return {
            ...state,
            cart : [ ...state.cart , action.payload ]
        }

        case REMOVE_FROM_CART : return {
            ...state,
            cart : state.cart.filter( oneProduct => oneProduct.code !== action.payload )
        }

        case EMPTY_CART : return {
            ...state,
            cart : []
        }

        case SET_QUANTITY : return {
            ...state,
            cart : state.cart.map( oneProduct => {
                if( oneProduct.code === action.code){
                    return {
                        code : oneProduct.code,
                        quantity : action.payload
                    }
                }
                else{
                    return oneProduct
                }
            } )
        }

        case PLACE_ORDER : 
        return {
            ...state,
            orderIdCounter : state.orderIdCounter + 1,
            activeOrders : [ ...state.activeOrders, action.payload]
        }

        case CANCEL_ORDER : return {
            ...state,
            cancelledOrders : [ ...state.cancelledOrders,  action.payload ],
            activeOrders : state.activeOrders.filter( order => order.orderId !== action.payload.orderId)
        }

        case COMPLETE_ORDER : return {
            ...state,
            completedOrders : [ ...state.completedOrders, action.payload ], 
            activeOrders : state.activeOrders.filter( order => order.orderId !== action.payload.orderId)
        }

        default :  return state
    }
}

export default mobileReducer