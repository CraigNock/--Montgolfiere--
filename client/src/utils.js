//DISTANCE BETWEEN TWO GEOGRAPHICAL POINTS//
export const distanceTo = (pointA, pointB) => {
  const φ1 = pointA[0] * Math.PI/180;
  const φ2 = pointB[0] * Math.PI/180;
  const Δλ = (pointB[1]-pointA[1]) * Math.PI/180;
  const R = 6371e3;
  const distance = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
  return distance;
};

// const randy = (min, max) => { 
//   let rand = Math.floor((Math.random()*(max - min)) + min);
//   return rand;
// };