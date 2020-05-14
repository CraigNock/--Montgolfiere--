


// time = 60; //always 60

const findNextLoc = async (latold, longold, windBearing, kphspeed) => {
  // console.log('latold, longold, windBearing, kphspeed', latold, longold, windBearing, kphspeed);
  
  const R = 6378.1;  //Radius of the Earth in km
//Bearing converted to radians
  const brng = (windBearing ) * (Math.PI / 180);  
  //d in km = speed(kph) * time(h)===1/60
  const d = kphspeed / 60;  //Distance in km in 1 minute
  
  // const brng = 1.57;
  // const d = 15;
  //lat2  52.20444 - expected lat result 
  //lon2  0.36056 - expected long result 
  // let lat1 = -52.20472 * (Math.PI / 180); 
  // let lon1 = 0.14056 * (Math.PI / 180); 

  let lat1 = latold * (Math.PI / 180); //Current lat point converted to radians
  let lon1 = longold * (Math.PI / 180); //Current long point converted to radians

  let lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng));

  let lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));

  lat2 = lat2 * (180/Math.PI);
  lon2 = lon2 * (180/Math.PI);
  //normalise
  lon2 = (lon2+540)%360-180;

  // console.log( 'newlat ', lat2, 'newlong ', lon2);

  return [lat2, lon2];
};
//The longitude can be normalised to −180…+180 using (lon+540)%360-180


export default findNextLoc;
