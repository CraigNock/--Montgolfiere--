import React from 'react'; 
import styled from 'styled-components'; 

///// INSTRUCTIONS ON HOW TO USE APP /////

import { MEDIA_GATE } from '../../constants';
import CloseModal from './CloseModal';

import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { GoArrowUp } from "react-icons/go";
import { GoArrowDown } from "react-icons/go";

import launch from '../../assets/launch.png';
import anchor from '../../assets/anchor.png';
import fellow from '../../assets/fellow.png';


const Instructions = () => { 

  return (
    <StyledDiv> 
        <CloseModal/>
        <LeftDiv>
          <div>
            <p><GoArrowLeft/><BoldSpan>Bearing</BoldSpan>
              : Direction balloon will travel.
            </p>
            <p><GoArrowLeft/><BoldSpan>Velocity</BoldSpan>
              : Speed of travel.
            </p>
          </div>
          <p><GoArrowLeft/><BoldSpan>Elevation</BoldSpan>
            : Balloon travels faster at higher elevations.
          </p>
          <p><GoArrowLeft/><BoldSpan>View Range</BoldSpan>
            : See and interact with other balloons; 5km, 100km, Worldwide. 
          </p>
          <p><GoArrowLeft/><BoldSpan>Lens Effect</BoldSpan>
            : Toggles lens-effect over map.
          </p>
          <p><GoArrowLeft/><BoldSpan>Direction</BoldSpan>
            : Adjust your sail to alter your Bearing.
          </p>

          <Note>(Note: For demonstration purposes, interaction radius currently not limited by view or elevation )</Note>
        </LeftDiv>
        <SubDiv>
          <h2><BoldSpan>Instructions</BoldSpan> </h2>
          <ImageDiv>
            <Imagio src={launch} alt='launch button' />
            <p>Balloon will be stationary until <BoldSpan>Launched</BoldSpan></p>
          </ImageDiv>
          <ImageDiv>
            <Imagio src={anchor} alt='anchor button' />
            <p>When <BoldSpan>[Elevation: Low]</BoldSpan> balloon can be <BoldSpan>Anchored</BoldSpan>, stopping flight.</p>
          </ImageDiv>
          <ChatImage>
            <Imagio src={fellow} alt='chat others' />
            <p>When other balloons visible, <BoldSpan>Chat</BoldSpan> can be initiated.</p>
          </ChatImage>
        </SubDiv>
        <RightDiv>
          <p><BoldSpan>Menu</BoldSpan><GoArrowUp/>
            : Check out your Profile, Customise your Balloon, or read the Instructions 
          </p>
          <p><BoldSpan>Panel Toggles<GoArrowRight/></BoldSpan>
            : Hide or Show individual display panels using their clickable tabs.
          </p>
          <p><BoldSpan>Conditions Display<GoArrowRight/></BoldSpan>
            : Shows time and weather at balloon location.
          </p>
          <p><BoldSpan>Nearby Display<GoArrowDown/></BoldSpan>
            : Shows the name, distance and images of the nearest city to balloon. 
          </p>
        </RightDiv>
    </StyledDiv> 
  ) 
}; 


export default Instructions;


const StyledDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: .5rem;
  width: 100%;
  height: 100%;
  color: black;
  background: rgba(0,0,0, .1);
  font-family: 'Fredericka the Great', cursive;
  h2{
    text-decoration: underline;
    @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
      span{font-size: 1rem;}
    };
  };
  overflow: hidden;
`;
const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  color: black;
  font-family: 'Fredericka the Great', cursive;
  p {
    font-size: .9rem;
  }
  @media (max-width: ${`${MEDIA_GATE.mobile}px`}) {
    p{font-size: .75rem;}
  }
`;
  
const RightDiv = styled(SubDiv)`
  justify-content: space-between;
  align-items: flex-end;
  text-align: right;
  width: 35%;
  margin-top: 1.5rem;
`;
const LeftDiv = styled(RightDiv)`
  align-items: flex-start;
  text-align: left;
`;

const ImageDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: .5rem;
  p{
    text-align: center;
    font-size: .8rem;
  }
  @media (max-width: ${`${MEDIA_GATE.mobile}px`}) {
    p{font-size: .75rem;}
  }
`;
const ChatImage = styled(ImageDiv)`
  @media (max-width: ${`${MEDIA_GATE.mobile}px`}) {
    display: none;
  }
`;
const Imagio = styled.img`
  width: 100px;
  border-radius: 50%;
  @media (max-width: ${`${MEDIA_GATE.mobile}px`}) {
    width: 75px; 
  }
`;
const BoldSpan = styled.span`
  font-weight: bold;
  font-family: 'Fredericka the Great', cursive;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    font-size: .75rem;
  }
`;
const Note = styled.p`
  font-size: .75rem;
  @media(max-width: ${`${MEDIA_GATE.mobile}px`}) {
    display: none;
  }
`;