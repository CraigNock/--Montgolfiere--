
//gets distance beween balloon and marker, catagorises accordingly
const markerFilter = (center, radiusMin, radiusMax, point) => {
  const φ1 = center[0] * Math.PI/180;
  const φ2 = point[0] * Math.PI/180;
  const Δλ = (point[1]-center[1]) * Math.PI/180;
  const R = 6371e3;
  const d = Math.acos( Math.sin(φ1)*Math.sin(φ2) + Math.cos(φ1)*Math.cos(φ2) * Math.cos(Δλ) ) * R;
  // console.log('d', d);
  if ( d > radiusMin && d < radiusMax ) {
    return 'outer'
  } else if ( d < radiusMin ) {
    return 'inner'
  } else {
    return 'far'
  };
};


export default markerFilter