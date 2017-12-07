import { authHeader } from '../_helpers/auth-header';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }

    return fetch('/users/authenticate', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText)
            }

            return response.json();
        })
        .then(user => {
            if (user && user.token) {
                localStorage.setItem('user', JSON.stringify(user))
            }

            return user
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch('/users', requestOptions).then(handleResponse)
}

function getById(id) {
    const requestOptions = {
        mehtod: 'GET',
        headers: authHeader()
    }

    return fetch('/users/' + id, requestOptions).then(handleResponse)
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'ContentType': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch('/users/register', requestOptions).then(handleResponse)
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'ContentType': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch('/users/' + user.id, requestOptions).then(handleResponse)
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    }

    return fetch('/users/' + id, requestOptions).then(handleResponse)
}

function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }

    return response.json()
}