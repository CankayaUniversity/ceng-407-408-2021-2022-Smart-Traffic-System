import React, { useRef, useState } from "react";

import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
import { TestButton } from '../../ButtonElements'
const Test = () => {

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  async function getPython() {

    if(user){
      const res = await fetch('/api/python');
    }
    else{
      navigate('/signup')
    }
    
  }


  const [hover, setHover] = useState(false)

  const onHover = () => {
    setHover = !hover
  }




  return (
    <>
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
            <TestButton onClick={getPython} onMouseEnter={onHover} onMouseLeave={onHover} >
              Start the System {hover ? <ArrowForward /> : <ArrowRight />}
            </TestButton>
          </HeroBtnWrapper>
        </HeroContent>
      </HeroContainer>




    </>

  )

}

export default Test