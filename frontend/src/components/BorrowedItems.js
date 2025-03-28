import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../css/BorrowedItems.module.css'
import DOMAIN from '../config/config';

import { useNavigate } from 'react-router-dom';
import Topbar from './Topbar';
import { PiKeyReturnBold } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
const token = localStorage.getItem("token")

const BorrowedItems = () => {

  const [data, setData] = useState([])
  const [error, setError] = useState('')
  const [isClick, setIsClick] = useState(false)

  const [serialNumber, setSerialNumber] = useState('')
  const [brand, setBrand] = useState('')
  const [borrower, setBorrower] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [purpose, setPurpose] = useState('')
  const [status, setStatus] = useState('')

  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)


  const handleRedirect = () => {
    navigate('/add-borrow-item');
  };

  const handleCancel = () => {
    setShowForm(!showForm)
  }

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
    setShowForm(!showForm);
  };



  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${DOMAIN}/add-borrow-item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ serialNumber, borrower, mobileNumber, purpose })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message)
        throw new Error(response.status);
      }

      setShowForm(false)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const f = () => {
      setError('')
    }
    f()
  }, [serialNumber, borrower, mobileNumber, purpose])
  return (
    <div style={{ display: "flex" }}>
      <Navbar />

      {showForm && <form onSubmit={handleSubmit} style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
        padding: '50px 30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
      }}>
          < MdCancel style={{position:"absolute",right:"10px", top:'10px'}} size={27} color='black' onClick={() =>handleCancel()}/>
        {error && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: '40px', }}>
          <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>
        </div>}
        <div>
          <label htmlFor="serial-number">Serial Number:</label><br />
          <input className={styles.input} type="text" id="item" name="item" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </div>



        <div>
          <label htmlFor="borrower">Borrower:</label><br />
          <input className={styles.input} type='text' id="borrower" name="borrower" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
        </div>

        <div>
          <label htmlFor="mobilenumber">Mobile Number:</label><br />
          <input className={styles.input} type='number' id="mobilenumber" name="mobilenumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
        </div>

        <div>
          <label htmlFor="purpose">Purpose:</label><br />
          <input className={styles.input} type="text" id="purpose" name="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
        </div>


        {/* <div>
                           <label htmlFor="quantity">Quantity:</label><br />
                           <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                       </div> */}

        <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
      </form>}







      <div className={styles.borrowedItems}>

        < Topbar />
        <div>
          <button style={{
            marginTop: "20px",
            marginBottom: "10px",
            padding: "10px",
            marginLeft: "10px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#219ebc",
            color: "#fff",
            cursor: "pointer",
            fontSize: '15px'
          }} onClick={handleButtonClick}>Create Transaction</button>
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
                <td>{item.item.unit}</td>
                <td>{item.item.brand}</td>
                <td>{item.borrower}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.purpose}</td>
                <td>{item.item.status}</td>
                <td>{item.dateBorrowed}</td>
                <td style={{ display: 'flex' ,border:'none',}}>

                  <div style={{ display: "flex",alignItems:'center',borderRadius:"5px", backgroundColor: "#219ebc", padding:'5px',}} onClick={() => handleReturn(item)} >
                    <PiKeyReturnBold size={27} color='white' />
                    <p style={{color:'white', fontSize:'15px'}}> Return</p>
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
