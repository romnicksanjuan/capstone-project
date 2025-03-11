import React, { useEffect, useState } from 'react'
import style from '../css/Items.module.css'
import Navbar from './Navbar';
import DOMAIN from '../config/config';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem("token")
const Items = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([])

  const [serialNumber, setSerialNumber] = useState('');

  useEffect(() => {
    const generateSerialNumber = () => {
      const serial = 'SN-' + new Date().getTime(); // Generates a serial number based on current timestamp
      setSerialNumber(serial.toString());
      console.log(serial)
    };

    generateSerialNumber();
  }, [])


  // search
  const searchItem = async () => {

    try {
      const response = await fetch(`${DOMAIN}/search?query=${query}`, {
        method: 'GET',
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

      const data = await response.json()
      setData(data.items)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const reset = () => {
      if (query === '') {

      }
    }

    reset()
  }, [])

  // edit item
  const [editingItemId, setEditingItemId] = useState(null);


  const [unit, setUnit] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [qrCode, setQrCode] = useState('')
  // const [token, setToken] = useState("")

  // useEffect(() => {
  //   const checkToken = async () => {
  //     const token = localStorage.getItem("token")
  //     console.log("tokenn", token)
  //     if (token) {
  //       setToken(token)
  //     }
  //   }

  //   checkToken()
  // }, [])

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };


  // fetch items
  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await fetch(`${DOMAIN}/display-items`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }); // Fetch from backend
        
        if (response.statusText === "Unauthorized") {
          // console.log("hayop ka",response.statusText)
          alert("Session Expired, Please Login Again")
          navigate("/")
          return
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

       
        const data = await response.json(); // Parse JSON response
        console.log(data.items)
        if (query === '') {

          setData(data.items); // Set the items in state
        }

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [query])


  // create item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${DOMAIN}/create-item`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ serialNumber, unit, brand, category, status, quantity })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setUnit('')
      setBrand('')
      setCategory('')
      setStatus('')
      setQuantity('')

      window.location.reload();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // edit item
  const handleEdit = async (item) => {

    // console.log(item)
    setEditingItemId(item.item._id)
    setSerialNumber(item.item.serialNumber)
    setUnit(item.item.unit)
    setBrand(item.item.brand)
    setCategory(item.item.category)
    setStatus(item.item.status)
  }

  const handleExitEdit = () => {
    setEditingItemId(null)
    setUnit('')
    setBrand('')
    setCategory('')
    setStatus('')
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${DOMAIN}/edit-item/${editingItemId}`, {
        method: 'PUT',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ serialNumber, unit, brand, category, status, quantity })
      })

      if (!window.confirm('Are you sure you want to update this item?')) return

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json()
      console.log(data)

      setUnit('')
      setBrand('')
      setCategory('')
      setStatus('')
      setQuantity('')

      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  // delete item
  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`${DOMAIN}/delete-item/${item.item._id}`, {
        method: 'DELETE',
        credentials:"include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setData(data.filter(i => i.item._id !== item.item._id));
      // window.location.reload();
    } catch (error) {

    }
  }
  return (
    <>
      <Navbar />
      <div className={style.tableContainer}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search item..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                padding: "10px",
                width: "300px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                fontSize: '15px'

              }}
            />
            <button

              style={{
                marginTop: "20px",
                marginBottom: "10px",
                padding: "10px",
                marginLeft: "10px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#219ebc",
                color: "#fff",
                cursor: "pointer",
                width: '120px',
                fontSize: '15px'
              }}

              onClick={() => searchItem()}
            >
              Search
            </button>
          </form>


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
            width: '120px',
            fontSize: '15px'
          }}
            onClick={handleButtonClick}
          >Add Item</button>

          {/* add item form */}

          {showForm && (
            <form onSubmit={handleSubmit} style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
              padding: '30px 30px 35px 30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
            }}>


              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ textAlign: 'center', fontSize: '20px', width: '35px' }} onClick={handleButtonClick}>x</button>
              </div>

              <div>
                <label htmlFor="serial-number">Serial Number:</label><br />
                <input className={style.input} type='text' id="serial-number" name="serial-number" value={serialNumber} onChange={(e) => setBrand(e.target.value)} disabled />
              </div>

              <div>
                <label htmlFor="Unit">Unit:</label><br />
                <input className={style.input} type="text" id="Unit" name="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
              </div>

              <div>
                <label htmlFor="brand">Brand:</label><br />
                <input className={style.input} type='text' id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>

              <div>
                <label htmlFor="category">Category:</label><br />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ marginLeft: '10px', marginRight: '10px', height: '40px', marginTop: '5px', marginBottom: '10px', fontSize: '20px' }}
                >
                  <option value="" disabled>
                    -- Choose a Category --
                  </option>
                  <option value="Mouse">Mouse</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Headset">Headset</option>
                  <option value="Microphone">Microphone</option>
                  <option value="Speaker">Speaker</option>
                </select>
              </div>

              <div>
                <label htmlFor="status">Status:</label><br />
                <input className={style.input} type="text" id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
              </div>

              {/* <div>
                <label htmlFor="quantity">Quantity:</label><br />
                <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div> */}

              <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
            </form>
          )}





          {/* edit item form */}
          {editingItemId && (
            <form onSubmit={handleSubmitEdit} style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
              padding: '30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
            }}>


              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ textAlign: 'center', fontSize: '20px', width: '35px' }} onClick={handleExitEdit}>x</button>
              </div>

              <div>
                <label htmlFor="serial-number">Serial Number:</label><br />
                <input className={style.input} type='text' id="serial-number" name="serial-number" value={serialNumber} onChange={(e) => setBrand(e.target.value)} disabled />
              </div>


              <div>
                <label htmlFor="unit">Unit:</label><br />
                <input className={style.input} type="text" id="item" name="item" value={unit} onChange={(e) => setUnit(e.target.value)} />
              </div>

              <div>
                <label htmlFor="brand">Brand:</label><br />
                <input className={style.input} type='text' id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>

              <div>
                <label htmlFor="category">Category:</label><br />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ marginLeft: '10px', marginRight: '10px', height: '40px', marginTop: '5px', marginBottom: '10px', fontSize: '20px' }}
                >
                  <option value="" disabled>
                    -- Choose a Category --
                  </option>
                  <option value="Mouse">Mouse</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Headset">Headset</option>
                  <option value="Microphone">Microphone</option>
                  <option value="Speaker">Speaker</option>
                </select>
              </div>

              <div>
                <label htmlFor="status">Status:</label><br />
                <input className={style.input} type="text" id="status" name="status" value={status} onChange={(e) => setStatus(e.target.value)} />
              </div>



              <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
            </form>
          )}

        </div>
        <table className={style.styledTable}>
          <thead>
            <tr>
              {/* <th>Serial No.</th> */}
              <th>Serial Number</th>
              <th>Unit</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Status</th>
              <th>QR Code</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {/* <td className={style.serialNumber}>{item.number}</td> */}
                <td>{item.item.serialNumber}</td>
                <td>{item.item.unit}</td>
                <td>{item.item.brand}</td>
                <td>{item.item.category}</td>
                <td>{item.item.status}</td>
                <td>
                  <img src={item.qr_code_image.data} style={{ width: '100px', height: '100px' }} />
                </td>
                <td>{item.dateAdded}</td>
                <td style={{ gap: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100px' }}>
                  <button style={{
                    backgroundColor: "#219ebc",
                    color: "#fff", cursor: 'pointer', height: '35px', width: '45%', border: 'none', fontSize: '15px', borderRadius: '5px',
                  }} onClick={() => handleDelete(item)}>Delete</button>
                  <button style={{
                    backgroundColor: "#219ebc",
                    color: "#fff", cursor: 'pointer', height: '35px', width: '45%', border: 'none', fontSize: '15px', borderRadius: '5px',
                  }} onClick={() => handleEdit(item)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default Items
