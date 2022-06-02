import {React , useState} from 'react'
import Test from '../components/Regions/Test/Test'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
    <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <Test />
    </>
  )
}

export default TestPage
