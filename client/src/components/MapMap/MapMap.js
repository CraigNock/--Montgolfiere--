import React, { useRef, useEffect, useState } from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { Map, Marker, Popup, TileLayer, AttributionControl } from "react-leaflet";
// import L, { Icon } from "leaflet";

import balloon from '../../assets/balloon.svg';
import balloonIconArray from '../MultiModal/balloonArray';

import useInterval from '../../hooks/use-interval-hook';
import { updateLocation 
} from '../../reducersActions/userActions';
import { updateCurrentConditions, updateSunTimes, updateNearestCity, 
} from '../../reducersActions/conditionsActions';

import fetchConditions from './fetchConditions';
import findClosestCity from './findClosestCity';
import findNextLoc from './findNextLoc';
import nearbyBalloonSync from './nearbyBalloonSync';

import OtherBalloons from './OtherBalloons';
import LensEffect from './LensEffect';

// const ballooon = new Icon({
//   iconUrl: balloon,
//   iconSize: [15, 15]});


const MapMap = () => { 
  // console.log('LOAD MAP');

  const { profile } = useSelector((state) => state.user);
  //add if active===false stop everything(toggle active else where)
  // console.log('profile', profile);
  const { windSum, windBearing } = useSelector((state) => state.conditions.current);
  const dispatch = useDispatch();

  const [launch, setLaunch] = useState(false);
  const [anchored, setAnchored] = useState(true);

  const [nearbyBalloons, setNearbyBalloons] = useState([]);

  const [newLoc, setNewLoc] = useState(profile.location);
  // const [currentCenter, setCurrentCenter] = useState(profile.location);
  const [ggg, setggg] = useState(false);

//ON MOUNT FETCH CONDITIONS & CLOSEST CITY
  const handleConditions = async () => {
    try {
      let conditions = await fetchConditions(profile.location);
      // console.log('conditions', conditions);
      if(conditions[0]) {dispatch( updateCurrentConditions(conditions[0]) )};
      if(conditions[1]) {dispatch( updateSunTimes(conditions[1]) )};
      
      let nearCity = await findClosestCity(profile.location);
      // console.log('nearCity', nearCity);
      if(nearCity) dispatch( updateNearestCity(nearCity) )
    } catch (err) {
      console.log('handlecond error', err)
    };
  };
  useEffect(() => {
    handleConditions();
//on dismount clear the intervals below
    return ()=> {
      console.log('clean intervals'); 
      clearInterval(freshBreeze);
      clearInterval(checkpoint); 
      clearInterval(updateDestination);
      clearInterval(beef);
    };
// eslint-disable-next-line
  }, []);
//FRESH WEATHER EVERY 10MINS 
  const freshBreeze = useInterval(() => {
    handleConditions();
  }, 600000);
  
//TRIGGERS PAN METHOD ON DESTINATION CHANGE, ZOOM
  const mapRef = useRef();
  // const markRef = useRef();
  const panToOptions = {
        animate: true,
        duration: 60, //seconds
        easeLinearity: 1,
      };
  useEffect(() => {
  //   console.log('useeffect mapRef', mapRef);
    const { current } = mapRef;
    const { leafletElement } = current;
    if (newLoc[0])
    setTimeout(()=>{
      console.log('panTo');
      leafletElement.panTo(newLoc, panToOptions)
    }, 100);
// eslint-disable-next-line
  }, [mapRef, newLoc, ggg]);


//KEEPS BALLOON MOVING - Trigged on Launch
//use findNextLoc on stored speed and bearing with current center then set as newloc
  const newLeg = async (toggle) => {
    // console.log('newLeg windSum, windBearing', windSum, windBearing, profile.elevation, launch, anchored);
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
    console.log('newDest', newDest);
    setNewLoc(newDest);
    } else {
      setNewLoc(mapRef.current.viewport.center);
      return
    }
  }

  const updateDestination = useInterval(()=>{
    // console.log('minint');
    if(launch) newLeg();
  },59000);

  useEffect(() => {
    if(mapRef.current.viewport.center && anchored===false)newLeg();
  }, [profile.elevation]);

//STORES BALLOON LOCATION EVERY 10 SECONDS lastVector
  const updateVector = () => {
    // console.log('vector update');
    const modBearing = (windBearing + profile.direction)>360? 
    (windBearing + profile.direction -360) 
    : (windBearing + profile.direction);
      fetch('/newLastVector', {
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
    // console.log('int 10s ', mapRef.current);
    if(mapRef.current.viewport.center) {
    dispatch(updateLocation([...mapRef.current.viewport.center ]));
    updateVector();
    }
  }, 10000);


//SYNC GLOBAL BALLOON LOCATIONS
  const beef = useInterval(async ()=>{
    // console.log('syncsync');
    const modBearing = (windBearing + profile.direction)>360? 
    (windBearing + profile.direction -360) 
    : (windBearing + profile.direction);
    let newBalloons = await nearbyBalloonSync({
    elevation: profile.elevation,
    location: profile.location,
    bearing: modBearing,
    displayName: profile.displayName,
    userId: profile.userId,
    timeStamp: Date.now(),
    });
    setNearbyBalloons(newBalloons) ;
    // console.log('nearbyBalloons', nearbyBalloons);
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
        onZoomEnd={()=> setggg(!ggg)}
        attributionControl={false}
        // onClick={()=>newnew()}
        // onMove={centerMark}
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
            console.log('anchored, launch', anchored, launch);
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
          style={{display: (profile.elevation==1 && !anchored)? 'flex' : 'none'}}
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
  /* padding: .5rem; */
  /* background: gray; */
  height: 65vh;
  width: 60vw;
  border: 15px ridge #b78727;
  box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.53);
  overflow:hidden;
  border-radius: 25%;
  
`;

//make this it's own component, custom color/balloon
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
  width: 4rem;
  top: 50%;
  left: 50%;
  margin: 30px 0 0 -2rem;
  z-index: 2000;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
`;

// const Pinpoint = styled.div`
//   height:1px;
//   width: 1px;
//   position: absolute;
//   top: 50% ;
//   left: 50%;
//   z-index: 2002;
//   background: pink;
// `;