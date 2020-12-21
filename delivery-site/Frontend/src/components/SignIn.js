import React from 'react'
import { getAuthTocken } from '../services/AuthTokensApi';
import './styles/RequestForm.css'


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: null,
            password: null
        };
    }

    handleChange = event => {
        event.preventDefault();
        
        const { name, value } = event.target;

        switch(name) {
            case "login":
                this.setState({login: value});
                break;
            case "password":
                this.setState({password: value});
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

        if (!this.isValid(this.state.login) || !this.isValid(this.state.password)) {
            alert("Заполните все поля");
            return;
        }
    
        getAuthTocken(this.state).then((data) => {

            if (typeof data.access === 'undefined') {
                alert("Некорректный логин или пароль");
            } else {
                localStorage.setItem('login', this.state.login);
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                this.props.history.push("/main");
            }
  
        });
    }

    handleBack = event => {
        event.preventDefault();
        this.props.history.push("/");
    }

    render() {
        return (
    
                <form className="request_form">
                    <div className="question">
                        <label htmlFor="username">Login: </label>
                        <input type="text" name="login" onChange={this.handleChange}></input>
                    </div>
                    
                    <div className="question">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" onChange={this.handleChange}></input>
                    </div>


                    <div className="backButton">
                        <button type="back" className="Button" onClick={this.handleBack}> Back </button>  
                    </div> 

                    <div className="submitButton">
                      <button type="submit" className="Button" onClick={this.handleSubmit}> OK </button>
                    </div>  
                </form>   
        );
    }
}

export default SignIn;