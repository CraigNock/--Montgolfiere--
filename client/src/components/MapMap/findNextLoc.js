
// time = 60; 

const findNextLoc = async (latold, longold, windBearing, kphspeed) => {
  
  const R = 6378.1;  //Radius of the Earth in km
//Bearing converted to radians
  const brng = (windBearing ) * (Math.PI / 180);  
  //d in km = speed(kph) * time(h)===1/60
  const d = kphspeed / 60;  //Distance in km in 1 minute

  let lat1 = latold * (Math.PI / 180); //Current lat point converted to radians
  let lon1 = longold * (Math.PI / 180); //Current long point converted to radians

  let lat2 = Math.asin( Math.sin(lat1)*Math.cos(d/R) + Math.cos(lat1)*Math.sin(d/R)*Math.cos(brng));

  let lon2 = lon1 + Math.atan2(Math.sin(brng)*Math.sin(d/R)*Math.cos(lat1), Math.cos(d/R)-Math.sin(lat1)*Math.sin(lat2));

  lat2 = lat2 * (180/Math.PI);
  lon2 = lon2 * (180/Math.PI);
  //normalise
  lon2 = (lon2+540)%360-180;

  return [lat2, lon2];
};
//The longitude normalised to −180…+180 using (lon+540)%360-180


export default findNextLoc;
