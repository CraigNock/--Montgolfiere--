import React from 'react'; 
import styled from 'styled-components'; 
import { useSelector } from 'react-redux';

import { distanceTo } from '../../utils';

import paper from '../../assets/paper.jpg';

// visible at top of panel at all times?
// Velocity, Bearing, Elevation, NearestCity(dist)

const FixedInfo = () => { 
  //info for velocity and bearing
  const { elevation, direction } = useSelector( state => state.user.profile);
  const { windSum, windBearing } = useSelector( state => state.conditions.current);
  //info for nearest city and it's distance
  const { nearestCity } = useSelector(state => state.conditions);
  const { location } = useSelector((state) => state.user.profile);


  return (
    <StyledDiv> 
      <Section>
        <Descriptor>Velocity: </Descriptor>
        <Values>
          {parseInt(windSum * elevation)}
        </Values>
      </Section>
      <Section>
        <Descriptor>Bearing: </Descriptor>
        <Values>
          {(windBearing + direction)>360? 
          (windBearing + direction -360) 
          : (windBearing + direction)}°
        </Values>
      </Section>
      <Section> 
        <Descriptor>Nearest City: </Descriptor>
        <Values>
          {nearestCity.tags.name}
          {' [ '} 
          {(distanceTo([nearestCity.lat, nearestCity.lon], location)/1000).toFixed()} 
          {' km]'}
        </Values>
      </Section>
    </StyledDiv> 
  ) 
}; 


export default FixedInfo;


const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: .5rem;
  background-image: url(${paper});
  border-top: 3px solid gray;
  border-bottom: 3px solid gray;
`;
const Section = styled.div`
  display: inline-block;
  span {
    font-family: 'Rye', cursive;
  }
`;
const Descriptor = styled.span`
  color: black;
`;
const Values = styled.span`
  color: #36454f;
`;