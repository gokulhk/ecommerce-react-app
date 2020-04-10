import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    SET_QUANTITY,
    PLACE_ORDER,
    CANCEL_ORDER,
    COMPLETED_ORDER
} from './mobileTypes'


//set initial State - sample entries for simualtion

const initialState = {
    completedOrders : [],
    cancelledOrders : [],
    activeOrders : [],
    cart : []
}
// [ 'AMKD32k' , 'AMKhss2k', 'AM78h2k', 'AMKhqw2k', 'AasWh7s2k', 'MKodh21kj']

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


        case PLACE_ORDER : return {
            ...state,
            activeOrders : [ ...state.activeOrders, action.payload]
        }

        case CANCEL_ORDER : return {
            ...state,
            cancelledOrders : [ ...state.cancelledOrders,  state.activeOrders.filter( order => order.orderId === action.payload )],
            activeOrders : state.activeOrders.filter( order => order.orderId !== action.payload)
        }

        case COMPLETED_ORDER : return {
            ...state,
            completedOrders : [ ...state.completedOrders, state.activeOrders.filter( order => order.orderId === action.payload ) ], 
            activeOrders : state.activeOrders.filter( order => order.orderId !== action.payload)
        }

        default :  return state
    }
}

export default mobileReducer