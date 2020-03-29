const convertToFormatted = (amount, withSymbol = true) => {
    return new Intl.NumberFormat(
        'en-US',
        {style: 'currency', currency: 'USD'}
    )
        .format(amount)
        .substr( withSymbol ? 0 : 1);
};

let users;

const depositModal = document.getElementById('depositModal');
const profitModal = document.getElementById('profitModal');

let currentDeposit, currentProfit;

const getRow = ({name, email, currentBalance, amountDeposited, _id}) => {
    const row = document.createElement('div');
    row.classList.add('tableRow');
    row.innerHTML = `
                <span>
                    <span class="small">
                        Name: 
                    </span>
                    ${name}
                </span>
                <span>
                    <span class="small">
                        #ID: 
                    </span>
                    ${_id}
                </span>
                <span>
                    <span class="small">
                        Email: 
                    </span>
                    ${email}
                </span>
                <span>
                    <span class="small">
                        Deposited:
                    </span>
                    ${convertToFormatted(amountDeposited)}
                </span>
                <span>
                    <span class="small">
                        Balance:
                    </span>
                    ${convertToFormatted(currentBalance)}
                </span>`;
    return row;
};

const getButtons = (id) => {
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    const depositButton = document.createElement('button');
    depositButton.classList.add('button');
    depositButton.innerHTML = 'Deposit';

    depositButton.addEventListener('click', () => {
        const user = users.find(({_id}) => id === _id);
        depositModal.querySelector('.modalText').innerHTML = `Target: ${user.name} (${user.email})`;
        currentDeposit = user.email;
        depositModal.classList.add('active');
    });

    const profitButton = document.createElement('button');
    profitButton.classList.add('button');
    profitButton.innerHTML = 'Add Profit';

    profitButton.addEventListener('click', () => {
        const user = users.find(({_id}) => id === _id);
        profitModal.querySelector('.modalText').innerHTML = `Target: ${user.name} (${user.email})`;
        currentProfit = user.email;
        profitModal.classList.add('active');
    });

    buttonsDiv.appendChild(depositButton);
    buttonsDiv.appendChild(profitButton);

    return buttonsDiv
};

const renderUsers = () => {
    // [...document.querySelectorAll('.tableRow')].forEach(row => row.remove());
    users.forEach(user => {
        const div = getRow(user);
        div.id = user._id;
        const buttons = getButtons(user['_id']);

        div.appendChild(buttons);

        document.querySelector('.table').appendChild(div);
    });
};

window.fetchHelper('GET', 'all-users')
    .then((response) => {
        if (response.status === 200) {
            return JSON.parse(response.responseText)
        }
        return Promise.reject();
    })
    .then(({users: fetchedUsers}) => {
        users = fetchedUsers;
        renderUsers()
    })
    .catch(err => {
        console.log(err);
        window.setStatus('error', true, 'There was an issue fetching the data. Kindly try again');
    });


depositModal.addEventListener('click', ({target}) => {
    if (depositModal.isEqualNode(target)) {
        depositModal.classList.remove('active')
    }
});

const depositButton = depositModal.querySelector('.button');
depositButton.addEventListener('click', async () => {
    const amount = depositModal.querySelector('.modalInput').value;
    depositButton.classList.add('loading');
    const fetch = await window.fetchHelper('POST', 'deposit', {
        "email": currentDeposit,
        "amount": Number(amount)
    });
    if(fetch.status === 200){
        const userIndex = users.findIndex(({email}) => email === currentDeposit);
        users[userIndex].amountDeposited = amount;
        users[userIndex].currentBalance = amount;
        renderUsers();
    }else{
        window.setStatus('error', true, 'There was an issue updating the records. Kindly try again')
    }
    depositButton.classList.remove('loading');
    depositModal.classList.remove('active');
});

profitModal.addEventListener('click', ({target}) => {
    if (profitModal.isEqualNode(target)) {
        profitModal.classList.remove('active')
    }
});

const profitButton = profitModal.querySelector('.button');
profitButton.addEventListener('click', async () => {
    const amount = profitModal.querySelector('.modalInput').value;
    profitButton.classList.add('loading');
    const fetch = await window.fetchHelper('POST', 'profit', {
        "email": currentProfit,
        "amount": Number(amount)
    });
    if(fetch.status === 200){
        const userIndex = users.findIndex(({email}) => email === currentProfit);
        users[userIndex].currentBalance += amount;
        renderUsers();
    }else{
        window.setStatus('error', true, 'There was an issue updating the records. Kindly try again')
    }
    profitButton.classList.remove('loading');
    profitModal.classList.remove('active');
});

[...document.querySelectorAll('.modalCancel')].forEach(button => {
    button.addEventListener('click', () => {
        const {target} = button.dataset;
        document.getElementById(target).classList.remove('active');
    })
})