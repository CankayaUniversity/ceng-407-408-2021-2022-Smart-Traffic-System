import {React , useState} from 'react'
import SouthEastPage from '../components/Regions/Test/SouthEast'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const SouthEast = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <SouthEastPage />
    </>
  )
}

export default SouthEast
