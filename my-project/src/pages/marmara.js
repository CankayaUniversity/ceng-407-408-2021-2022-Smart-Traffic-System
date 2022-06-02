import {React , useState} from 'react'
import MarmaraPage from '../components/Regions/Test/Marmara'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Marmara = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <MarmaraPage />
    </>
  )
}

export default Marmara