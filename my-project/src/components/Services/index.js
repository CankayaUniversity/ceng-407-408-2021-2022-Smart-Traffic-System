import React from 'react'
import Icon1 from '../../images/about7.png'
import Icon2 from '../../images/about5.png'
import Icon3 from '../../images/about8.png'
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from './ServicesElements'

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>Our Services</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Calculates waiting time</ServicesH2>
          <ServicesP>
            The system calculates the waiting time for vehicles in red light.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Detecting the vehicle type</ServicesH2>
          <ServicesP>
            The system detects whether the vehicle is a car,truck,motorcycle
            etc.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Calculates vehicle number</ServicesH2>
          <ServicesP>
            The system calculates how many vehicles are waiting in the red light.
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  )
}

export default Services
