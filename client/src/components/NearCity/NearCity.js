import React from 'react'; 
import styled from 'styled-components'; 
import { useSelector } from 'react-redux';

import { distanceTo } from '../../utils';

///// DISPLAYS NEAREST CITY'S NAME AND DISTANCE /////

const NearCity = () => { 
  const { nearestCity } = useSelector(state => state.conditions);
  const { location } = useSelector((state) => state.user.profile);

  return (
    <StyledDiv> 
      <p> 
        <span>Nearest City</span>
      </p>
      <p> 
        {nearestCity.tags? 
        `${nearestCity.tags.name} (${(distanceTo([nearestCity.lat, nearestCity.lon], location)/1000).toFixed()} km)` 
        : nearestCity}
      </p>
    </StyledDiv> 
  ) 
}; 


export default NearCity;


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding: 0 .5rem;
  p {
    font-family: 'Rye', cursive;
    color: #36454f;
    margin: .25rem 0;
  }
  span{
    font-family: 'Rye', cursive;
    color: black;
  }
`;