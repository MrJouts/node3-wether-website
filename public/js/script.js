const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchData = (location = '') => {
    return fetch(`/weather?address=${location}`)
        .then(res => {
            res.json()
                .then(data => {
                    if (data.error) {
                        messageOne.textContent = `Error: ${data.error} `
                    } else {
                        messageOne.textContent = data.name
                        messageTwo.textContent = data.forecastData
                    }
                })
        });
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''
    fetchData(location)
})

