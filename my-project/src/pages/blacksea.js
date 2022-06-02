import {React , useState} from 'react'
import BlackSeaPage from '../components/Regions/Test/BlackSea'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const BlackSea = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <BlackSeaPage />
    </>
  )
}

export default BlackSea