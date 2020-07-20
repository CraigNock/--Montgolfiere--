import React from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { toggleModal } 
from '../../reducersActions/appActions';

import ProfileDetails from './ProfileDetails';
import About from './About';
import Instructions from './Instructions';

import parchment2 from '../../assets/parchment2.png';


const MultiModal = () => { 
  const dispatch = useDispatch();
  const { modalToggle, modalValue } = useSelector(state => state.app);

  return (  
    <ModalFrame style={{visibility:modalToggle? 'visible' : 'hidden'}} >
      <ModalBack 
        style={{background:(modalValue === 'instructions')? 
        'rgba(0,0,0, .1)':'rgba(0,0,0, .5)'}}
        onClick={()=>{
          dispatch(toggleModal());
        }}></ModalBack>

      <ModalFront onClick={(e)=>e.stopPropagation()}> 
        {(modalValue === 'profile')?
          <ProfileDetails/>
        : (modalValue === 'instructions')?
          <Instructions/>
          :<About/> }
      </ModalFront> 
    </ModalFrame>
  ) 
}; 


export default MultiModal;


const ModalFrame = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  min-width: 1000px;
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
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
  min-height: 400px;
  width: 65vw;
  min-width: 600px;
  top: 3rem;
  background-image: url(${parchment2});
  background-size: cover;
  border: 10px ridge peru;
  
  

`;