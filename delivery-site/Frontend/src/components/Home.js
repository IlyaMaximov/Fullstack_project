import React from 'react';
import './styles/App.css';


function Home() {

    return (
        <div>
            
            <div class="sign_in">
                <a href="/sign_in" target="_self">
                    <button className="Button"> Sign in </button>
                </a>
            </div>


            <div class="sign_up">
                <a href="/sign_up" target="_self">
                    <button className="Button"> Sign up </button>
                </a>
            </div>

            <h1>Вас приветствует сайт доставки МФТИ</h1>
            
        </div>
    )
}

export default Home