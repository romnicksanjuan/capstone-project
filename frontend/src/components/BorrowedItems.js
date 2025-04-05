import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../css/BorrowedItems.module.css'
import DOMAIN from '../config/config';
import { useNavigate } from 'react-router-dom';

import Topbar from './Topbar';
import { PiKeyReturnBold } from "react-icons/pi";

const token = localStorage.getItem("token")

const BorrowedItems = () => {

  const [data, setData] = useState([])


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
      setData(data)
    }

    fetchBorrowedItems()
  }, [])

  const handleReturn = async (item) => {
    if (!window.confirm('Return Confirmation')) {
      return;
    }

    try {
      setData(data.filter(i => i._id !== item._id))
      const response = await fetch(`${DOMAIN}/return-item/${item._id}`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      })


    } catch (error) {
      console.log(error)
    }
  }

  const handleButtonClick = () => {
    // setShowForm(!showForm);
  };





 
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
              <th>Borrower</th>
              <th>Mobile Number</th>
              <th>Purpose</th>
              <th>Condition</th>
              <th>Date Borrowed</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {/* <td className={styles.serialNumber}>{item.number}</td> */}
                <td>{item.serialNumber}</td>
                <td>{item.item.unit}</td>
                <td>{item.item.brand}</td>
                <td>{item.borrower}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.purpose}</td>
                <td>{item.item.condition}</td>
                <td>{item.dateBorrowed}</td>
                <td style={{ display: 'flex', border: 'none', }}>

                  <div style={{ display: "flex", alignItems: 'center', borderRadius: "5px", backgroundColor: "#219ebc", padding: '5px', }} onClick={() => handleReturn(item)} >
                    <PiKeyReturnBold size={27} color='white' />
                    <p style={{ color: 'white', fontSize: '15px' }}> Return</p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default BorrowedItems
