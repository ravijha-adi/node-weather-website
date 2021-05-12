console.log('running javascript')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')



weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    const location = search.value
    console.log(location)
    const url = '/weather?address=' + encodeURIComponent(location)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msg1.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forcast)
                msg1.textContent = 'Location is ' + data.location
                msg2.textContent = 'Temperature: ' + data.forcast.temperature + ', Forcast: ' + data.forcast.weather + ', Humidity: '+data.forcast.humidity
            }
        })
    })
})