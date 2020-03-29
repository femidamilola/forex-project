const API_URL = 'http://forex-dashboard-ayp.herokuapp.com';

const makeRequest = async (method,url, body = null) => new Promise((resolve,reject) => {
    const request = new XMLHttpRequest();

    request.addEventListener('load',() => resolve(request));
    request.addEventListener('error',() => reject(request));

    request.open(method,url);

    if(body){
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    }

    request.send(JSON.stringify(body));
});

window.fetchHelper = async (method, route, body = null) => {
    try {
        let response;
        if(body){
            response = await makeRequest(method,`${API_URL}/${route}`,body)
        }else{
            response = await makeRequest(method,`${API_URL}/${route}`)
        }
        return response
    } catch (e) {
        console.log(e);
    }
};
