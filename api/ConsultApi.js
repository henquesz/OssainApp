import axios, * as others from 'axios';

export default async function getCurrentWeather(locationCoords){

    const lat = locationCoords.latitude

    const log = locationCoords.longitude

    var results = []
    
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=07bbce9208ba2e983b1c145eb654af71`)
    .then(function (response) {
        const data = response.data
        const locationName = (data.sys.country + ', ' + data.name)
        const temperaturaMin = data.main.temp_min
        const temperaturaMax = data.main.temp_max
        const wind = data.main.wind
        const humidity = data.main.humidity
        const pressure = data.main.pressure
        const currentTemperature = data.main.temp_max

        results = [currentTemperature, temperaturaMin, temperaturaMax, locationName, wind, humidity, pressure]

        console.log(data)
    }).catch((error) => {
        console.log(error)
    })
    return results
}