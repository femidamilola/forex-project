const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

console.log(user)

if (user) {
    window.fetchHelper('GET', `dashboard/${user.email}`, null,[
        {
            key: 'x-access-token',
            value: user.token
        }
    ])
}

