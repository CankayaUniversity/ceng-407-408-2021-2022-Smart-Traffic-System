import {React , useState} from 'react'
import AegeanPage from '../components/Regions/Test/Aegean'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Aegean = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <AegeanPage />
    </>
  )
}

export default Aegean