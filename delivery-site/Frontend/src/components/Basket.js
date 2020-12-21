import React from 'react';
import './styles/Orders.css';
import { getUserOrders, deleteOrder } from '../services/BackApi';
import { RunAfterChecking } from '../services/AuthTokensApi';


class Basket extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            orders: []
        };

        RunAfterChecking(
            getUserOrders(localStorage.getItem('login'))
                .then(data => this.setState({orders: data})))
    }

    handleBack = event => {
        event.preventDefault();
        this.props.history.push("/main");
    }

    handleDrop = (event) => {
        event.preventDefault();
        let id = event.target.getAttribute('id');
        RunAfterChecking(
            deleteOrder(id.toString()))
        window.location.reload();
    }

    handleOpenOrder = (event) => {
        event.preventDefault();
        let id = event.target.getAttribute('id');
        localStorage.setItem('order_id', id);
        this.props.history.push("/order_display");
    }

    render() {

        let xImgSource = "https://www.nicepng.com/png/full/12-127128_free-cancel-button-png-photos-dingle-peninsula.png";

        return (

            <div className="basket_form">
    
                <form className="orders_form">

                        {this.state.orders.map(order => (
                            <div className="Slot" key={order.id}>
                                <button id={order.id} type="back" className="Button" onClick={this.handleOpenOrder}>Заказ №{order.id}</button>

                                <div className="xButton">
                                    <button id={order.id} className="Button" onClick={this.handleDrop}>
                                        <img id={order.id} className="xImg" alt="icon.png" src={xImgSource}/>
                                    </button>
                                </div>
                            </div>            
                        ))}
                   
                </form>
                            
                <div className="backButton1">
                    <a href="/main" target="_self">
                        <button type="back" className="Button" onClick={this.handleBack}> Back </button> 
                    </a>    
                </div>  

            </div>
        );
    }
}


export default Basket;