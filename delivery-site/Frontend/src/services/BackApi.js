import { getAuthTocken } from './AuthTokensApi'

const baseUrl = 'http://127.0.0.1:8000/api/';


////////// Users //////////

export const getLoginsOfUsers = () => {
    return fetch(baseUrl + 'persons/logins/')
        .then(data=>data.json());
}


export const getUserInfo = (login) => {
    return fetch(baseUrl + 'person_info/' + login + '/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(data=>data.json())
    .then(user => user[0])
}


export async function registerUser (user) {

    await fetch(baseUrl + 'users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: '{"username" : "' + user.login + '", "password" : "' + user.password + '"}'
    }).then(data=>data.json())


    await getAuthTocken(user)
        .then(data=> {
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
        });

    
    await fetch(baseUrl + 'persons/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(user)
    }).then(data=>data.json())
}


export const deleteUser = (login) => {
    return fetch(baseUrl + 'person/' + login, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
    }).then(data=>data.json())
}



////////// Orders //////////

export const getUserOrders = (login) => {
    return fetch(baseUrl + 'orders/' + login + '/', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    })
    .then(data=>data.json())
}

export const getOrder = (id) => {
    return fetch(baseUrl + 'order/' + id + '/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
    })
    .then(data=>data.json())
    .then(order => order[0])
}

export const addOrder = (order) => {
    return fetch(baseUrl + 'orders/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify(order)
    })
    .then(order => order.json())
    .then(order => console.log(order))
}

export const deleteOrder = (id) => {
    return fetch(baseUrl + 'order/' + id + '/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
    })
}