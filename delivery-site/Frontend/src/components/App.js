import React from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import HomePage from './Home';
import MainPage from './Main';
import BasketPage from './Basket';
import OrderConstructorPage from './OrderConstructor';
import OrderDisplayPage from './OrderDisplay';
import PrivateRoute from './PrivateRoute';


function App() {

    return (
        <div>

            <Router>
                <Switch>
                    <Route path='/sign_in' component={SignIn} />
                    <Route path='/sign_up' component={SignUp} />
                    <PrivateRoute path='/main' component={MainPage} />
                    <PrivateRoute path='/basket' component={BasketPage} />
                    <PrivateRoute path='/order_constructor' component={OrderConstructorPage} />
                    <PrivateRoute path='/order_display' component={OrderDisplayPage} />
                    <Route path='/' component={HomePage} />
                </Switch>
            </Router>

        </div>
    )       
}

export default App