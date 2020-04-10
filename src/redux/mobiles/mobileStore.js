import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

//reducer import 
import mobileReducer from './mobileReducer'

 
//mobile store 
const mobileStore = createStore( mobileReducer, applyMiddleware(logger))

//export store
export default mobileStore