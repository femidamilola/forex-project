const statusDiv = document.createElement('div');
statusDiv.classList.add('status');

window.setStatus = (status, hide = true, text = '') => {
    if(status === 'success'){
        statusDiv.className = 'status status--success';
        statusDiv.innerText = text || 'Congratulations! Your form has been submitted successfully.';
    }else if(status === 'error'){
        statusDiv.className = 'status status--error';
        statusDiv.innerText = text || 'Oops! Your form was not submitted due to an error. Please try again'
    }
    if(hide){
        setTimeout(() => {
            statusDiv.className = 'status'
        },5000)
    }
};

document.body.appendChild(statusDiv);