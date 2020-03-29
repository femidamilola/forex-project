// const users = [
//     {
//         "amountDeposited": 0,
//         "currentBalance": 0,
//         "_id": "5e80619789cb6f3fa880d730",
//         "email": "dyeminifemi@gmail.com",
//         "password": "$2a$12$EUmJAooZ2ZisPEpsIZ.17eLEz8iE20RYeu0JA85ZddxqCDyM3GSs6",
//         "name": "Oluwanifemi Adeyemi",
//         "__v": 0
//     },
//     {
//         "amountDeposited": 30,
//         "currentBalance": 30,
//         "_id": "5e806352969a7b0b58744171",
//         "email": "deyeminifemi@gmail.com",
//         "password": "$2a$12$RR.n1Nx8Yo0V0gPxyBteEeTDhxwc6tI6rmNrHHMnTwUvpB7x9IrOS",
//         "name": "Oluwanifemi Adeyemi",
//         "__v": 0
//     },
//     {
//         "amountDeposited": 0,
//         "currentBalance": 0,
//         "_id": "5e80662c969a7b0b58744172",
//         "email": "yeminifemi@gmail.com",
//         "password": "$2a$12$dvklLQNj6/0cHEB4p0rBluDT5lcKIyVndb5JN2XR.pI.kWVOherb2",
//         "name": "Oluwanifemi Adeyemi",
//         "__v": 0
//     },
//     {
//         "amountDeposited": 0,
//         "currentBalance": 0,
//         "_id": "5e806679969a7b0b58744173",
//         "email": "eminifemi@gmail.com",
//         "password": "$2a$12$vx2gSoFp8gHfXUFmM3inru81E4Ue3RdsbBoddiYN3.Z3Vx9e1LfFC",
//         "name": "Oluwanifemi Adeyemi",
//         "__v": 0
//     },
//     {
//         "amountDeposited": 0,
//         "currentBalance": 0,
//         "_id": "5e806684969a7b0b58744174",
//         "email": "minifemi@gmail.com",
//         "password": "$2a$12$ks6EJX.vivRGWGaOzjvK4ejeCSQkvdWjLjv0Gf/zOGQ/MG33C3Z2C",
//         "name": "Oluwanifemi Adeyemi",
//         "__v": 0
//     },
//     {
//         "amountDeposited": 0,
//         "currentBalance": 0,
//         "_id": "5e806697969a7b0b58744175",
//         "email": "deyeminifemi@gmail.co",
//         "password": "$2a$12$k9.vfjuPSCR3qP.zstz.zuhxe0oVn2sA2r52.Guo0X7RQ9OaDJ2xO",
//         "name": "Oluwanifemi Adeyemi",
//         "__v": 0
//     }
// ];

let users;

const depositModal = document.getElementById('depositModal');
const profitModal = document.getElementById('profitModal');

let currentDeposit,currentProfit;

const getRow = ({name, email, currentBalance,amountDeposited, _id}) => {
    const row = document.createElement('div');
    row.classList.add('tableRow');
    row.innerHTML = `
                <span>
                    ${name}
                </span>
                <span>
                    ${_id}
                </span>
                <span>
                    ${email}
                </span>
                <span>
                    ${amountDeposited}
                </span>
                <span>
                    ${currentBalance}
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
        currentDeposit = user._id;
        depositModal.classList.add('active');
    });

    const profitButton = document.createElement('button');
    profitButton.classList.add('button');
    profitButton.innerHTML = 'Add Profit';

    profitButton.addEventListener('click', () => {
        const user = users.find(({_id}) => id === _id);
        profitModal.querySelector('.modalText').innerHTML = `Target: ${user.name} (${user.email})`;
        currentProfit = user._id;
        profitModal.classList.add('active');
    });

    buttonsDiv.appendChild(depositButton);
    buttonsDiv.appendChild(profitButton);

    return buttonsDiv
};

window.fetchHelper('GET', 'all-users')
    .then((response) => {
        if(response.status === 200){
            return JSON.parse(response.responseText)
        }
        return Promise.reject();
    })
    .then(({users: fetchedUsers}) => {
        users = fetchedUsers;
        users.forEach(user => {
            const div = getRow(user);

            const buttons = getButtons(user['_id']);

            div.appendChild(buttons);

            document.querySelector('.table').appendChild(div);
        });
    })
    .catch(err => {
        console.log(err);
        window.setStatus('error', true, 'There was an issue fetching the data. Kindly try again');
    });


depositModal.addEventListener('click', ({target}) => {
    if(depositModal.isEqualNode(target)){
        depositModal.classList.remove('active')
    }
});

profitModal.addEventListener('click', ({target}) => {
    if(profitModal.isEqualNode(target)){
        profitModal.classList.remove('active')
    }
});