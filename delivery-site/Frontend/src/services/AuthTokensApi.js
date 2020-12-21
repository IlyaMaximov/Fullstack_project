const baseUrl = 'http://127.0.0.1:8000/api/';


export async function getAuthTocken(user) {

    return await fetch(baseUrl + 'auth/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: '{"username" : "' + user.login + '", "password" : "' + user.password + '"}'
    }).then(data=>data.json())
}


export async function isCorrectToken(token) {

    return fetch(baseUrl + 'auth/token/verify/', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        body: '{"token" : "' + token + '"}'
    })
    .then(data=>data.json())
    .then(data => {

        if (Object.keys(data).length === 0) {
            return true;
        } else {
            return false;
        }
    })
}


export async function refreshToken(token) {

    return fetch(baseUrl + 'auth/token/refresh/', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
        body: '{"refresh" : "' + token + '"}'
    })
    .then(data=>data.json())
    .then(data => {
        return data.access;
    })
}


export async function isRegistratedUser() {

    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')

    if ((typeof access_token) !== "undefined" && await isCorrectToken(access_token)) {
        return true;
    }

    localStorage.removeItem('access_token');
    if ((typeof refresh_token) !== "undefined" && await isCorrectToken(refresh_token)) {
        access_token = await refreshToken(refresh_token);
        localStorage.setItem('access_token', access_token);
        return true;
    }
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('login');
    localStorage.removeItem('order_id');

    return false;
}


export async function RunAfterChecking(promise) { 

    return await isRegistratedUser().
        then(is_registered => {
            if (!is_registered) {
                window.location.href = 'http://localhost:3001/'
            } else {
                return promise
            }    
        })
}
