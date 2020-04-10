import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'

function NavBar(props) {

    const { cart } = props;

    return (
        <React.Fragment>

            <nav className="navbar navbar-default navbar-fixed-top banner" >
                <div className="container-fluid">

                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle Navigation</span>
                        <span className="icon-bar" ></span>
                        <span className="icon-bar" ></span>
                        <span className="icon-bar" ></span>
                    </button>


                    <NavLink className="navbar-brand" to='/'>ShopNinja
                    <span className="glyphicon glyphicon-shopping-cart" style={{ color: 'steelblue' }}></span>
                    </NavLink>

                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right" >
                            <li ><NavLink to='/' exact activeStyle={{ color: 'green' }}>Home</NavLink></li>
                            <li ><NavLink to='/my_orders' exact activeStyle={{ color: 'green' }}>My Orders</NavLink></li>
    <li ><NavLink to='/my_cart' exact activeStyle={{ color: 'green' }}>My Cart ( {cart.length} ) </NavLink></li>
                        </ul>
                    </div>

                </div>
            </nav>
        </React.Fragment>
    )
}

//step 1 : mapStateToProps 
const mapStateToProps = state => {
    return {
        cart :  state.cart
    }
}

//step 2 : connect this component to redux store 
export default connect(mapStateToProps)(NavBar)


