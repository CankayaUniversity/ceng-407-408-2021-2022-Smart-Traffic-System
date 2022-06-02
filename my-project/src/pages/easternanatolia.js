import {React , useState} from 'react'
import EasternAnatoliaPage from '../components/Regions/Test/EasternAnalotia'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const EasternAnatolia = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <EasternAnatoliaPage />
    </>
  )
}

export default EasternAnatolia