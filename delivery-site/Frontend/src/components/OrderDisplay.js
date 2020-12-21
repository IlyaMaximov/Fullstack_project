import React from 'react'
import { getOrder, getUserInfo } from '../services/BackApi'
import { RunAfterChecking } from '../services/AuthTokensApi';
import './styles/RequestForm.css'


class OrderDisplay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: localStorage.getItem('order_id'),
            login: localStorage.getItem('login'),
            store_name: null,
            products: null,
            gratuity: null,
            user_name: null, 
            hostel_num: null,
            room_num: null
        };

        RunAfterChecking(getOrder(localStorage.getItem('order_id'))
            .then(order => {
                this.setState({store_name: order.store_name});
                this.setState({products: order.products});
                this.setState({gratuity: order.gratuity});
            }));

        RunAfterChecking(getUserInfo(this.state.login)
            .then(user => {
                this.setState({user_name: user.user_name});
                this.setState({hostel_num: user.hostel_num});
                this.setState({room_num: user.room_num});
            }));

    }

    handleBack = event => {
        event.preventDefault();
        this.props.history.push("basket");
    }

    render() {

        return (

            <form className="request_form">

                <div className="post">
                    <label>Название магазина: </label>
                    <text type="text" name="store_name"> {this.state.store_name} </text>
                </div>

                <div className="post">
                    <label>Нужные продукты: </label>
                    <text type="text" name="products"> {this.state.products} </text>
                </div>

                <div className="post">
                    <label>Предлагаемые чаевые(руб.): </label>
                    <text type="text" name="gratuity"> {this.state.gratuity} </text>
                </div>

                <div className="post">
                    <label>Ваше имя: </label>
                    <text type="text" name="user_name"> {this.state.user_name} </text>
                </div>

                <div className="post">
                    <label>Номер общежития: </label>
                    <text type="text" name="hostel_num"> {this.state.hostel_num} </text>
                </div>

                <div className="post">
                    <label>Номер комнаты: </label>
                    <text type="text" name="room_num"> {this.state.room_num} </text>
                </div>

        
                <div className="backButton">
                    <a href="/main" target="_self">
                        <button type="back" className="Button" onClick={this.handleBack}> Back </button> 
                    </a>    
                </div>  
   
            </form>
        );
    }
}

export default OrderDisplay;