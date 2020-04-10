import React from 'react'
import NavBar from './NavBar';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart, removeFromCart } from '../redux';

//step 4 : accept props 
function ProductDetail(props) {

    const product = props.location.product;

    const { cart, addToCart, removeFromCart } = props;

    //redirect blank request to home page
    if (product === undefined) {
        return (<Redirect to="./" />)
    }

    //button display msg
    const addedToCart = cart.filter( oneProduct => oneProduct.code === product.code ).length !== 0;
    
    const btnMsg = addedToCart ? "Remove from Cart" : "Add to Cart";

    //add to cart handler 
    const cartClickHandler = () => {

        //prevent duplicate addition of same item to cart
        if (!addedToCart) {
            //create cart product object 
            const oneProduct = {
                code : product.code,
                quantity : 1
            }

            console.log("code passed to add before : ", product.code);
            addToCart(oneProduct);
        }
        else {
            console.log("code passed to remove before : ", product.code);
            removeFromCart(product.code)
        }
    }

    return (
        <div>
            <NavBar />

            <div className="container-fluid row">
                <div className=" col-sm-4">
                    <img className="product-desc-img" src={`./${product.img}`} style={{ float: 'left' }} />
                </div>

                <div className="container-fluid col-sm-8">
                    <h2>{product.title}</h2>
                    <p><span className="product-exp-title">Manufacturer : </span> {product.company}</p>
                    <p><span className="product-exp-title">Product Description : </span> {product.info}</p>
                    <p><span className="product-exp-title">Price : </span> {`$${product.price}`}</p>
                    <button className="btn btn-success btn-sm" onClick={cartClickHandler}>{btnMsg}</button>
                </div>

            </div>

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
        addToCart : code => dispatch(addToCart(code)),
        removeFromCart: code => dispatch(removeFromCart(code))
    }
}

//step 3 : connect this react component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
