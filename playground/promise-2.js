const request = require('request');

var geocodeAddress = (address) => {
  return new Promise((reslove, reject) => {
    const encodedAddress = encodeURIComponent(address);

    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDnT6qbB3wnrdMWDlfGcBvbohvITNteuys`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers!');
      } else if (body.status === 'OVER_QUERY_LIMIT') {
        reject(body.error_message);
      } else if (body.status === 'ZERO_RESULTS') {
        reject('Unable to find the address');
      } else if (body.status === 'OK') {
        reslove({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('225 west monipur mirpur Dhaka').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
  console.log(errorMessage);
});