import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'

function Dashboard() {
  const [totalItems, setTotalItems] = useState(0)
  const [totalBorrowedItems, setTotalBorrowedItems] = useState(0)
  const [data, setData] = useState([])

  // display total items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${DOMAIN}/total-items`, {
          method: 'GET'
        }); // Fetch from backend
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalItems(data.total);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [])

  // total borrowed items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${DOMAIN}/total-borrowed-items`, {
          method: 'GET'
        }); // Fetch from backend
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTotalBorrowedItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [])

  //   display borrowed items
  useEffect(() => {
    const fetchBorrowedItems = async () => {
      const response = await fetch(`${DOMAIN}/fetch-borrowed-items`, {
        method: 'GET'
      })

      const data = await response.json()
      console.log(data)
      setData(data)
    }

    fetchBorrowedItems()
  }, [])




  // return
  const handleReturn = async (item) => {
    if (!window.confirm('Return Confirmation')) {
      return;
    }
    try {
      setData(data.filter(i => i._id !== item._id))
      const response = await fetch(`${DOMAIN}/return-item/${item._id}`, {
        method: 'PUT'
      })


    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Navbar />
      <div className={styles.Dashboard}>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>


          <div className={styles.totalItems}>
            <div>
              <h3 style={{ margin: '0', color: 'white' }}>Total Items</h3>
              <h4 style={{ margin: '0', color: 'white', textAlign: 'center' }}>{totalItems}</h4>
            </div>
          </div>

          <div className={styles.totalBorrowedItems}>
            <div>
              <h3 style={{ margin: '0', color: 'white' }}>Total Borrowed Items</h3>
              <h4 style={{ margin: '0', color: 'white', textAlign: 'center' }}>{totalBorrowedItems}</h4>
            </div>
          </div>
        </div>



        <h2 style={{color: "gray"}}>Borrowed Items</h2>
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
              <th>Status</th>
              <th>Date Borrowed</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {/* <td className={styles.serialNumber}>{item.number}</td> */}
                <td>{item.serialNumber}</td>
                <td>{item.unit}</td>
                <td>{item.brand}</td>
                <td>{item.borrower}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.purpose}</td>
                <td>{item.status}</td>
                <td>{item.dateBorrowed}</td>
                <td>
                  <button style={{
                    backgroundColor: "#219ebc",
                    color: "#fff", cursor: 'pointer', height: '35px', width: '100%', border: 'none', fontSize: '15px', borderRadius: '5px',
                  }} onClick={() => handleReturn(item)}>
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </>

  )
}

export default Dashboard
