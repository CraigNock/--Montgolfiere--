'use strict';

const request = require('request-promise');
const moment = require('moment-timezone');

// const ImageSearchAPIClient = require('@azure/cognitiveservices-imagesearch');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const Search = require('azure-cognitiveservices-search');


const {startingLocations} = require('./data.js');

const randy = (min, max) => { 
    let rand = Math.floor((Math.random()*(max - min)) + min);
    return rand;
  };


require('dotenv').config();


const darkGet = async (lat, long) => {
  try{
    //units=si gives windspeed in m/s, units=ca gives kph
    let darkData = await request(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${lat},${long}?units=ca&exclude=minutely,hourly,alerts,flags`);
    darkData = JSON.parse(darkData);
    return darkData;
  } catch(err) {console.log('error', err)}
};
const getConditions = async (req, res) => {
  let position = req.body.currentPosition;
  let lat = position[0];
  let long = position[1];
  let conditions = await darkGet(lat, long);
  let sunTimes = [
    conditions.currently.time, 
    conditions.daily.data[3].sunriseTime,
    conditions.daily.data[3].sunsetTime
  ]
  sunTimes = [...sunTimes];
  let timey = moment.unix(conditions.currently.time).tz(conditions.timezone).format('ha z');
  conditions.currently.time = timey;
  let windSum = (conditions.currently.windGust - conditions.currently.windSpeed)/2 + conditions.currently.windSpeed;
  conditions.currently.windSum = windSum;
  res.status(200).send({
    status:'200',
    conditions:conditions,
    sunTimes: sunTimes,
  })

};

const cityGet = async (lat, lon, range) => {
  try{
    let cityData = await request(`http://overpass-api.de/api/interpreter?data=[out:json];node(around:${range},${lat},${lon})["place"="city"];out;`);
    cityData = JSON.parse(cityData);
    return cityData;
  } catch(err) {console.log('error', err)};
};
const getNearestCity = async (req, res) => {
  let position = req.body.currentPosition;
  let lat = position[0];
  let lon = position[1];
  
  // note API rate limit is 2, so currently need limit re-searching on larger radius reqs to 2 attempts.
  let cities = await cityGet(lat, lon, 10000);
  // if(!cities.elements[0]) cities = await cityGet(lat, lon, 100000);
  if(!cities.elements[0]) cities = await cityGet(lat, lon, 1000000);
  // if(!cities.elements[0]) cities = await cityGet(lat, lon, 10000000);

  let cityList = [...cities.elements];
  cityList.sort((elementA, elementB) => {
    let a = Math.abs( (lat - elementA.lat)) + Math.abs((lon - elementA.lon) );
    let b = Math.abs( (lat - elementB.lat)) + Math.abs((lon - elementB.lon) );
    return a - b;
  });
  const cityObj = cityList[0].tags.name? cityList[0] : 'Atlantis';
  res.status(200).send({
    status:'200',
    cityObj:cityObj,
  })
};
//if elements[0] is undefined search again at 100 000m, 1000 000m, 10 000 000m etc (max 20k km (circumferance is 40k km))


/////////////////////
/// BING IMAGE /////
///////////////////


const retrieveImages = async (req, res) => {
  const { nearestCity } = req.params;
  let serviceKey = process.env.AZURE_COGNITIVE_KEY;

  //the search term for the request
  let searchTerm = `city of ${nearestCity} scenic`;
  //instantiate the image search client
  let credentials = new CognitiveServicesCredentials(serviceKey);
  let imageSearchApiClient = new Search.ImageSearchAPIClient(credentials);

  const sendImageQuery = async () => {
    return await imageSearchApiClient.imagesOperations.search(searchTerm, {
      imageType: "Photo",
    });
  };

  sendImageQuery().then(imageResults => {
    if (imageResults == null) {
    console.log("No image results were found.");
    }
    else {
        console.log(`Total number of images returned: ${imageResults.value.length}`);
        res.status(200).json({
          status: 200,
          images: [
            imageResults.value[0].contentUrl, 
            imageResults.value[1].contentUrl, 
            imageResults.value[2].contentUrl, 
            imageResults.value[3].contentUrl
          ],
        })
    }
  })
  .catch(err => {
    console.error(err);
    res.status(418).json({status: 418});
  })
};

module.exports = {
  getConditions,
  getNearestCity,
  retrieveImages,
};



