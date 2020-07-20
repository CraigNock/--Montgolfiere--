

const pointInCircle = (center, radiusMin, radiusMax, point) => {
  const centerY = center[0]; //lat
  const centerX = center[1]; //long
  const y = point[0];
  const x = point[1] ; 
  const squareDist = (centerX - x) ** 2 + (centerY - y) ** 2
  if ( squareDist > (radiusMin ** 2) && squareDist < (radiusMax ** 2) ) {
    return 'outer'
  } else if ( squareDist < (radiusMin ** 2) ) {
    return 'inner'
  } else {
    return 'far'
  };
};


export default pointInCircle;

