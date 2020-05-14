import React, {useEffect, useState} from 'react'; 
import styled from 'styled-components'; 
import { useDispatch, useSelector } from 'react-redux';

import { toggleModal, setModalValue } 
from '../../reducersActions/appActions';

import ProfileDetails from './ProfileDetails';
import About from './About';

import parchment2 from '../../assets/parchment2.png';


const MultiModal = () => { 
  const dispatch = useDispatch();
  // const [disable, setDisable] = useState(false);
  const { profile } = useSelector(state => state.user);
  const { appStatus, modalToggle, modalValue } = useSelector(state => state.app);

  return (  
    <ModalFrame style={{visibility:modalToggle? 'visible' : 'hidden'}} >
      <ModalBack 
        onClick={()=>{
          console.log('togmod');
          dispatch(toggleModal());
        }}></ModalBack>

      <ModalFront onClick={(e)=>e.stopPropagation()}> 
        {(modalValue === 'profile')?
          <ProfileDetails/>
        : <About/> }
      </ModalFront> 
    </ModalFrame>
  ) 
}; 


export default MultiModal;


const ModalFrame = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
`;

const ModalBack = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  /* position: relative; */
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
  top: 3rem;
  background-image: url(${parchment2});
  background-size: cover;
  /* border-radius: 10%; */
  border: 10px ridge peru;
  


`;