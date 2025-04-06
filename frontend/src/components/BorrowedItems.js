import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../css/BorrowedItems.module.css'
import DOMAIN from '../config/config';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";

import Topbar from './Topbar';
import { PiKeyReturnBold } from "react-icons/pi";

const token = localStorage.getItem("token")

const BorrowedItems = () => {

  const [originalData, setOriginalData] = useState([])
  const [data, setData] = useState([])
  const [isOpenReturenStatus, SetIsOpenReturenStatus] = useState(false)

  const [item, setItem] = useState({})
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [error, serError] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBorrowedItems = async () => {
      const response = await fetch(`${DOMAIN}/fetch-borrowed-items`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Authorization": `Beare ${token}`
        }
      })
      const data = await response.json()
      if (response.statusText === "Unauthorized") {
        // console.log("hayop ka",response.statusText)
        alert("Session Expired, Please Login Again")
        navigate("/")
        return
      }

      console.log(data)
      setOriginalData(data)
    }

    fetchBorrowedItems()
  }, [])

  useEffect(() => {
    setData(originalData)
  }, [originalData])


  const handleReturn = async (e) => {
    e.preventDefault()
    if (!window.confirm('Return Confirmation')) {
      return;
    }

    try {

      const response = await fetch(`${DOMAIN}/return-item/${item._id}`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({status })
      })

      const data = await response.json()

      if (!response.ok) {
        console.log(response.statusText)
        return
      }
      setData(originalData.filter(i => i._id !== item._id))
      alert(data.message)
      SetIsOpenReturenStatus(!isOpenReturenStatus)
    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonClick = () => {
    SetIsOpenReturenStatus(!isOpenReturenStatus)
    setStatus('')
  };

  // select status
  const handleStatus = async (item) => {
    setItem(item)
    SetIsOpenReturenStatus(!isOpenReturenStatus)
    console.log(item)
  }




  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className={styles.borrowedItems}>

        < Topbar />
        <div>
          {/* <button style={{
            marginTop: "20px",
            marginBottom: "10px",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#219ebc",
            color: "#fff",
            cursor: "pointer",
            fontSize: '15px'
          }} onClick={handleButtonClick}>Create Transaction</button> */}
        </div>

        <h2 style={{ color: "orange", padding: '10px 0' }}>Borrowed Items</h2>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              {/* <th>Serial No.</th> */}
              <th>Serial Number</th>
              <th>Unit</th>
              <th>Brand</th>
              <th>Borrower's Name</th>
              <th>Department</th>
              <th>Borrower's Designation</th>
              <th>Mobile Number</th>
              <th>Purpose</th>
              <th>Condition</th>
              <th>Date Borrowed</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data ? data.map((item, index) => (
              <tr key={index}>
                {/* <td className={styles.serialNumber}>{item.number}</td> */}
                <td>{item.serialNumber}</td>
                <td>{item.item.unit}</td>
                <td>{item.item.brand}</td>
                <td>{item.borrower}</td>
                <td>{item.department}</td>
                <td>{item.borrower_designation}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.purpose}</td>
                <td>{item.item.condition}</td>
                <td>{item.dateBorrowed}</td>
                <td style={{ display: 'flex', border: 'none', }}>
                  <div style={{ display: "flex", alignItems: 'center', borderRadius: "5px", backgroundColor: "#219ebc", padding: '5px', }} onClick={() => handleStatus(item)} >
                    <PiKeyReturnBold size={20} color='white' />
                    <p style={{ color: 'white', fontSize: '15px' }}> Return</p>
                  </div>
                </td>
              </tr>
            )) : ''}
          </tbody>
        </table>
      </div>

      {isOpenReturenStatus ?
        <form onSubmit={handleReturn} style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
          padding: '50px 30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
        }}>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleButtonClick()} />
          </div>

          {error && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: '40px', }}>
            <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>
          </div>}

          {message && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', height: '40px', }}>
            <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
          </div>}
          <div>
            <label htmlFor="status">Set Status:</label><br />
            <input className={styles.input} type="text" id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
          </div>

          <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Return</button>
        </form>
        : ''
      }
    </div>

  )
}

export default BorrowedItems
