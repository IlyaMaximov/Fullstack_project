import React from 'react'
import './styles/RequestForm.css'
import { getLoginsOfUsers, registerUser } from '../services/BackApi'

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            login: null,
            password: null,
            hostel_num: undefined,
            room_num: undefined,
            user_name: undefined
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
            case "hostel_num":
                this.setState({hostel_num: value});
                break;
            case "room_num":
                this.setState({room_num: value});
                break;  
            case "user_name":
                this.setState({user_name: value});
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

        let incorrectFormat = true;
        if (!this.isValid(this.state.login) || 
            !this.isValid(this.state.password) || !this.isValid(this.state.hostel_num) ||
            !this.isValid(this.state.room_num) || !this.isValid(this.state.user_name)) {

            alert("Заполните все поля");
        } else if (isNaN(this.state.hostel_num)) {
            alert("Номер общежития должен иметь числовой формат");
        } else if (isNaN(this.state.room_num)) {
            alert("Номер комнаты должен иметь числовой формат");
        } else {
            incorrectFormat = false;
        }

        if (incorrectFormat) {
            return; 
        }

        getLoginsOfUsers().then((data) => {

            let is_existing_user = false;

            data.forEach(element => {
                if (element.login === this.state.login) {
                    is_existing_user = true;
                }
            });

            if (is_existing_user) {
                alert("Пользователь с данным логином уже существует")
            } else {
                localStorage.setItem('login', this.state.login);
                registerUser(this.state);
                this.props.history.push("/main");
            }
            
            },
            (error) => {
            console.log(error); 
            }
        );
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
                        <label>Ваше имя: </label>
                        <input type="text" name="user_name" onChange={this.handleChange}></input>
                    </div>

                    <div className="question">
                        <label>Номер общежития: </label>
                        <input type="text" name="hostel_num" onChange={this.handleChange}></input>
                    </div>

                    <div className="question">
                        <label>Номер комнаты: </label>
                        <input type="text" name="room_num" onChange={this.handleChange}></input>
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

export default SignUp;