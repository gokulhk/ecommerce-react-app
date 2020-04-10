import React, { useState, useEffect } from 'react'

import { connect } from 'react-redux'
import { completeOrder, cancelOrder } from '../redux'


//step 3 : accept props
function OrderComponent(props) {

    //step 4:  destructure props
    const { order, completeOrder, cancelOrder } = props;
    const [deliveryTime, setDeliveryTime] = useState(10); //default 10sec order delivery for simulation

    let count = 0;
    let timerId;

    useEffect(() => {
        
        if (order.order_status === 'Order Placed') {
            timerId = setInterval(() => {
                count += 1;
                if (count === 10) {
                    completeOrder({
                        ...order,
                        payment_status: 'Paid',
                        order_status: 'Delivered'
                    });
                    clearInterval(timerId);
                }
                else {
                    setDeliveryTime(deliveryTime => deliveryTime - 1)
                }

            }, 1000);
        }

        return () => clearInterval(timerId);
    }, []) //componentDidMount Simulation

    if (order === undefined) {
        return (
            <span></span>
        )
    }

    const cancelClickHanlder = () => {
        //remove timer 
        clearInterval(timerId);

        //cancel order 
        let payment_status = 'Not Paid';
        if(order.payment_status === 'Paid'){
            payment_status = 'Refunded'
        }
        cancelOrder({
            ...order,
            payment_status,
            order_status : 'Cancelled'
        });
    }

    return (
        <div className="row well">
            <p>Order Id : {order.orderId}</p>
            <p>Order Status : {order.order_status}</p>
            <p>Payment Mode : {order.payment_mode}</p>
            <p>Payment Status : {order.payment_status}</p>
            <p>{order.payment_status === 'Paid' ? "Amount Paid : $ " : "Amount to Pay : $ "} {order.bill.amount_to_pay} </p>
            <p style={{font:'bold'}}>{
                order.order_status === 'Order Placed' ? (`Estimated Order Availability : ${deliveryTime} secs`)
                    : (<span></span>)
            }</p>
            <p>
                {
                    order.order_status === 'Order Placed' ? 
                    (<button className="btn btn-danger btn-sm"
                    onClick={cancelClickHanlder}>Cancel Order</button>) 
                    : (<span></span>)
                }
            </p>
        </div>
    )
}

//step 1 : mapDispatchToProps
const mapDispatchToProps = dispatch => {
    return {
        completeOrder: order => dispatch(completeOrder(order)),
        cancelOrder: order => dispatch(cancelOrder(order))
    }
}

//step 2 :  connect this component to redux store
export default connect(null, mapDispatchToProps)(OrderComponent)
