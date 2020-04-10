import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar'
import { placeOrder, emptyCart } from '../redux'
import { connect } from 'react-redux'

function PaymentComponent(props) {

    const bill = props.location.bill;
    const { placeOrder, emptyCart, orderIdCounter } = props;

    //payment page state handler
    const [order, setOrder] = useState({
        bill,
        payment_mode: 'Cash On Delivery',
        payment_status: 'Not Paid',
        order_status: 'Yet to Confirm'
    })

    // //redirect blank request to home page
    if (bill === undefined) {
        return (<Redirect to="./" />)
    }

    //Payment onSelect handler 
    const paymentModeHandler = event => {
        if (event.target.value === 'Online Payment') {
            setOrder({
                ...order,
                payment_mode: 'Online Payment',
            })

        }
        else {
            setOrder({
                ...order,
                payment_mode: 'Cash On Delivery',
            })
        }
    }

    const onlinePaymentHandler = () => {
        const newOrderId = 'Order' + orderIdCounter;
        setOrder({
            ...order,
            payment_status: 'Paid',
            order_status: 'Order Placed'
        })
        placeOrder({
            ...order,
            orderId: newOrderId,
            payment_status: 'Paid',
            order_status: 'Order Placed'
        });
        emptyCart();
    }

    const confirmOrderHandler = () => {

        //prevents duplicate ordering
        if( order.order_status === 'Order Placed' ){
            return;
        }

        const newOrderId = 'Order' + orderIdCounter;
        setOrder({
            ...order,
            order_status: 'Order Placed'
        })
        placeOrder({
            ...order,
            orderId: newOrderId,
            order_status: 'Order Placed'
        });
        emptyCart();
    }

    return (
        <div className="container-fluid">
            <NavBar />
            <p>Welcome to Payment Page.</p>
            <div className="row">
                {
                   order.order_status === 'Order Placed'? (<div className="alert alert-success">
                        <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                        Your Order has been Confirmed. You can check order status in myOrders section.
                    </div>) :  (<span></span>) 
                }
            </div>
            <div className="row payment-banner">
                <div className="row">
                    <div className="col-sm-4">
                        <p>Total : $ {bill.total}</p>
                        <p>Discount Reduction : - {bill.discount_first_time * 100} %</p>
                        <p>Amount after discount : $ {bill.amount_after_discount}</p>
                        <p>Shipping Charges : $ {bill.standard_shipping_charge}</p>
                        <p>Final Amount to pay : $ {bill.amount_to_pay}</p>
                    </div>
                    <div className="col-sm-5">
                        <div className="form-group row">
                            <label htmlFor="sel1">Select Payment Method:</label>
                            <select className="form-control payment-type" id="sel1"
                                onBlur={paymentModeHandler}
                                disabled={order.order_status === 'Order Placed' ? "disabled" : ""}  >

                                <option>Cash On Delivery</option>
                                <option>Online Payment</option>
                            </select>
                        </div>
                        <div className="row">
                            <button className="btn btn-success btn-sm"
                                style={{ visibility: order.payment_mode === 'Online Payment' ? 'visible' : 'hidden' }}
                                onClick={onlinePaymentHandler}
                                disabled={order.order_status === 'Order Placed' ? "disabled" : ""}
                            >{order.order_status === 'Order Placed' && order.payment_mode === 'Online Payment' ? "Paid" : "Pay Now"}</button>
                        </div>
                        <div className="row">
                            <br />
                            <p>Payment Status : {order.payment_status}</p>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <button className="btn btn-success payment-btn"
                            onClick={confirmOrderHandler}
                            disabled={order.order_status === 'Yet to Confirm' && order.payment_mode === 'Online Payment' ? "disabled" : ""}>
                            {order.order_status === 'Order Placed' ? (<span className="glyphicon glyphicon-ok"></span>) : (<span></span>)}
                            {order.order_status === 'Order Placed' ? " Order Placed" : "Confirm Order"}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

//step 1:  mapStateToProps
const mapStateToProps = state => {
    return {
        orderIdCounter: state.orderIdCounter
    }
}

//step 2: mapDispatchToProps 
const mapDispatchToProps = dispatch => {
    return {
        emptyCart : () =>  dispatch(emptyCart()),
        placeOrder: order => dispatch(placeOrder(order))
    }
}

//step 3: connect this component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(PaymentComponent)