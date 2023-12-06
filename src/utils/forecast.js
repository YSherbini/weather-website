const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ea4d2f6eb97cc3caa92186540a24de92&query=${lat},${long}&units=f`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      return callback("Unable to connect to weather service.", undefined);
    }
    if (body.error) {
      return callback("Unable to find location.", undefined);
    }
    callback(
      undefined,
      `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out, It feels like ${body.current.feelslike} degrees out.`
    );
  });
};

module.exports = forecast;
