import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

///// REUSABLE MODAL USED TO DISPLAY VARIOUS INFORMATION /////

import { MEDIA_GATE } from '../../constants';
import { toggleModal } 
from '../../reducersActions/appActions';

import ProfileDetails from './ProfileDetails';
import CustomiseBalloon from './CustomiseBalloon';
import Instructions from './Instructions';
import About from './About';
import Loader from '../Loader';

import parchment2 from '../../assets/parchment2.png';


const MultiModal = () => { 
  const dispatch = useDispatch();
  const { modalToggle, modalValue } = useSelector(state => state.app);

  const contentSelector = () => {
    switch (modalValue) {
      case "profile":
        return <ProfileDetails/>;
      case "customise":
        return <CustomiseBalloon/>;
      case "instructions":
        return <Instructions/>;
      case "about":
        return <About/>;
      default:
        return <Loader/>;
    }
  }


  return (  
    <ModalFrame style={{visibility:modalToggle? 'visible' : 'hidden'}} >
      <ModalBack 
        style={{background:(modalValue === 'instructions')? 
        'rgba(0,0,0, .1)':'rgba(0,0,0, .5)'}}
        onClick={()=>{
          dispatch(toggleModal());
        }}></ModalBack>

      <ModalFront onClick={(e)=>e.stopPropagation()}> 
        {/* {
          profile: <ProfileDetails/>,
          customise: <CustomiseBalloon/>,
          instructions: <Instructions/>,
          about: <About/>,
        }[modalValue] || <Loader/>*/}
        { contentSelector() }
      </ModalFront> 
    </ModalFrame>
  ) 
}; 


export default MultiModal;


const ModalFrame = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  /* min-width: 1000px; */
  /* min-height: 700px; */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000; /*extreme due to conflicting z-index usage built into Leaflet Maps for tile and marker layering  */
  
`;

const ModalBack = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0, .5);
  z-index: 100001;
  &:hover {
    cursor: pointer;
  }
`;

const ModalFront = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100002;
  height: 70vh;
  width: 65vw;
  min-height: 400px;
  min-width: 600px;
  top: 3rem;
  background-image: url(${parchment2});
  background-size: cover;
  border: 10px ridge peru;
  @media (max-width: ${`${MEDIA_GATE.mobile}px`}) {
    min-height: 10px;
    min-width: 10px;
    width: 90vw;
  }
`;