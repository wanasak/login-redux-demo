export function configureFakeBackend() {
    
    // array in local storage for registered users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    let realFetch = window.fetch

    window.fetch = function(url, opts) {
        return new Promise((res, rej) => {
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body)

                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password
                    })

                    if (filteredUsers.length) {
                        let user = filteredUsers[0]
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        }
                        
                        return res({ ok: true, json: () => responseJson })
                    } else {
                        return rej('Username or password is incorrect')
                    }

                    return
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        res({ ok: true, json: () => users })
                    } else {
                        rej('Unauthorized')
                    }

                    return
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    let newUser = JSON.parse(opts.body)

                    // validation
                    let duplicateUser = users.filter(user => user.username === newUser.username).length
                    if (duplicateUser) {
                        rej('Username' + newUser.username + ' is already taken')
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser)
                    localStorage.setItem('users', JSON.stringify(users))
                
                    res({ ok: true, json: () => ({})})

                    return
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        let urlParts = url.split('/')
                        let id = parseInt(urlParts[urlParts.length - 1])
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i]
                            if (user.id === id) {
                                users.splice(i, 1)
                                localStorage.setItem('users', JSON.stringify(users))
                                break;
                            }
                        }

                        res({ ok: true, json: () => ({})})
                    } else {
                        rej('Unauthorized')
                    }

                    return
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => res(response));                
 
            }, 500)
        })
    }
}