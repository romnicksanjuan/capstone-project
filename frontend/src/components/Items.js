import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import style from '../css/Items.module.css'
import Navbar from './Navbar';
import DOMAIN from '../config/config';
import { useNavigate } from 'react-router-dom';
import { RiPrinterFill } from "react-icons/ri";
import Topbar from './Topbar';
import { MdDelete, MdAdd, MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import Dropdown from './Category.js'

const token = localStorage.getItem("token")
const Items = () => {
  const contentRef = useRef(null);
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([])

  const [serialNumber, setSerialNumber] = useState('');
  const [arrayCategory, setArrayCategory] = useState([])

  const [displayCategory, setDisplayCategory] = useState('All')
  const [originalData, setOriginalData] = useState([])

  useEffect(() => {
    const generateSerialNumber = () => {
      const serial = 'SN-' + new Date().getTime(); // Generates a serial number based on current timestamp
      setSerialNumber(serial.toString());
      console.log(serial)
    };

    generateSerialNumber();
  }, [])

  useEffect(() => {
    setData(originalData)
  }, [originalData])


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
      setOriginalData(data.items)

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
  const [condition, setCondition] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [qrCode, setQrCode] = useState('')
  const [showImage, setShowImage] = useState('')
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

        if (!response.ok) {
          if (response.statusText === "Unauthorized") {
            // console.log("hayop ka",response.statusText)
            alert("Session Expired, Please Login Again")
            navigate("/")
            return
          }
        }


        const data = await response.json(); // Parse JSON response
        // console.log(data.items)
        if (query === '') {

          setOriginalData(data.items); // Set the items in state
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
        body: JSON.stringify({ serialNumber, unit, brand, category, condition, quantity })
      });

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      setUnit('')
      setBrand('')
      setCategory('')
      setCondition('')
      setQuantity('')
      setOriginalData(data.items)
      alert('Item Added Successful')
      setShowForm(!showForm)
      console.log(data)

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
    setCondition(item.item.condition)
  }

  const handleExitEdit = () => {
    setEditingItemId(null)
    setUnit('')
    setBrand('')
    setCategory('')
    setCondition('')
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
        body: JSON.stringify({ serialNumber, unit, brand, category, condition, quantity })
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
      setCondition('')
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
        credentials: "include",
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
      console.log(error)
    }
  }

  // printer
  const reactToPrintFn = useReactToPrint({
    documentTitle: `${new Date()}`,
    contentRef: contentRef,
  });



  // qr code image
  const showQRCode = (image) => {
    setShowImage(image)
    console.log("image:", image)
  }




  // display categories
  useEffect(() => {
    const displayCategories = async () => {
      try {
        const response = await fetch(`${DOMAIN}/display-categories`, {
          method: 'GET'
        })

        const data = await response.json()

        if (!response.ok) {
          console.log(response.statusText)
          return
        }

        console.log(data)
        setArrayCategory(data.categories)

      } catch (error) {
        console.log(error)
      }
    }
    displayCategories()
  }, [])

  const categoryFunc = (cat) => {
    setCategory(cat)
  }

  // display by category 
  useEffect(() => {
    const displayByCategory = async () => {
      if (displayCategory === "All") {
        setData(originalData)
        console.log('s')
      } else {
        setData(originalData.filter(i => i.item.category === displayCategory))
      }
    }

    displayByCategory()
  }, [displayCategory])


  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className={style.tableContainer}>

        <Topbar />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: "repeat(3, 1fr)" }} >
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

            <div
              style={{
                display: "flex",
                alignItems: 'center',
                justifyContent: "center",
                gap: "5px",
                padding: "5px",
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
              <IoSearch color='white' size={30} />
              Search
            </div>



            <div style={{ display: 'flex', alignItems: 'center', width: '120px', }}>
              <select
                id="category"
                value={displayCategory}
                onChange={(e) => setDisplayCategory(e.target.value)}
                style={{ padding: '5px', fontSize: '17px' }}
              >
                <option value="All">
                  -- Select a Category --
                </option>
                {arrayCategory ? arrayCategory.map((cat) => (
                  <option key={cat._id} value={cat.category}>{cat.category}</option>
                )) : ''}
              </select>
            </div>
          </div>






          <div style={{
            padding: "5px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#219ebc",
            color: "#fff",
            cursor: "pointer",
            width: '120px',
            fontSize: '15px',
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center'
          }}
            onClick={handleButtonClick}
          >
            <MdAdd color='white' size={30} />
            Add Item</div>

          {/* add item form */}

          {showForm && (
            <form onSubmit={handleSubmit} style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
              padding: '30px 30px 35px 30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
            }}>


              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleButtonClick()} />
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
                {/* <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ marginLeft: '10px', marginRight: '10px', height: '40px', marginTop: '5px', marginBottom: '10px', fontSize: '20px' }}
                >
                  <option value="" disabled style={{ textAlign: 'center' }}>
                    -- Choose a Category --
                  </option>
                  <option value="Mouse">Mouse</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Headset">Headset</option>
                  <option value="Microphone">Microphone</option>
                  <option value="Speaker">Speaker</option>
                  <option value="Speaker">Projector</option>
                  {arrayCategory ? arrayCategory.map((cat) => (
                    <option key={cat._id} value={cat.category}>{cat.category}</option>
                  )) : ''}
                  <option value="add-category" style={{ textAlign: 'center' }}>  Add New Category</option>
                </select> */}

                <Dropdown items={arrayCategory} categoryFunc={categoryFunc} />
              </div>

              <div>
                <label htmlFor="status">Condition:</label><br />
                <input className={style.input} type="text" id="status" name="status" value={condition} onChange={(e) => setCondition(e.target.value)} />
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
                < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleExitEdit()} />
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
                {/* <select
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
                  <option value="Speaker">Projector</option>
                  {arrayCategory ? arrayCategory.map((cat) => (
                    <option key={cat._id} value={cat.category}>{cat.category}</option>
                  )) : ''}
                </select> */}

                <Dropdown items={arrayCategory} categoryFunc={categoryFunc} />
              </div>

              <div>
                <label htmlFor="status">Condition:</label><br />
                <input className={style.input} type="text" id="status" name="status" value={condition} onChange={(e) => setCondition(e.target.value)} />
              </div>



              <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
            </form>
          )}

        </div>

        <h2 style={{ color: "orange", padding: '10px 0' }}>Inventory</h2>
        <table className={style.styledTable}>
          <thead>
            <tr>
              {/* <th>Serial No.</th> */}
              <th>Serial Number</th>
              <th>Unit</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Condition</th>
              <th>QR Code</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data ? data.map((item, index) => (
              <tr key={index}>
                {/* <td className={style.serialNumber}>{item.number}</td> */}
                <td>{item.item.serialNumber}</td>
                <td>{item.item.unit}</td>
                <td>{item.item.brand}</td>
                <td>{item.item.category}</td>
                <td>{item.item.condition}</td>
                <td style={{ width: '10px' }}>
                  <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '5px' }}>
                    {/* Your content here */}
                    <img ref={contentRef} src={item.qr_code_image.data} style={{ width: '50px', height: 'auto' }} onClick={() => showQRCode(item.qr_code_image.data)} />
                    <RiPrinterFill onClick={() => reactToPrintFn()} color='black' size={24} />
                  </div>
                </td>
                <td>{item.dateAdded}</td>
                <td style={{ gap: '10px', justifyContent: 'space-between', alignItems: 'center', }}>
                  <div style={{ display: 'flex', justifyContent: "center", gap: '10px' }}>
                    <MdDelete color='red' size={27} onClick={() => handleDelete(item)} />
                    <FaEdit color='blue' size={27} onClick={() => handleEdit(item)} />
                  </div>
                </td>
              </tr>
            )) : ''}
          </tbody>
        </table>
      </div>

      {showImage ? <div style={{ position: 'absolute', top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "500px", height: "auto", }}>
        < MdCancel style={{ position: "absolute", right: "5px", top: '5px' }} size={27} color='black' onClick={() => setShowImage("")} />
        <img src={showImage} style={{ width: "100%", height: "auto", border: "2px solid rgb(255, 187, 0)" }} />
      </div> : ""}
    </div>

  )
}

export default Items
