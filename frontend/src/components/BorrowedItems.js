import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styles from '../css/BorrowedItems.module.css'
import DOMAIN from '../config/config';
import { useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";
import { PiWarningOctagonFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";


import Topbar from './Topbar';
import { PiKeyReturnBold } from "react-icons/pi";

const token = localStorage.getItem("token")

const BorrowedItems = () => {



  const [originalData, setOriginalData] = useState([])
  const [data, setData] = useState([])
  const [isOpenReturenStatus, SetIsOpenReturenStatus] = useState(false)

  const [item, setItem] = useState({})
  const [condition, setCondition] = useState('')
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
        body: JSON.stringify({ condition })
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
    setCondition('')
  };

  // select status
  const handleStatus = async (item) => {
    setItem(item)
    SetIsOpenReturenStatus(!isOpenReturenStatus)
    console.log(item)
  }


  // damage / lost 
  const [formData, setFormData] = useState({
    // item: '',
    issue: '',
    dateReported: '',
    remarks: '',
    quantity: '',
    actionTaken: '',
  });

  const [itemDamageLost, setItemDamageLost] = useState({})
  const [isDamageLost, setIsDamageLost] = useState(false)

  const handleDamage_Lost = async (item) => {
    setItemDamageLost(item)
    console.log(item)
    setIsDamageLost(!isDamageLost)
  }



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    try {
      const response = await fetch(`${DOMAIN}/damage-lost/${itemDamageLost._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      console.log(data)
      alert(data.message)
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
    // TODO: Send to backend or handle form logic here
  };




  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div className={styles.borrowedItems}>
        < Topbar />
   

        {/* {isShowForm ? <div style={{
          position: 'absolute', backgroundColor: 'orange',
            padding: '20px 30px',
          height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px',
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)'
        }}>
          <MdCancel size={25} color='black' onClick={() => setIsShowForm(!isShowForm)} />
          <BorrowForm />
        </div> : ''} */}

        <h2 style={{ color: "orange", padding: '10px 0' }}>Borrowed Items</h2>
        <table className={styles.styledTable}>
          <thead>
            <tr>
              {/* <th>Serial No.</th> */}
              {/* <th>PMS Number</th> */}
              {/* <th>Unit</th> */}
              {/* <th>Brand</th> */}
              <th>Borrower's Name</th>
              <th>Department</th>
              <th>Borrower's Designation</th>
              <th>Mobile Number</th>
              <th>Purpose</th>
              {/* <th>Quantity</th> */}
              {/* <th>Condition</th> */}
              <th>Date Borrowed</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data ? data.map((item, index) => (
              <tr key={index}>
                {/* <td>{item.serialNumber}</td> */}
                {/* <td>{item.item.unit}</td> */}
                {/* <td>{item.item.brand}</td> */}
                <td onClick={() => navigate('/borrowed-item-details', { state: { item } })}>{item.borrower}</td>
                <td onClick={() => navigate('/borrowed-item-details', { state: { item } })}>{item.department}</td>
                <td onClick={() => navigate('/borrowed-item-details', { state: { item } })}>{item.borrower_designation}</td>
                <td onClick={() => navigate('/borrowed-item-details', { state: { item } })}>{item.mobileNumber}</td>
                <td onClick={() => navigate('/borrowed-item-details', { state: { item } })}>{item.purpose}</td>
                {/* <td onClick={() => navigate('/borrowed-item-details', { state: { item } })}>{item.quantity}</td> */}
                {/* <td>{item.item.condition}</td> */}
                <td>{item.dateBorrowed}</td>
                <td style={{ display: 'flex', gap: '5px', border: 'none', }}>
                  <div style={{ display: "flex", alignItems: 'center', borderRadius: "5px", backgroundColor: "#219ebc", padding: '5px', }} onClick={() => handleStatus(item)} >
                    <PiKeyReturnBold size={20} color='black' />
                    <p style={{ color: 'white', fontSize: '15px' }}>Return</p>
                  </div>

                  <div style={{ display: "flex", alignItems: 'center', borderRadius: "5px", backgroundColor: "#219ebc", padding: '5px', }} onClick={() => handleDamage_Lost(item)} >
                    <PiWarningOctagonFill size={20} color='black' />
                    <p style={{ color: 'white', fontSize: '15px' }}>Damage/Lost</p>
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
            <label htmlFor="status">Set Condition:</label><br />
            <input className={styles.input} type="text" id="status" name="status" value={condition} onChange={(e) => setCondition(e.target.value)} />
          </div>

          <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Return</button>
        </form>
        : ''
      }

      {
        isDamageLost ?
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            < MdCancel size={25} color='black' onClick={() => setIsDamageLost(!isDamageLost)} />
            <h2 className={styles.heading}>Issue Report Form</h2>

            {/* <div className={styles.formGroup}>
              <label className={styles.label}>Item</label>
              <input
                type="text"
                name="item"
                value={formData.item}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div> */}

            <div className={styles.formGroup}>
              <label className={styles.label}>Issue</label>
              <select id="issue" name="issue"
                value={formData.issue}
                onChange={handleChange} style={{ padding: '5px', width: '200px' }}>
                <option value="">-- Select --</option>
                <option value="Damage">Damage</option>
                <option value="Lost">Lost</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Date Reported</label>
              <input
                type="date"
                name="dateReported"
                value={formData.dateReported}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Quantity</label>
              <input
                type='text'
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Action Taken</label>
              <textarea
                name="actionTaken"
                value={formData.actionTaken}
                onChange={handleChange}
                className={styles.textarea}
                rows="3"
              />
            </div>

            <button type="submit" className={styles.button}>
              Submit Report
            </button>
          </form> : ''
      }

    </div>

  )
}

export default BorrowedItems
