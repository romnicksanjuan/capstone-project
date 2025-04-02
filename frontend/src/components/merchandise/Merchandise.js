import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import style from '../../css/Items.module.css'
import { useNavigate } from 'react-router-dom'
import CreateProduct from './CreateProduct'
import DOMAIN from '../../config/config'
import TopBar from "../Topbar"
import { MdDelete, MdAdd, MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const token = localStorage.getItem("token")
const Merchandise = () => {
  const navigate = useNavigate()
  const [isClick, setIsClick] = useState(false)
  const [merchandise, setMerchandise] = useState([])
  const [itemId, setItemId] = useState(null)

  const [fullname, setFullName] = useState('')
  const [program, setProgram] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  const [errorMessage, setErrorMessage] = useState('')

  const [editingItemId, setEditingItemId] = useState(null);

  const [merchandiseName, setMerchandiseName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [image, setImage] = useState(null);

  const [showForm, setShowForm] = useState(false)



  // Handle image file upload
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // get merchandise
  useEffect(() => {
    const token = localStorage.getItem("token")
    // console.log(token)
    const getMerchandise = async () => {
      const response = await fetch(`${DOMAIN}/get-merchandise`, {
        method: 'GET',
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      if (!response.ok) {
        console.log(response.statusText)
      }

      if (response.statusText === "Unauthorized") {
        // console.log("hayop ka",response.statusText)
        alert("Session Expired, Please Login Again")
        navigate("/")
        return
      }

      const data = await response.json()
      console.log(data)
      setMerchandise(data)
    }
    getMerchandise()
  }, [])

  const handleClick = (item) => {
    setIsClick(!isClick)
    console.log(item._id)
    setItemId(item._id)
  }

  const hanndleSubmit = async (e) => {
    e.preventDefault()

    if (fullname === '' || program === '' || size === '') {
      console.log('All Fields are required!')
      setErrorMessage('All Fields are required!')
      return;
    }

    console.log(fullname)
    console.log(program)
    console.log(size)
    console.log(quantity)

    try {
      const response = await fetch(`${DOMAIN}/purchase-history/${itemId}`, {
        method: 'post',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ fullname, program, size, quantity })
      })

      if (!response.ok) {
        console.log('Error Purchasing Item')
      }

      const data = await response.json()
      console.log(data)
      setIsClick(false)
      setFullName('')
      setProgram('')
      setSize('')
      setQuantity(1)
      alert('Purchase Successfull')
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    setErrorMessage('')
  }, [fullname, program, size, quantity])




  // delete merchandise
  const handleDelete = async (item) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`${DOMAIN}/delete-merchandise/${item._id}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response.ok)
      setMerchandise(prevMerchandise => prevMerchandise.filter(merch => merch._id !== item._id));
      // window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async (item) => {
    setEditingItemId(item._id)
    setMerchandiseName(item.name)
    setPrice(item.price)
    setStock(item.stock)
    console.log(item._id)

  }

  const handleExitEdit = () => {
    setEditingItemId(null)
    setMerchandiseName('')
    setPrice(0)
    setStock(0)
  }


  const handleSubmitEdit = async (e) => {
    e.preventDefault()
    if (!window.confirm('Are you sure you want to update this item?')) return
    try {
      const response = await fetch(`${DOMAIN}/edit-merchandise/${editingItemId}`, {
        method: 'PUT',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: merchandiseName, price, stock })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json()
      console.log(data)

      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const handleButtonClick = () => {
    setShowForm(!showForm)
    setMerchandiseName('')
    setPrice(0)
    setStock(0)
    setImage(null)
  }

  // add product / merchandise item
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append('name', merchandiseName)
    formData.append('price', price)
    formData.append('stock', stock)
    formData.append('image', image)

    try {
      const response = await fetch(`${DOMAIN}/create-product`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      alert('Product added successfully!');
      console.log(response.data);
      window.location.reload()
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ width: '100%', margin: '0 auto', padding: '20px' }}>
        <TopBar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            marginBottom: "10px",
            padding: "5px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#219ebc",
            color: "#fff",
            cursor: "pointer",
            width: '140px',
            fontSize: '15px'
          }}
          onClick={() => handleShowForm()}
        >
          <MdAdd color='white' size={30} />
          Add Product
        </div>


        {showForm ? <form onSubmit={handleSubmit} style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
          padding: '30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
        }}>


          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleButtonClick()} />
          </div>

          <div>
            <label htmlFor="name">Merchandise Name:</label><br />
            <input className={style.input} type="text" value={merchandiseName} onChange={(e) => setMerchandiseName(e.target.value)} />
          </div>

          <div>
            <label htmlFor="price">Price:</label><br />
            <input className={style.input} type='number' value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          {/* <div>
                        <label htmlFor="category">Category:</label><br />
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{ marginLeft: '10px', marginRight: '10px', height: '30px', marginTop: '5px', marginBottom: '10px' }}
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
                    </div> */}

          <div>
            <label htmlFor="stock">Stock:</label><br />
            <input className={style.input} type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>


          <div>
            <label htmlFor="image">Image:</label><br />
            <input className={style.input} type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
          </div>

          {/* <div>
                           <label htmlFor="quantity">Quantity:</label><br />
                           <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                         </div> */}

          <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
        </form> : ''}

        <table className={style.styledTable}>
          <thead>
            <tr>
              {/* <th>Serial No.</th> */}
              <th className={style.image}>Image</th>
              <th>Merchandise Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>
            {/* {data.map((item, index) => (
                             <tr key={index}> */}
            {merchandise.map((item, index) => (
              <tr key={index}>
                {/* <td className={style.serialNumber}>{item.number}</td> */}
                <td className={style.image} onClick={() => handleClick(item)}>
                  <img src={item.image.data} style={{ width: '50px', height: '50px' }} />
                </td>
                <td onClick={() => handleClick(item)}>{item.name}</td>
                <td onClick={() => handleClick(item)}>{item.price}</td>
                <td onClick={() => handleClick(item)}>{item.stock}</td>
                <td style={{ display: "grid", gridTemplateColumns: "repeat(2 ,1fr)", placeItems: 'center', gap: '10px', height: '80px', border: 'none' }}>
                  <MdDelete color='red' size={27} onClick={() => handleDelete(item)} />
                  <FaEdit color='blue' size={27} onClick={() => handleEdit(item)} />
                </td>
              </tr>
            ))}
            {/* ))} */}
          </tbody>

        </table>

        {isClick ? <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
          padding: '35px 30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
        }}>
          < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => setIsClick(!isClick)} />
          <form onSubmit={hanndleSubmit}>
            {errorMessage && <p style={{ fontSize: '17px', padding: '5px', color: 'white', backgroundColor: 'red', textAlign: 'center' }}>{errorMessage}</p>}
            <div>
              <label htmlFor="full-name">Full Name:</label><br />
              <input className={style.input} type="text" value={fullname} id="full-name" name="full-name" onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div>
              <label htmlFor="program">Program:</label><br />
              <input className={style.input} type="text" id="program" value={program} name="program" onChange={(e) => setProgram(e.target.value)} />
            </div>

            <div>
              <label htmlFor="size">Size:</label><br />
              <select id="size" value={size} onChange={(e) => setSize(e.target.value)} style={{ height: '40px', width: 'auto', fontSize: '20px', margin: '10px 0 10px 0' }}>
                <option disabled value="">-- Select Size --</option>
                <option value="Extra Small">Extra Small</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Extra Large">Extra Large</option>
                <option value="2XL">2XL</option>
              </select>
            </div>

            <div>
              <label htmlFor="quantity">Quantity:</label><br />
              <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>


            <div>
              <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
            </div>
          </form>
        </div> : ''}


        {/* edit item form */}
        {editingItemId && (
          <form onSubmit={handleSubmitEdit} style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
            padding: '30px', height: 'auto', width: '400px', gap: '20px', border: '1px solid black', borderRadius: '5px'
          }}>


            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleExitEdit()} />
            </div>

            <div>
              <label htmlFor="merchandise-name">Merchandise Name:</label><br />
              <input className={style.input} type='text' value={merchandiseName} onChange={(e) => setMerchandiseName(e.target.value)} />
            </div>


            <div>
              <label htmlFor="price">Price:</label><br />
              <input className={style.input} type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div>
              <label htmlFor="stock">Stock:</label><br />
              <input className={style.input} type='number' value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>

            {/* <div>
                        <label htmlFor="category">Category:</label><br />
                        <select
                          id="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          style={{ marginLeft: '10px', marginRight: '10px', height: '30px', marginTop: '5px', marginBottom: '10px' }}
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
                      </div> */}



            <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
          </form>
        )}
      </div>
    </ div>
  )
}

export default Merchandise
