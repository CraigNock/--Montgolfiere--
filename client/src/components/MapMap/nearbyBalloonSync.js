import { IP } from '../../constants';


const nearbyBalloonSync = async (locObj) => {
  return (fetch(`${IP}/syncAllBalloons`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(locObj),
  })
    .then(data => data.json())
    .then(info => {
      return info.data;
    })
    .catch(err => {console.log('bsync err', err);})
  )
};

export default nearbyBalloonSync;