const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// prevent default, prevent default is going to prevent that default behavior, 
// which is to refresh the browser, allowing the server to render a new page and 
// instead it's going to do nothing.
// It's just going to allow us to do whatever we want by letting the function run.

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const location = search.value;

    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    });
});

    console.log(location);
});


