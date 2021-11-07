const request = require('request');

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e839578627bb0cc14ebd660790377ad1&query=' + latitude + ',' + longitude + '&units=m';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service! ', undefined);
        } else if ( body.error) {
            callback('Unable to find location for weather service. Try another search. ', undefined);
        } else {
        //     callback(undefined, {
        //         weather_descriptions: body.current.weather_descriptions[0] ,
        //         temperature: body.current.temperature,
        //         feelslike: body.current.feelslike,
        //         timezone_id: body.location.timezone_id,
        //   });
             callback(undefined, body.current.weather_descriptions[0] + ' today, temperature is ' +body.current.temperature + '°C, feelslike ' + body.current.feelslike + '°C. Humidity is ' + body.current.humidity + '%. Timezone ID is ' +  body.location.timezone_id);
        }
    });
}

module.exports = forecast;