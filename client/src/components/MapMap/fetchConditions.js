// import React from 'react';
import {format, fromUnixTime} from 'date-fns';

const fetchConditions = async (position) => {

  let currentPosition = [...position];
  // console.log('position at fetch ', currentPosition);
  return(
    fetch('/api/conditions', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json"
      },
      body:JSON.stringify({currentPosition})
    })
      .then(data => data.json())
      .then(data => {
        // console.log('fetched conditions ', data.conditions);
        // console.log('windSpeed ', data.conditions.currently.windSpeed);
        // console.log('data.sunTimes', data.sunTimes);
        let sunTimes = [];
        if(data.sunTimes){
          sunTimes = [...data.sunTimes];
        // console.log('fetch sunTimes', format(fromUnixTime(sunTimes[0]), 'H') );
          sunTimes = [
            Number(format(fromUnixTime(sunTimes[0]), 'H')),
            Number(format(fromUnixTime(sunTimes[1]), 'H')),
            Number(format(fromUnixTime(sunTimes[2]), 'H')),
          ]
        };
        let currentConditions = data.conditions.currently;
        return [currentConditions, sunTimes];
      }).catch(err => console.log('cond err', err))
  )
};


export default fetchConditions;