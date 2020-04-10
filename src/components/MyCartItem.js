import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, setQuantity, placeOrder } from '../redux'

function MyCartItem(props) {

    //destructure props
    const { product, cart, setQuantity, removeFromCart, placeOrder } = props;
    
    //quantity finder
    const currentProduct = cart.filter(oneProduct => oneProduct.code === product.code)[0];
    const [newQuantity, setNewQuantity] = useState(currentProduct.quantity);
    console.log("current Quantity : ", currentProduct);
    console.log("Intial new Quantity : ", newQuantity);

    //ref for quantity input element

    const linkPayload = {
        pathname: "/details",
        product
    };

    console.log("render check : MyCartItem ")

    //remove handler
    const removeHandler = () => {
        console.log("id passed from for del : ", product.code);
        removeFromCart(product.code);
    }

    //quantity handler
    const incQuantity = () => {
        setNewQuantity(newQuantity + 1);
        setQuantity(product.code, newQuantity+1);
    }

    const decQuantity = () => {
        setNewQuantity(newQuantity - 1);
        //case 1 : if quantity -eq 0 then delete cart entry 
        if (newQuantity-1 <= 0) {
            removeFromCart(product.code);
        }
        else {//case 2 : if  oldquantity -neq newquantity then update
            setQuantity(product.code, newQuantity-1);
        }
    }
    const setQuantityHandler = () => {
        //case 1 : if quantity -eq 0 then delete cart entry 
        if (newQuantity <= 0) {
            removeFromCart(product.code);
        }
        else if (currentProduct.quantity === newQuantity) { //case 2 : if oldquantity -eq newquantity then don't update
            return;
        }
        else {//case 3 : if  oldquantity -neq newquantity then update
            setQuantity(product.code, newQuantity);
        }
    }

    //order Handler
    const orderHandler = () => {

        //creates order object

    }

    return (
        <div className="row product-in-cart" key={product.code}>
            <div className="col-sm-3">
                <Link to={linkPayload}  >
                    <img src={`./${product.img}`} className="col-sm-8 img-responsive" /></Link>

            </div>

            <div className="col-sm-7">

                <div className="row">
                    <p><span className="product-exp-title">Product Title :</span> {product.title}</p>
                </div>
                <div className="row"><p><span className="product-exp-title">Price :</span>{`$${product.price}`}</p></div>
                <div className="row"><p><span className="product-exp-title">Quantity :</span>
                    <span className="btn" onClick={decQuantity}>-</span>
                    <input size="1" value={newQuantity}
                        onChange={event => setNewQuantity(event.target.value)}
                        onBlur={setQuantityHandler} />
                    <span className="btn" onClick={incQuantity}>+</span></p></div>
            </div>

            <div className="col-sm-2"><p>
                <span className="btn glyphicon glyphicon-trash" value={product.id} onClick={removeHandler}></span></p></div>
        </div>
    )
}


//step1 : mapStateToProps 
const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

//step2 : mapDispatchToProps 
const mapDispatchToProps = dispatch => {
    return {
        setQuantity: (code, newQuantity) => dispatch(setQuantity(code, newQuantity)),
        removeFromCart: id => dispatch(removeFromCart(id)),
        placeOrder : order => dispatch(placeOrder(order))
    }
}

//step 2 :  connect this component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(MyCartItem)