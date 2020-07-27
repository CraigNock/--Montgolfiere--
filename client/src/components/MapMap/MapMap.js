import React, { useRef, useEffect, useState } from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';
import { Map, TileLayer, AttributionControl } from "react-leaflet";

///// MAP DISPLAY /////

import { MEDIA_GATE } from '../../constants';
import balloonIconArray from '../MultiModal/balloonArray';

import useInterval from '../../hooks/use-interval-hook';
import { updateLocation 
} from '../../reducersActions/userActions';
import { updateCurrentConditions, updateSunTimes, updateNearestCity, 
} from '../../reducersActions/conditionsActions';

//Functions
import fetchConditions from './fetchConditions';
import findClosestCity from './findClosestCity';
import findNextLoc from './findNextLoc';
import nearbyBalloonSync from './nearbyBalloonSync';
//Components
import OtherBalloons from './OtherBalloons';
import LensEffect from './LensEffect';

import { IP } from '../../constants';


const MapMap = () => { 

  const { profile } = useSelector((state) => state.user);
  const { windSum, windBearing } = useSelector((state) => state.conditions.current);
  const { nearestCity } = useSelector((state) => state.conditions);
  const dispatch = useDispatch();
  const [launch, setLaunch] = useState(false);
  const [anchored, setAnchored] = useState(true);
  const [nearbyBalloons, setNearbyBalloons] = useState([]);
  const [newLoc, setNewLoc] = useState(profile.location);
  const [refreshCalc, setRefreshCalc] = useState(false);

//ON MOUNT FETCH CONDITIONS & CLOSEST CITY
  const handleConditions = async () => {
    try {
      let conditions = await fetchConditions(profile.location);
      if(conditions[0]) {dispatch( updateCurrentConditions(conditions[0]) )};
      if(conditions[1]) {dispatch( updateSunTimes(conditions[1]) )};
      let nearCity = await findClosestCity(profile.location);
      if(nearCity && nearCity !== nearestCity) dispatch( updateNearestCity(nearCity) )
    } catch (err) {
      console.log('handlecond error', err)
    };
  };
  useEffect(() => {
    handleConditions();
//on dismount clear the intervals below
    return ()=> {
      clearInterval(freshBreeze);
      clearInterval(checkpoint); 
      clearInterval(updateDestination);
      clearInterval(syncGlobalBalloons);
    };
// eslint-disable-next-line
  }, []);
//FRESH WEATHER EVERY 10MINS 
  const freshBreeze = useInterval(() => {
    handleConditions();
  }, 600000);
  
//TRIGGERS PAN METHOD ON DESTINATION CHANGE, ZOOM
  const mapRef = useRef();
  const panToOptions = {
        animate: true,
        duration: 60, //seconds
        easeLinearity: 1,
      };
  useEffect(() => {
    const { current } = mapRef;
    const { leafletElement } = current;
    if (newLoc[0])
    setTimeout(()=>{
      leafletElement.panTo(newLoc, panToOptions)
    }, 100);
// eslint-disable-next-line
  }, [mapRef, newLoc, refreshCalc]);


//KEEPS BALLOON MOVING - Trigged on Launch
//use findNextLoc on stored speed and bearing with current center then set as newloc
  const newLeg = async (toggle) => {
    const modBearing = (windBearing + profile.direction)>360? 
    (windBearing + profile.direction -360) 
    : (windBearing + profile.direction);
    if (!toggle) {
    let newDest = await findNextLoc(
      mapRef.current.viewport.center[0], 
      mapRef.current.viewport.center[1], 
      modBearing,
      (windSum * 10 *  profile.elevation) 
    );
    setNewLoc(newDest);
    } else {
      setNewLoc(mapRef.current.viewport.center);
      return
    }
  }

  const updateDestination = useInterval(()=>{
    if(launch) newLeg();
  },59000);

  useEffect(() => {
    if(mapRef.current.viewport.center && anchored===false)newLeg();
  // eslint-disable-next-line
  }, [profile.elevation]);

//STORES BALLOON LOCATION EVERY 10 SECONDS lastVector
  const updateVector = () => {
    const modBearing = (windBearing + profile.direction)>360? 
    (windBearing + profile.direction -360) 
    : (windBearing + profile.direction);
      fetch(`${IP}/newLastVector`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: profile.userId,
          lastActive: (new Date()).getTime(),
          lastLocation: [...mapRef.current.viewport.center], 
          lastBearing: modBearing,
          lastDirection: profile.direction,
          lastWindSum: windSum,
          lastElevation: profile.elevation,
        }),
      }).catch(err => {console.log('udv err', err);})
  };
  const checkpoint = useInterval(()=>{
    if(mapRef.current.viewport.center) {
    dispatch(updateLocation([...mapRef.current.viewport.center ]));
    updateVector();
    }
  }, 10000);


