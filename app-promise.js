const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDnT6qbB3wnrdMWDlfGcBvbohvITNteuys`;

axios
  .get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.');
    } else if (response.data.status === 'OVER_QUERY_LIMIT') {
      console.log(response.data.error_message);
      return;
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/5ff61a815a5437a5e6418598a47268be/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl);
  })
  .then((response) => {
    var temperature = response.data.currently.temperature;
    var aparentTemperature = response.data.currently.aparentTemperature;
    console.log(`Its currently ${temperature}. It feels like ${aparentTemperature}`);
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers!');
    } else {
      console.log(e.message);
    }
  });