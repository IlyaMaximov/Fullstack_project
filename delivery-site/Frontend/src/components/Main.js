import React from 'react';
import './styles/Main.css';


function Main() {

    let basket_icon = "https://ecs7-p.tokopedia.net/img/cache/215-square/shops" +
                "-1/2017/8/15/21713343/21713343_3e588c7d-f674-4b31-93fe-389a6f666703.png";

    let new_order_icon = "https://cstor.nn2.ru/forum/data/forum/images/2018-12/222008915-n1.jpg";

    function handleLogout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('login')
        localStorage.removeItem('order_id')
    }

    return (
        
        <div className="Main">
            
            <div className="LogOutButton">
                <a href="/" target="_self">
                    <button className="Button" onClick={handleLogout}>Log out</button>
                </a>
            </div>

            <div className="NewOrderButton">
                <a href="/order_constructor" target="_self">
                    <button className="Button">
                        <img className="basket" alt="icon.png" src={new_order_icon}/>
                    </button>
                </a>
            </div>

            <div className="BasketButton">
                <a href="/basket" target="_self">
                    <button className="Button">
                        <img className="bascket" alt="icon.png" src={basket_icon}/>
                    </button>
                </a>
            </div>

        </div>
    )
}

export default Main