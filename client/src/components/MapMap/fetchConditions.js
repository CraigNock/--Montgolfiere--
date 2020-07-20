import {format, fromUnixTime} from 'date-fns';
import { IP } from '../../constants';

const fetchConditions = async (position) => {

  let currentPosition = [...position];
  return(
    fetch(`${IP}/api/conditions`, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json"
      },
      body:JSON.stringify({currentPosition})
    })
      .then(data => data.json())
      .then(data => {
        let sunTimes = [];
        if(data.sunTimes){
          sunTimes = [...data.sunTimes];
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