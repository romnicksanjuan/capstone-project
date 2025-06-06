import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from "react-to-print";
import style from '../css/Items.module.css'
import Navbar from './Navbar.js';
import DOMAIN from '../config/config.js';
import { useNavigate } from 'react-router-dom';
import { RiPrinterFill } from "react-icons/ri";
import Topbar from './Topbar.js';
import { MdDelete, MdAdd, MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import Item_Type from './Item_Type.js';

import Dropdown from './Category.js'

const token = localStorage.getItem("token")
const Inventory = () => {
  const contentRef = useRef(null);
  const navigate = useNavigate()
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([])

  const [PMSNumber, setPMSNumber] = useState('');
  const [arrayCategory, setArrayCategory] = useState([])

  const [displayCategory, setDisplayCategory] = useState('All')
  const [displayByAccessoryType, setDisplayByAccessoryType] = useState('All')
  const [itemLength, setItemLength] = useState(0)
  const [originalData, setOriginalData] = useState([])




  useEffect(() => {
    const generateSerialNumber = () => {
      const serial = 'PMS-' + new Date().getTime(); // Generates a serial number based on current timestamp
      setPMSNumber(serial.toString());
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


  const [itemDescription, setItemDescription] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [showImage, setShowImage] = useState('')
  const [categoryValue, setCategoryValue] = useState('Select Category')
  const [type, setType] = useState('')
  const [typeValue, setTypeValue] = useState('Select Item Type')
  const [typeArray, setTypeArray] = useState([])
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
    setCategoryValue('Select a Category')
    setTypeValue('Select Item Type')
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
        console.log('items:', data.items)
        setItemLength(data.items.length)
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
        body: JSON.stringify({ serialNumber, PMSNumber, itemDescription, brand, category, condition, quantity, location, status, accessory_type: type })
      });

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      setItemDescription('')
      setBrand('')
      setCategory('')
      setCondition('')
      setQuantity('')
      setPMSNumber('')
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
    setPMSNumber(item.item.PMSNumber)
    setItemDescription(item.item.itemDescription)
    setBrand(item.item.brand)
    setCategory(item.item.category)
    setCondition(item.item.condition)
    setLocation(item.item.location)
    setCategoryValue(item.item.category)
    setTypeValue(item.item.accessory_type)
    setStatus(item.item.status)
    setQuantity(item.item.quantity)
  }

  const handleExitEdit = () => {
    setEditingItemId(null)
    setItemDescription('')
    setBrand('')
    setCategory('')
    setCondition('')
    setLocation('')
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    // console.log(typeValue)
    // return
    try {
      const response = await fetch(`${DOMAIN}/edit-item/${editingItemId}`, {
        method: 'PUT',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ serialNumber, PMSNumber, itemDescription, brand, category, condition, location, quantity, status, accessory_type: typeValue })
      })

      if (!window.confirm('Are you sure you want to update this item?')) return

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json()
      console.log(data)

      setItemDescription('')
      setBrand('')
      setCategory('')
      setCondition('')
      setQuantity('')
      setSerialNumber('')
      setLocation('')
      setStatus('')

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


  const itemFunction = (type) => {
    setType(type)
  }

  // display type list
  useEffect(() => {
    const displayTypes = async () => {
      try {
        const response = await fetch(`${DOMAIN}/display-accessory-type`, {
          method: 'GET'
        })

        const data = await response.json()

        if (!response.ok) {
          console.log(response.statusText)
          return
        }

        console.log('types:', data)
        setTypeArray(data.type)

      } catch (error) {
        console.log(error)
      }
    }
    displayTypes()
  }, [])


  // display by category and accessory type
  useEffect(() => {
    const displayByCategory = async () => {
      if (displayCategory === "All" && displayByAccessoryType === "All") {
        setData(originalData);
        console.log("Filtered Length:", originalData.length);
        setItemLength(originalData.length)
      } else {
        const filtered = originalData.filter((i) => {
          const matchCategory = displayCategory === "All" || i.item.category === displayCategory;
          const matchAccessoryType = displayByAccessoryType === "All" || i.item.accessory_type === displayByAccessoryType;
          return matchCategory && matchAccessoryType;
        });
        setData(filtered);
        console.log("Filtered Length:", filtered.length); // ✅ log the length
        setItemLength(filtered.length)
      }
    };
    displayByCategory();
  }, [displayCategory, displayByAccessoryType]);



  return (
    <div style={{ display: 'flex' }}>
      <Navbar />
      <div className={style.tableContainer}>

        <Topbar />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          <div style={{ display: 'flex', gap: '30px' }}>
            <div onSubmit={handleSearch} style={{ display: 'flex', }}>
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
            </div>



            {/* category selection */}
            <div style={{ display: 'flex', alignItems: 'center', width: 'auto', }}>
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

            {/* accessory type selection */}

            <div style={{ display: 'flex', alignItems: 'center', }}>
              <select
                id="category"
                value={displayByAccessoryType}
                onChange={(e) => setDisplayByAccessoryType(e.target.value)}
                style={{ padding: '5px', fontSize: '17px', width: 'auto' }}
              >
                <option value="All" style={{ textAlign: 'center' }}>
                  -- Select Type --
                </option>
                {typeArray ? typeArray.map((type) => (
                  <option key={type._id} value={type.type}>{type.type}</option>
                )) : ''}
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid gray', padding: "0 10px" }}>
              {itemLength}
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
            Add Item
          </div>

          {/* add item form */}

          {showForm && (
            <form onSubmit={handleSubmit} style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
              padding: '20px', height: 'auto', width: '500px', gap: '20px', border: '1px solid black', borderRadius: '5px'
            }}>


              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleButtonClick()} />
              </div>

              <div>
                <label htmlFor="serial-number">PMS Number:</label><br />
                <input className={style.input} type='text' id="serial-number" name="serial-number" defaultValue={PMSNumber} disabled />
              </div>

              <div>
                <label htmlFor="serial-item">Serial Number:</label><br />
                <input className={style.input} type='text' id="serial-item" name="serial-item" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
              </div>

              <div>
                <label htmlFor="Unit">Item Description:</label><br />
                <input className={style.input} type="text" id="Unit" name="Unit" required value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </div>

              <div>
                <label htmlFor="brand">Brand:</label><br />
                <input className={style.input} type='text' id="brand" name="brand" required value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>

              <div>
                <label htmlFor="quantity">Quantity:</label><br />
                <input className={style.input} type='text' id="quantity" name="quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>

              <div>
                <label htmlFor="category">Category:</label><br />

                <Dropdown items={arrayCategory} categoryFunc={categoryFunc} categoryValue={categoryValue} />
              </div>

              <div>
                <label htmlFor="type-item">Item Type:</label><br />
                <Item_Type items={typeArray} itemFunction={itemFunction} itemValue={typeValue} />
              </div>

              <div>
                <label htmlFor="condition">Condition:</label><br />
                <input className={style.input} type="text" id="condition" name="condition" required value={condition} onChange={(e) => setCondition(e.target.value)} />
              </div>

              <div>
                <label htmlFor="location">Location:</label><br />
                <input className={style.input} type="text" id="location" name="location" required value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div>
                <label htmlFor="status">Status:</label><br />
                <input className={style.input} type="text" id="status" name="status" required value={status} onChange={(e) => setStatus(e.target.value)} />
              </div>

              {/* <div>
                <label htmlFor="quantity">Quantity:</label><br />
                <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div> */}

              <button style={{ height: '35px', width: '100%', border: 'none', fontSize: '15px', borderRadius: '5px', }} type="submit">Submit</button>
            </form>
          )}





          {/* edit item form */}
          {editingItemId && (
            <form onSubmit={handleSubmitEdit} style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
              padding: '30px', height: 'auto', width: '500px', gap: '20px', border: '1px solid black', borderRadius: '5px'
            }}>


              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleExitEdit()} />
              </div>

              <div>
                <label htmlFor="serial-number">PMS Number:</label><br />
                <input className={style.input} type='text' id="serial-number" name="serial-number" value={PMSNumber} onChange={(e) => setPMSNumber(e.target.value)} disabled />
              </div>

              <div>
                <label htmlFor="serial-item">Serial Number:</label><br />
                <input className={style.input} type='text' id="serial-item" name="serial-item" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
              </div>

              <div>
                <label htmlFor="unit">Item Description:</label><br />
                <input className={style.input} type="text" id="item" name="item" value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} />
              </div>

              <div>
                <label htmlFor="brand">Brand:</label><br />
                <input className={style.input} type='text' id="brand" name="brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>

              <div>
                <label htmlFor="quantity">Quantity:</label><br />
                <input className={style.input} type='text' id="quantity" name="quantity" required value={quantity} onChange={(e) => setQuantity(e.target.value)} />
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

                <Dropdown items={arrayCategory} categoryFunc={categoryFunc} categoryValue={categoryValue} />
              </div>


              <div>
                <label htmlFor="type-item">Item Type:</label><br />
                <Item_Type items={typeArray} itemFunction={itemFunction} itemValue={typeValue} />
              </div>

              <div>
                <label htmlFor="status">Condition:</label><br />
                <input className={style.input} type="text" id="status" name="status" value={condition} onChange={(e) => setCondition(e.target.value)} />
              </div>

              <div>
                <label htmlFor="location">Location:</label><br />
                <input className={style.input} type="text" id="location" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>

              <div>
                <label htmlFor="status">Status:</label><br />
                <input className={style.input} type="text" id="status" name="status" required value={status} onChange={(e) => setStatus(e.target.value)} />
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
              <th>PMS Number</th>
              <th>Serial Number</th>
              <th>Item Description</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Condition</th>
              <th>Location</th>
              <th>QR Code</th>
              <th>Status</th>
              <th>Item Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data ? data.map((item, index) => (
              <tr key={index}>
                {/* <td className={style.serialNumber}>{item.number}</td> */}
                <td>{item.item.PMSNumber}</td>
                <td>{item.item.serialNumber}</td>
                <td>{item.item.itemDescription}</td>
                <td>{item.item.brand}</td>
                <td>{item.item.category}</td>
                <td>{item.item.condition}</td>
                <td>{item.item.location}</td>
                <td style={{ width: '10px' }}>
                  <div style={{ display: 'flex', justifyItems: 'center', alignItems: 'center', gap: '5px' }}>

                    <div className={style.printView} ref={contentRef}>
                      {[...Array(40)].map((_, i) => (
                        <div className={style.qrBox} key={i}>
                          <img src={item.qr_code_image.data} style={{ width: '50px', height: 'auto' }} />
                        </div>
                      ))}
                    </div>
                    {/* Your content here */}
                    <img src={item.qr_code_image.data} style={{ width: '50px', height: 'auto' }} onClick={() => showQRCode(item.qr_code_image.data)} />
                    <RiPrinterFill onClick={() => reactToPrintFn()} color='black' size={24} />
                  </div>
                </td>
                <td>{item.item.status}</td>
                <td>{item.item.accessory_type}</td>
                <td>{item.item.quantity}</td>
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

export default Inventory
