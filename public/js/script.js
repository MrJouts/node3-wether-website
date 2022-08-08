const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const image = document.querySelector('#image')

const fetchData = (location = '') => {
    return fetch(`/weather?address=${location}`)
        .then(res => {
            res.json()
                .then(data => {
                    if (data.error) {
                        messageOne.textContent = `Error: ${data.error} `
                    } else {
                        messageOne.textContent = data.name
                        const {temperature, precip, observation_time, weather_icons } = data.forecastData.current
                        let message = `
                            There is  ${temperature}°C and a ${precip}% to rain.
                            Local time: ${observation_time}
                        `;
                        messageTwo.textContent = message
                        const imgElement = document.createElement('img')
                        imgElement.setAttribute('src', weather_icons[0])
                        image.appendChild(imgElement)
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

