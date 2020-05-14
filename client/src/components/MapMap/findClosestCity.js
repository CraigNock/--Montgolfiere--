
const getClosestCity = async (position, changeNearestCity) => {
  
  let currentPosition = [...position];
  // console.log('position at fetch ', currentPosition);
  return(
    fetch('/api/nearest', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
    },
    body:JSON.stringify({currentPosition})
    })
    .then(data => data.json())
    .then(data => {
      // console.log('nearcity data ', data);
      let nearestCity = data.cityObj;
      return nearestCity;
      })
  )
};



export default getClosestCity;