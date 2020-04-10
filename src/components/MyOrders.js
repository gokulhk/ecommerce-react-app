import React from 'react'
import NavBar from './NavBar';

function MyOrders() {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <h2>Your Previous successfull Orders</h2>
                <h2>Your Previous cancelled Orders</h2>
                <h2>Your current orders Orders</h2>
            </div>
        </div>
    )
}

export default MyOrders
