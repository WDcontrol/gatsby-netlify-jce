const axios = require("axios")

exports.handler = function (event, context, callback) {
  let city = event.queryStringParameters.city
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2b44a59ccf84efc8a751a69269705b37`
    )
    .then(response => {
      console.log(response)
      let tempKelvin = +response.data.main.temp
      let tempCelcius = tempKelvin - 273.15
      let wind = response.data.wind.speed
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ temp: tempCelcius + "C°", wind: wind + "m/s" }),
      })
    })
    .catch(error => {
      console.error(error)
      callback(null, {
        statusCode: 400,
        body: JSON.stringify(error.message),
      })
    })
}
