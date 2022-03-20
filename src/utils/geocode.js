const request = require('postman-request');

const geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiYnJ5YW4zbGluIiwiYSI6ImNreHR3aTJpYjVwOXkyd3E5anZydWxlcmcifQ.TskdowKpKPKT1WXrWqtGcA&limit=1`;

    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to gecoding service.', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try a different search term.', undefined);
        } else {
            callback(undefined, {
               latitude: body.features[0].center[1],
               longitude: body.features[0].center[0],
               location: body.features[0].place_name
            });
        }
    });
}

module.exports = geocode;