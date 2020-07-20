import { IP } from '../../constants';

const getClosestCity = async (position, changeNearestCity) => {
  
  let currentPosition = [...position];
  return(
    fetch(`${IP}/api/nearest`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept" : "application/json"
    },
    body:JSON.stringify({currentPosition})
    })
    .then(data => data.json())
    .then(data => {
      let nearestCity = data.cityObj;
      return nearestCity;
      })
  )
};



export default getClosestCity;