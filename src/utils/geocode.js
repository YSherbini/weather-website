const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWFoeWFpcyIsImEiOiJjbHBxd25zaWUwMXV2MmtvMXp5azNveXAxIn0.CLRb2yuYDu5gtebbpr1aVg&limit=1`;
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            return callback('Unable to connect to location services!', undefined);
        }
        if (body.features.length === 0) {
            return callback("Unable to find location. Try another location.", undefined);
        }
        callback(undefined, {
            lat: body.features[0].center[1],
            long: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode