import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import { MdInventory } from "react-icons/md";
import BarChart from './BarChart'
import BarChartMerchandise from './BarChartMerchandise'
import Topbar from './Topbar'
// const token = localStorage.getItem("token")

function Dashboard() {
  const [totalItems, setTotalItems] = useState(0)
  const [totalBorrowedItems, setTotalBorrowedItems] = useState(0)
  const [totalMerchandise, setTotalMerchandise] = useState(0)
  const [data, setData] = useState([])
  // const [tokenExpired,setTokenExpired] = useState("")

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/")
  //     window.alert("You are not authorized, Please login")
  //   }
  // }, [])

  // console.log("tokennnnn:",token)

  // display total items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${DOMAIN}/total-items`, {
          method: 'GET',
          credentials: "include",
        }); // Fetch from backend
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // console.log(response.statusText)


        const data = await response.json();
        setTotalItems(data.total);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [])

  // total borrowed items
  const fetchItems = async () => {
    try {
      const response = await fetch(`${DOMAIN}/total-borrowed-items`, {
        method: 'GET',
        credentials: "include",
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

  //   display borrowed items
  const fetchBorrowedItems = async () => {
    const response = await fetch(`${DOMAIN}/fetch-borrowed-items`, {
      method: 'GET',
      credentials: "include",
    })
    if (response.statusText === "Unauthorized") {
      // console.log("hayop ka",response.statusText)
      alert("Session Expired, Please Login Again")
      navigate("/")
      return
    }

    const data = await response.json()
    // console.log(data)
    setData(data)
  }

  // display total merchanise
  const displayTotalMerchandise = async () => {
    try {
      const response = await fetch(`${DOMAIN}/total-merchandise`, {
        method: "GET"
      })

      const data = await response.json()
      // console.log(data)
      setTotalMerchandise(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchItems()
    fetchBorrowedItems()
    displayTotalMerchandise()
  }, [])


  // return
  const handleReturn = async (item) => {
    if (!window.confirm('Return Confirmation')) {
      return;
    }
    try {
      setData(data.filter(i => i._id !== item._id))
      const response = await fetch(`${DOMAIN}/return-item/${item._id}`, {
        method: 'PUT',
      })


    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div style={{ display: 'flex' }}>
      <Navbar />


      <div className={styles.Dashboard}>

        <Topbar />
        <h2 style={{ color: 'orange', textAlign: 'start', margin: "0", padding: '10px 0' }}>OVERVIEW</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>

          <div className={styles.totalItems}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <MdInventory size={30} color='white' />
              <h3 style={{ margin: '0', color: 'white' }}>Total Inventory</h3>
            </div>

            <h4 style={{ margin: '0', color: 'white', textAlign: 'center', fontSize: '20px' }}>{totalItems}</h4>
          </div>

          <div className={styles.totalItems}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <MdInventory size={30} color='white' />
              <h3 style={{ margin: '0', color: 'white' }}>Total Borrowed Items</h3>
            </div>

            <h4 style={{ margin: '0', color: 'white', textAlign: 'center', fontSize: '20px' }}>{totalBorrowedItems}</h4>
          </div>

          <div className={styles.totalItems}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <MdInventory size={30} color='white' />
              <h3 style={{ margin: '0', color: 'white' }}>Total Merchandise</h3>
            </div>

            <h4 style={{ margin: '0', color: 'white', textAlign: 'center', fontSize: '20px' }}>{totalMerchandise}</h4>
          </div>

        </div>


        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <div style={{ width: '50%' }}>
            <h2 style={{ color: 'orange', textAlign: 'center', margin: "0", padding: '10px 0' }}>Inventory</h2>
            <BarChart />
          </div>
          <div style={{ width: '50%' }}>
            <h2 style={{ color: 'orange', textAlign: 'center', padding: '10px 0' }}>Merchandise</h2>
            <BarChartMerchandise />
          </div>
        </div>
        {/* <h2 style={{ color: "orange", padding: '10px 0' }}>Borrowed Items</h2>
        <table className={styles.styledTable}>
          <thead>
            <tr>
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
            {data ? data.map((item, index) => (
              <tr key={index}>
                <td>{item.serialNumber}</td>
                <td>{item.item.unit}</td>
                <td>{item.item.brand}</td>
                <td>{item.borrower}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.purpose}</td>
                <td>{item.item.status}</td>
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
            )) : ""}
          </tbody>
        </table> */}

      </div>

    </div>

  )
}

export default Dashboard
