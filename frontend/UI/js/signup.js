const signUp = document.querySelector('#signup');

signUp.addEventListener('click', async (e) => {
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

    if(values.password !== values['re_pass']){
        return window.setStatus('error', true, 'Password should be equal to confirm password')
    }

    try{
        signUp.classList.add('loading');
        signUp.disabled = true;
        const response = await window.fetchHelper('POST', 'signup', values);
        signUp.classList.remove('loading');
        signUp.disabled = false;
        if(response.status === 201){
            window.setStatus('success',true,'User created. Redirecting to dashboard');
            setTimeout(() => {
                location.assign('dashboard.html')
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