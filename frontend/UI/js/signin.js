const signIn = document.querySelector('#signin');

signIn.addEventListener('click', async (e) => {
    e.preventDefault();
    const form = document.querySelector('form');

    const inputs = [...form.querySelectorAll('input:not([type=submit])')];
    if(inputs.some(({value}) => !value)){
        return window.setStatus('error', true, 'Kindly fill all inputs')
    }
    const values = inputs.reduce((currentValues,{name,value}) => ({
        ...currentValues,
        [name]: value
    }),{});
    
    try{
        signIn.classList.add('loading');
        signIn.disabled = true;
        const response = await window.fetchHelper('POST', 'login', values);
        signIn.classList.remove('loading');
        signIn.disabled = false;
        const responseJson = JSON.parse(response.responseText);
        if(response.status === 200){
            window.setStatus('success',true,'User created. Redirecting to dashboard');
            localStorage.setItem('user', JSON.stringify({
                email: values.email,
                token: responseJson.token
            }));
            setTimeout(() => {
                location.assign('user.html')
            },3000)
        }else if(response.status === 400){
            window.setStatus('error',true,'User already exists. Kindly try another email or go to the login page')
        }else{
            window.setStatus('error')
        }
    }catch (e) {
        window.setStatus('error', true, 'Kindly check your internet connection and try again')
    }
});