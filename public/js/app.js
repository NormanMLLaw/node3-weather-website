// console.log('Client side javascript file is loaded.')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     });
// });


// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log('location = ' + data.location + ', ' + 'forecast = ' + data.forecast);
//         }
//     });
// });

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

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
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


