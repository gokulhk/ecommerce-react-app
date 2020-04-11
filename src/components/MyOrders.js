import React from 'react'
import NavBar from './NavBar';

import { connect } from 'react-redux'

import OrderComponent from './OrderComponent';

//step 3 : accept props
function MyOrders(props) {

    //step 4 : destructure props
    const { activeOrders, cancelledOrders, completedOrders} = props;

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container-fluid">

                <div className="row orders-container">
                    <h2>Your Active Orders</h2>
                    {
                        (activeOrders.length === 0) ?
                            (<div className="well">No Orders to display.</div>)
                            : activeOrders.map(oneOrder => <OrderComponent order={oneOrder} key={oneOrder.orderId} />)
                    }
                </div>

                <div className="row">
                    <h2>Your Previous successfull Orders</h2>
                    {
                        (completedOrders.length === 0) ?
                            (<div className="well">No Orders to display.</div>)
                            : completedOrders.map(oneOrder => <OrderComponent order={oneOrder} key={oneOrder.orderId} />)
                    }
                </div>

                <div className="row">
                    <h2>Your Previous cancelled Orders</h2>
                    {
                        (cancelledOrders.length === 0) ?
                            (<div className="well">No Orders to display.</div>)
                            : cancelledOrders.map(oneOrder => <OrderComponent order={oneOrder} key={oneOrder.orderId} />)
                    }
                </div>
            </div>
        </div>
    )
}

//step 1 : mapStateToProps 
const mapStateToProps = state => {
    return {
        completedOrders: state.completedOrders,
        cancelledOrders: state.cancelledOrders,
        activeOrders: state.activeOrders
    }
}


//step 2: connect this component to redux store
export default connect(mapStateToProps)(MyOrders)
