import React from 'react'; 
import styled, {keyframes} from 'styled-components'; 
import { useSelector } from 'react-redux';



const Cloud = ( props ) => { 
  const { current } = useSelector( state => state.conditions);
  // console.log('props', props.speed);
  let tinto = 'whitesmoke';
  let lining = 'lightgray';
  if(current.icon && 
    (current.icon === 'rain' 
    || current.icon === 'clear-night'
    || current.icon === 'partly-cloudy-night'
    || current.icon === 'snow'
    || current.icon === 'sleet'
    || current.icon === 'thunderstorm'
    )) {
      tinto = 'lightgray';
      lining = 'whitesmoke';
    }
  return (
    <StyledDiv style={{transform: `scale(${props.scale})`}} speed={`${props.speed}`} > 
      <Puff1 
      style={{background: `${tinto}`, borderColor: `${lining}`}}/>
      <Puff2 
      style={{background: `${tinto}`, borderColor: `${lining}`}}/>
      <Puff3 
      style={{background: `${tinto}`, borderColor: `${lining}`}}/>
      <Puff4 
      style={{background: `${tinto}`, borderColor: `${lining}`}}/>
      <Puff5 
      style={{background: `${tinto}`, borderColor: `${lining}`}}/>
      <Puff6 
      style={{background: `${tinto}`, borderColor: `${lining}`}}/>
      <Puff7 
      style={{background: `${tinto}`, borderColor: `${lining}`}}/>
    </StyledDiv> 
  ) 
}; 


export default Cloud;


const cloudStrafe = keyframes`
  from {
    margin-left: -400px;
  }
  to {
    margin-left: 100%;

  }
`;


const StyledDiv = styled.div`
  display: inline-block;
  position: relative;
  background: transparent;
  margin: 10px auto;
  width: 9rem;
  height: 5.5rem;
  animation: ${cloudStrafe} ${(props) => props.speed}s linear infinite ;
`;
const Puff1 = styled.div`
  /* background: whitesmoke; */
  position: absolute;
  bottom: 1.5rem;
  left: 1rem;
  width: 7rem;
  height: 1.5rem;
  border-radius: 1rem;
  border-top: 1px solid lightgray;
  /* box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1); */
`;
const Puff2 = styled(Puff1)`
  bottom: 1rem;
  left: 1.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  border-top: 1px solid lightgray;
  /* box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1); */
`;
const Puff3 = styled(Puff1)`
  bottom: 1rem;
  left: 4rem;
  width: 3rem;
  height: 4rem;
  border-radius: 3rem;
  border-top: 1px solid lightgray;
  /* box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1); */
`;
const Puff4 = styled(Puff1)`
  bottom: .5rem;
  left: 3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  /* box-shadow: 0 8px 5px rgba(0, 0, 0, 0.1); */
`;
const Puff5 = styled(Puff1)`
  bottom: .5rem;
  left: 5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  border-top: 1px solid lightgray;
  box-shadow: none;
`;
const Puff6 = styled(Puff1)`
  bottom: 1.25rem;
  left: 2.5rem;
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  border-top: 1px solid lightgray;
  box-shadow: none;
`;
const Puff7 = styled(Puff1)`
  bottom: 1rem;
  left: 2.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 3rem;
  border-top: 1px solid lightgray;
  box-shadow: none;
`;