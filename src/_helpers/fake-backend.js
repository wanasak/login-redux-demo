export function configureFakeBackend() {
    let users = [{ username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }]
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
 
            }, 500)
        })
    }
}