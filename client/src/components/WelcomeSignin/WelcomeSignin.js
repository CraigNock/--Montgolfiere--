import React, {useState} from 'react'; 
import styled, {keyframes} from 'styled-components'; 

import { AuthContext } from '../AuthContext/AuthContext';

import parchment2 from '../../assets/parchment2.png';


const WelcomeSignin = () => { 
  const { signInWithGoogle } = React.useContext(AuthContext);

  const [toggle, setToggle] = useState(true);

  return (
    <Backing>
    <StyledDiv style={{transform: toggle? 'translateY(0vh)' : 'translateY(80vh)'}}> 
      <Intro> 
        <Title>Welcome Aeronaut!</Title>
        <p><span>Where <em>is</em> my Balloon?</span> uses the very latest in dirgible tracking technology.</p> 
        <p>Launch your balloon to travel the world, and float over new and exotic places!</p> <p>The wind will take you there.</p>
        
      </Intro>
      <SignIn>
        <p>Please sign in to start your voyage.</p>
        <StyledButton onClick={signInWithGoogle}>
            Sign In
        </StyledButton>
      </SignIn>
      <Tab onClick={() => setToggle(!toggle)}>*</Tab>
    </StyledDiv> 
    </Backing>
  ) 
}; 


export default WelcomeSignin;



const panelSlide = keyframes`
  from {
    transform: translateY(80vh)
  }
  to {
    transform: translateY(0vh)
  }
`;

const Backing = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledDiv = styled.div`
  animation: ${panelSlide} 2s ease-in-out;
  transition: transform 2000ms ease-in-out;
  position: absolute;
  top: 0vh;
  left: calc(50% - 25vw);
  margin: 20vh auto;
  width: 50vw;
  /* height: 50%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-image: url(${parchment2});
  opacity: 0.9;
  box-sizing: border-box;
  background-size: cover;
  /* background: whitesmoke; */
  border: 10px ridge peru;
  border-radius: 10px;
  color: black;
`;
const Intro = styled.div`
  text-align: center;
  p {
    font-family: 'Rye', cursive;
    margin-top: .5rem;
  }
  span{
    font-family: 'Rye', cursive;
    em{font-family: 'Rye', cursive;}
    color: gray;
  }
`;
const Title = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  text-decoration: underline;
  color: darkgoldenrod;
`;
const SignIn = styled.div`
  p {
    font-family: 'Rye', cursive;
    font-size: .9rem;
  };
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;
const StyledButton = styled.button`
  font-family: 'Rye', cursive;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  margin: 1rem;
  border: 2px solid goldenrod;
  border-radius: 10px;
  color: white;
  background: gray;
  font-family: 'Rye', cursive;
`;
const Tab = styled.div`
  position: absolute;
  top: -1.7rem;
  left: calc(50% - 2rem);
  width: 4rem;
  height: 1.2rem;
  opacity: .3;
  background: tan;
  box-sizing: border-box;
  border: 3px solid #674c47;
  border-radius: 50% 50% 0 0;
  text-align: center;
  color: gray;
  font-family: 'Rye', cursive;
  font-weight: bold;
  z-index: -10;
  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`;
