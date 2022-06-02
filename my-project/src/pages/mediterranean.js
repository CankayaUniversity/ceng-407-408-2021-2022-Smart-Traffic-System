import {React , useState} from 'react'
import MediterraneanPage from '../components/Regions/Test/Mediterranean'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Mediterranean = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <MediterraneanPage />
    </>
  )
}

export default Mediterranean