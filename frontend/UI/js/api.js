const API_URL = 'https://dashboard-ayp.herokuapp.com/';
// const API_URL = 'http://localhost:3200';

const makeRequest = async (method, url, body = null, headers = []) => new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('load', () => resolve(request));
    request.addEventListener('error', () => reject(request));

    request.open(method, url);

    if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }

    headers.map(({key, value}) => {
        request.setRequestHeader(key, value)
        console.log(key, value)
    });

    request.send(JSON.stringify(body));
});

window.fetchHelper = async (method, route, body = null, headers = []) => {
    try {
        let response;
        if (body) {
            response = await makeRequest(method, `${API_URL}/${route}`, body, headers)
        } else {
            response = await makeRequest(method, `${API_URL}/${route}`, null, headers)
        }
        return response
    } catch (e) {
        console.log(e);
    }
};
