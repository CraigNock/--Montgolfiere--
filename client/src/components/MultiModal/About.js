import React from 'react'; 
import styled from 'styled-components'; 

const About = () => { 

  return (
    <StyledDiv> 
      <AboutDiv>
        <Headings>About</Headings>
        <p>
          Developed by Craig Nockels as a final project for Concordia Bootcamps.
        </p>
        <p>
          Inspired by the curiosity of what happens to escaped party balloons that disappear into the sky and out of sight.
        </p>
        <p>
          "Where is My Balloon?" Takes real time wind data at your balloon's location to allow players to naturally explore the globe and meet other aeronauts.
        </p>
        <p>
          Notable Features include: 
          <StyledUl>
            <li>Persistant balloon location, icon and control settings.</li>
            <li>Dynamic background that changes with your balloon's local time and weather.</li>
            <li>Range restricted balloon-to-balloon vision and chat. (Currently Global for alpha)</li>
            <li>If unanchored; balloon will continue to travel for up to an hour.</li>
          </StyledUl>
          
        </p>
      </AboutDiv>
      <SubDiv>
        <Headings>Resources</Headings>
        <p>Mapping uses Leaflet and OpenStreetMaps</p>
        <p>Wind and weather: <a href='darksky.net/dev'>Darksky Weather API</a></p>
        <p>Closest City: <a href='http://overpass-api.de/'>Overpass API</a></p>
        <p>
          Nearby City Images: <a href='https://azure.microsoft.com/en-us/services/cognitive-services/bing-image-search-api/'>Bing Image Search</a> 
        </p>
        <Headings>Balloon Icons by:</Headings> 
        <ul>
          <li>Pixel Perfect from www.flaticon.com</li>
          <li>FreePik from www.flaticon.com</li>
          <li>Vectors Market from www.flaticon.com</li>
          <li>DinosoftLabs from www.flaticon.com</li>
          <li>Smashicons from www.flaticon.com</li>
        </ul>
        <Headings>Map Tiles by:</Headings>
        <p><a href='thunderforest.com'>Thunderforest</a></p>
      </SubDiv>
    </StyledDiv> 
  ) 
}; 


export default About;


const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  padding: 1rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  /* width: 50%; */
  padding: 1rem;
  color: black;
  background: rgba(0,0,0, .1);
  font-family: 'Fredericka the Great', cursive;
  /* overflow: hidden; */
  a {
    color: black;
  }
  p {
    /* text-align: center; */
  }
`;
const Headings = styled.p`
  font-weight:bold;
  padding-top: .5rem;
  padding-bottom: .25rem;
  font-family: 'Rye', cursive;
  font-size: .85rem;
`;
const StyledUl = styled.ul`
  list-style-type: square;
  li {
    font-size: .75rem;
    text-align: left;
  }
`;
const AboutDiv = styled(SubDiv)`
  p {
    margin: .25rem 0;
  }
`;