import React, { useRef, useState } from "react";
import axios from 'axios'
import Navbar from '../../Navbar/index'

import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroP,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from '../../HeroSection/HeroElements'
import Video from '../../../videos/video2.mp4'
import { Button } from '../../ButtonElements'
const Test = () => {

  async function getAllData() {

    const res = await fetch(`api/python`);
  
  }


  const [hover, setHover] = useState(false)

    const onHover = () => {
      setHover = !hover
    }

  


  return (
    <>
    <Navbar />
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <HeroContent>
        <HeroH1>Welcome to the Smart Traffic Systems Testing Python Code Page</HeroH1>
        <HeroP>
          Click this button to see the car recognition system with Python! 
        </HeroP>
        <HeroBtnWrapper>
          <Button to='/signup' onClick={getAllData} onMouseEnter={onHover} onMouseLeave={onHover}>
            Start the System {hover ? <ArrowForward /> : <ArrowRight />}
          </Button>
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  


    
    </>
    
  )

}

export default Test
