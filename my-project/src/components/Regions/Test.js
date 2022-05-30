import React, { useRef, useState } from "react";
import axios from 'axios'
import Navbar from '../Navbar/index'
const Test = () => {

  async function getAllData() {

    const res = await fetch(`api/python`);
   
  }





  return (
    <>
    <Navbar />
    <div className="card">
      <div className="card-header">React Fetch GET - BezKoder.com</div>
      <div className="card-body">
        <div className="input-group input-group-sm">
          <button className="btn btn-sm btn-primary" onClick={getAllData}>Start System</button>
        </div>
      </div>
    </div>
    </>
    
  )

}

export default Test
