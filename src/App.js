import React from 'react';
// import logo from './logo.svg';
import './App.css';

//React Router imports
import { Switch, Route, Router } from 'react-router-dom'

//React-Redux imports
import { Provider } from 'react-redux';
import mobileStore from './redux/mobiles/mobileStore';

//In house Component imports
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail'
import MyOrders from './components/MyOrders'
import MyCart from './components/MyCart'
import DefaultComp from './components/DefaultComp';

function App() {

  console.log("main com rendered")

  return (
    <Provider store={mobileStore}>

      <div className="App">
        <Switch>
          <Route path='/' exact strict component={ProductList} />
          <Route path='/details' exact strict component={ProductDetail} />
          <Route path='/my_orders' exact strict component={MyOrders} />
          <Route path='/my_cart' exact strict component={MyCart} />
          <Route component={DefaultComp} />
        </Switch>
      </div>

    </Provider>
  );
}

export default App;
