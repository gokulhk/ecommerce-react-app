import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import MyCartItem from './MyCartItem';

// import { inCart } from '../data';
import { storeProducts } from '../data'

//redux store import
import { connect } from 'react-redux';
import { addToCart, emptyCart, placeOrder } from '../redux/';

//step 4 : accept props
function MyCart(props) {

    let tiles = [];


    //bill constants
    const discount_first_time = 0.1; //10%
    const standard_shipping_charge = 30;


    //this component state
    const [rows, setRows] = useState([]);
    const [total, setTotal] = useState(0);

    //redux-store data usage
    //console.log("Redux store obj : ", props);
    const { cart, emptyCart, placeOrder } = props;

    useEffect(() => {
        console.log("my cart useeffect rendered ")

        let inCartProducts = cart.map(oneProduct => storeProducts.filter(product => product.code === oneProduct.code)[0]);

        console.log("inCartProducts  ", inCartProducts);

        tiles = inCartProducts.map(cartProduct => <MyCartItem product={cartProduct} key={cartProduct.code} />);

        setRows(tiles)

        //bill calculation logic
        let localTotal = 0;
        inCartProducts.forEach(cartProduct => {
            //find quantity 
            let quantity = cart.filter(oneProduct => oneProduct.code === cartProduct.code)[0].quantity;
            localTotal += (quantity * cartProduct.price);
        });
        setTotal(localTotal);


    }, [cart])

    if (cart.length === 0) { //if cart is empty display no product in car banner
        return (
            <div className="container">
                <NavBar />
                <div className="well">Cart is Empty!</div>
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <div className="row">
                <div className="col-sm-10">
                    <h1>Products in Cart</h1>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-warning empty-cart-btn"
                        onClick={emptyCart}>Empty Cart</button>
                </div>
            </div>
            <div className="row">
                {rows.map(make => make)}
                <div className="row payment-banner">
                    <div className="col-sm-10">
                        <p>Total : $ {total}</p>
                        <p>Discount Reduction : {discount_first_time * 100} %</p>
                        <p>Amount after discount : {total - total * discount_first_time}</p>
                        <p>Shipping Charges : $ {standard_shipping_charge}</p>
                        <p>Final Amount to pay : $ { (total - total * discount_first_time) + standard_shipping_charge }</p>
                    </div>
                    <div className="col-sm-2">
                        <button className="btn btn-success payment-btn">Order Now</button>
                    </div>
                </div>
            </div>

        </div>
    )
}


//step 1 : mapStateToProps
const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

//step 2 : mapDispatchToProps
const mapDispatchToProps = (dispatch) => {
    return {
        emptyCart: () => dispatch(emptyCart()),
        placeOrder: order => dispatch(placeOrder(order))
    }
}

//step3 : connect react App to redux store
export default connect(mapStateToProps, mapDispatchToProps)(MyCart)

/*

order = {

    productCodes : product_code_array ,
    discount_reduction :

    total_amount :
    shipping_charges :
    amount_to_pay :

    payment_mode : [COD, Online payment] ,
    payment_status : [Not Paid , payment_successfull, refunded ] ,

    order_status : [order_placed, delivered, order_cancelled] ,
}

*/