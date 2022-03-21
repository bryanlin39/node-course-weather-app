const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f2893b26b5cd5401c2315057d692e425&query=${latitude},${longitude}&units=f`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location. Please try a different search term.', undefined);
        } else {
            callback(undefined, `The weather is currently ${body.current.weather_descriptions[0]}. It is ${body.current.temperature} degrees F outside, and it feels like ${body.current.feelslike} degrees F. The humidity is ${body.current.humidity}%.`);
        }
    });
};

module.exports = forecast;