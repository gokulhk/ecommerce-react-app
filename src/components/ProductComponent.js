import React from 'react'

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../redux';

//step3 : accept props
function ProductComponent(props) {

    const { product, cart, addToCart, removeFromCart } = props

    const linkPayload = {
        pathname: "/details",
        product
    }

    //button display msg
    const addedToCart = cart.filter(oneProduct => oneProduct.code === product.code).length !== 0;
    const btnMsg = addedToCart ? "Remove from Cart" : "Add to Cart";

    //add to cart handler 
    const cartClickHandler = () => {

        //prevent duplicate addition of same item to cart
        if (!addedToCart) {
            //create cart product object 
            const oneProduct = {
                code: product.code,
                quantity: 1
            }

            addToCart(oneProduct);
        }
        else {
            removeFromCart(product.code)
        }
    }

    return (
        <React.Fragment>
            <Link to={linkPayload} className="thumbnail">
                <img src={`./${product.img}`} alt="product_image" /></Link>
            <p>{product.title}</p>
            <p>{`$${product.price}`}</p>
            <button className="btn btn-success btn-sm" onClick={cartClickHandler}>{btnMsg}</button>
        </React.Fragment>
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
        addToCart: code => dispatch(addToCart(code)),
        removeFromCart: code => dispatch(removeFromCart(code))
    }
}

//step3 : connect this component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProductComponent)
