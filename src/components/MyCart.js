import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import MyCartItem from './MyCartItem';

import { Link} from 'react-router-dom';

// import { inCart } from '../data';
import { storeProducts } from '../data'

//redux store import
import { connect } from 'react-redux';
import { emptyCart } from '../redux/';

//step 4 : accept props
function MyCart(props) {

    //this component state
    const [rows, setRows] = useState([]);
    const [orderPayload, setOrderPayload] = useState({
        pathname: "/make_payment",
        bill: {
            cart_snapshot: [],
            total: 0,
            discount_first_time: 0.1, //10%
            amount_after_discount: 0,
            standard_shipping_charge: 30,
            amount_to_pay: 0
        }
    });

    //redux-store data usage
    //console.log("Redux store obj : ", props);
    const { cart, emptyCart } = props;

    useEffect(() => {
        
        let inCartProducts = cart.map(oneProduct => storeProducts.filter(product => product.code === oneProduct.code)[0]);

        let tiles = inCartProducts.map(cartProduct => <MyCartItem product={cartProduct} key={cartProduct.code} />);

        setRows(tiles)

        //bill calculation logic
        let localTotal = 0;
        inCartProducts.forEach(cartProduct => {
            //find quantity 
            let quantity = cart.filter(oneProduct => oneProduct.code === cartProduct.code)[0].quantity;
            localTotal += (quantity * cartProduct.price);
        });

        localTotal = localTotal.toFixed(2);
        let local_amount_after_discount = (localTotal - localTotal * orderPayload.bill.discount_first_time);
        let local_amount_to_pay = (local_amount_after_discount + orderPayload.bill.standard_shipping_charge);
        local_amount_after_discount = local_amount_after_discount.toFixed(2);
        local_amount_to_pay = local_amount_to_pay.toFixed(2);

        setOrderPayload({
            pathname: "/make_payment",
            bill: {
                cart_snapshot: cart,
                total: localTotal,
                discount_first_time: 0.1, //10%
                amount_after_discount: local_amount_after_discount,
                standard_shipping_charge: 30,
                amount_to_pay: local_amount_to_pay
            }
        })

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
                    <div className="row">
                        <div className="col-sm-10">
                            <p>Total : $ {orderPayload.bill.total}</p>
                            <p>Discount Reduction : - {orderPayload.bill.discount_first_time * 100} %</p>
                            <p>Amount after discount : $ {orderPayload.bill.amount_after_discount}</p>
                            <p>Shipping Charges : $ {orderPayload.bill.standard_shipping_charge}</p>
                            <p>Final Amount to pay : $ {orderPayload.bill.amount_to_pay}</p>
                        </div>
                        <div className="col-sm-2">
                            <Link to={orderPayload}>
                                <button className="btn btn-success payment-btn">Order Now</button>
                            </Link>
                        </div>
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
        emptyCart: () => dispatch(emptyCart())
    }
}

//step3 : connect react App to redux store
export default connect(mapStateToProps, mapDispatchToProps)(MyCart)
