import React from 'react';
// import logo from './logo.svg';
import './App.css';

//React Router imports
import { Switch, Route } from 'react-router-dom'

//React-Redux imports
import { Provider } from 'react-redux';
import mobileStore from './redux/mobiles/mobileStore';

//In house Component imports
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail'
import MyOrders from './components/MyOrders'
import MyCart from './components/MyCart'
import DefaultComp from './components/DefaultComp';
import PaymentComponent from './components/PaymentComponent';
import FooterComponent from './components/FooterComponent';

function App() {

  return (
    <Provider store={mobileStore}>

      <div className="App">
        <Switch>
          <Route path='/' exact strict component={ProductList} />
          <Route path='/details' exact strict component={ProductDetail} />
          <Route path='/my_orders' exact strict component={MyOrders} />
          <Route path='/my_cart' exact strict component={MyCart} />
          <Route path='/make_payment' exact strict component={PaymentComponent} />
          <Route component={DefaultComp} />
        </Switch>
        <FooterComponent />
      </div>

    </Provider>
  );
}

export default App;
