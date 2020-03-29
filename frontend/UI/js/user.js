const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

const convertToFormatted = (amount, withSymbol = true) => {
    return new Intl.NumberFormat(
        'en-US',
        {style: 'currency', currency: 'USD'}
    )
        .format(amount)
        .substr( withSymbol ? 0 : 1);
};

if (user) {
    window.fetchHelper('GET', `dashboard/${user.email}`, null, [
        {
            key: 'x-access-token',
            value: user.token
        }
    ])
        .then((response) => {
            if (response.status === 200) {
                return JSON.parse(response.responseText)
            }
            return Promise.reject()
        })
        .then(user => {
            const keys = [
                'amountDeposited',
                'currentBalance',
                '_id',
                'email',
                'name',
            ];
            keys.forEach(key => {
                if([
                    'amountDeposited',
                    'currentBalance',
                ].includes(key)){
                    document.getElementById(key).innerHTML = convertToFormatted(user[key])
                }else{
                    document.getElementById(key).innerHTML = user[key]
                }
            });
            if(user.currentBalance){
                const increase = ((user.currentBalance - user.amountDeposited)/user.currentBalance) * 100
                document.getElementById('increase').innerHTML = `${increase}%`
            }else{
                document.getElementById('increase').innerHTML = '0%'
            }
        })
        .catch(err => {
            console.log(err);
            window.setStatus('error', true, 'There was an error fetching your details. Kindly check your internet connection and try again.')
        });
}