//SYNC GLOBAL BALLOON LOCATIONS
  const syncGlobalBalloons = useInterval(async ()=>{
    const modBearing = (windBearing + profile.direction)>360? 
    (windBearing + profile.direction -360) 
    : ((windBearing + profile.direction) < 0? 
    (360 + (windBearing + profile.direction)) 
    :(windBearing + profile.direction));
    let newBalloons = await nearbyBalloonSync({
    elevation: profile.elevation,
    location: profile.location,
    bearing: modBearing,
    displayName: profile.displayName,
    userId: profile.userId,
    timeStamp: Date.now(),
    });
    setNearbyBalloons(newBalloons) ;
  }, 15000);


  return ( 
    <StyledDiv> 
      
      <Map 
        ref={mapRef}
        defaultCenter={profile.location} 
        zoom={14}
        zoomSnap={2}
        zoomControl={false}
        dragging={false}
        doubleClickZoom={'center'}
        scrollWheelZoom={'center'}
        touchZoom={'center'}
        onZoomEnd={()=> setRefreshCalc(!refreshCalc)}
        attributionControl={false}
      >
        {/* <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OSM</a> contributors' /> */}
        <TileLayer
          url={`https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_MAPTILES_KEY}`}
          attribution='&copy; <a href="http://osm.org/copyright">OSM</a> contributors | Maptiles by Thunderforest' 
        />
        {/* <AttributionControl
          position='bottomright' 
        /> */}

        <StyledBalloon src={balloonIconArray[profile.balloonIcon]} />
        
        <StyledButton 
          onClick={()=>{
            setAnchored(false);
            setLaunch(true);
            newLeg(false);
          }}
          style={{display: launch? 'none' : 'flex'}}
        >Launch</StyledButton>
        <StyledButton 
          onClick={()=>{
            setLaunch(false);
            setAnchored(true)
            newLeg(true);
          }}
          style={{display: (profile.elevation===1 && !anchored)? 'flex' : 'none'}}
        >Anchor</StyledButton>

        <OtherBalloons balloons={nearbyBalloons} />

      </Map>
      <LensEffect/>
    </StyledDiv>
    
  ) 
}; 


export default MapMap;


const balloonBob = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
  100% {
    transform: translateY(0);
  }
`;

const StyledDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem auto 1rem;
  height: 65vh;
  width: 60vw;
  min-width: 600px;
  min-height: 400px;
  border: 15px ridge #b78727;
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.53);
  overflow:hidden;
  border-radius: 25%;
  @media (max-width: ${`${MEDIA_GATE.mobile}px`}) {
    width: 100vw;
    min-width: 100vw;
    min-height: 100px;
    
    margin: 1rem 0 0 0;
    border: none;
    border-top: 10px ridge #b78727;
    border-bottom: 10px ridge #b78727;
    border-left: 2px ridge #b78727;
    border-right: 2px ridge #b78727;
    border-radius: 5%;
    /* border: 10px ridge #b78727; */
  }
  @media (max-height: ${`${MEDIA_GATE.mobileHeight}px`}) {
    height: 50vh;
  }
`;

const StyledBalloon = styled.img`
  position: absolute;
  top: 50% ;
  left: 50%;
  height: 30px;
  width: 30px;
  margin: -15px 0 0 -15px;
  z-index: 2000;
  animation: ${balloonBob} 4s ease-in-out infinite ;
`;
const StyledButton = styled.button`
  position: absolute;
  justify-content: center;
  width: 5rem;
  top: 50%;
  left: 50%;
  margin: 30px 0 0 -2.5rem;
  box-sizing: border-box;
  z-index: 2000;
  border: 2px outset goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
  @media (max-width: ${`${MEDIA_GATE.mobile}px`}) {
    padding: .5rem;
  }
`;
