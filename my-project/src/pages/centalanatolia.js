import {React , useState} from 'react'
import CentralAnatoliaPage from '../components/Regions/Test/CentralAnatolia'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const CentralAnatolia = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <CentralAnatoliaPage />
    </>
  )
}

export default CentralAnatolia