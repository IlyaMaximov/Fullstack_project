import React from 'react'
import { addOrder } from '../services/BackApi'
import './styles/RequestForm.css'
import { RunAfterChecking } from '../services/AuthTokensApi';


class OrderConstructor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            store_name: null,
            products: null,
            gratuity: null,
            person: localStorage.getItem('login'),
        };
    }

    handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;

        switch(name) {
            case "store_name":
                this.setState({store_name: value});
                break;
            case "products":
                this.setState({products: value});
                break;
            case "gratuity":
                this.setState({gratuity: value});
                break;
            default:
                break;
        }

    }

    isValid = state_field => {
        return (state_field !== null && state_field.length !== 0);
    }

    handleSubmit = event => {
        event.preventDefault();

        let correctFormat = false;
        if (!this.isValid(this.state.store_name) || !this.isValid(this.state.products) ||
            !this.isValid(this.state.gratuity)) {

            alert("Заполните все поля");
        } else if (isNaN(this.state.gratuity)) {
            alert("Чаевые должны иметь числовой формат");
        } else {
            correctFormat = true;
        }

        if (!correctFormat) {
            return;
        }

        RunAfterChecking(addOrder(this.state));
        this.props.history.push("/main");   
    }

    handleBack = event => {
        event.preventDefault();
        this.props.history.push("/main");
    }

    render() {
        return (
    
            <form className="request_form">

                <div className="question">
                    <label>Название магазина: </label>
                    <input type="text" name="store_name" onChange={this.handleChange}></input>
                </div>
                <div className="question">
                    <label>Нужные продукты: </label>
                    <input type="text" name="products" onChange={this.handleChange}></input>
                </div>
                
                <div className="question">
                    <label>Предлагаемые чаевые(руб.): </label>
                    <input type="text" name="gratuity" onChange={this.handleChange}></input>
                </div>

        
                <div className="backButton">
                    <a href="/main" target="_self">
                        <button type="back" className="Button" onClick={this.handleBack}> Back </button> 
                    </a>    
                </div>  

                <div className="submitButton">
                    <button type="submit" className="Button" onClick={this.handleSubmit}> OK </button>
                </div>    
            </form>
        );
    }
}

export default OrderConstructor;