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
  const [merchandise, setMerchandise] = useState([])
  const [itemId, setItemId] = useState(null)



  const [errorMessage, setErrorMessage] = useState('')

  const [editingItemId, setEditingItemId] = useState(null);

  const [merchandiseName, setMerchandiseName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [image, setImage] = useState(null);

  const [showForm, setShowForm] = useState(false)

  // size and quantity
  const [size_and_quantity, setsize_and_quantity] = useState([{ size: '', quantity: '' }])
  console.log(size_and_quantity)

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...size_and_quantity];
    updated[index][name] = value;
    setsize_and_quantity(updated);
  };


  const addSize = () => {
    if (size_and_quantity.size && size_and_quantity.quantity) {
      // setSizeList([...sizeList, size_and_quantity]);
      setsize_and_quantity({ size: '', quantity: '' });
    }
  };
  const addInput = () => {
    setsize_and_quantity([...size_and_quantity, { size: '', quantity: '' }]);
  };

  // const removeSize = (index) => {
  //   const newList = sizeList.filter((_, i) => i !== index);
  //   setSizeList(newList);
  // };


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
    formData.append('size_and_quantity', JSON.stringify(size_and_quantity));

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

  const removeInputHandle = (index) => {
    setsize_and_quantity((prev) =>
      prev.filter((_, i) => i !== index) // Filter out the item at the specified index
    );
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
            fontSize: '15px',
            marginBottom:'20px'
          }}
          onClick={() => handleShowForm()}
        >
          <MdAdd color='white' size={30} />
          Add Product
        </div>


        {showForm ? <form onSubmit={handleSubmit} style={{
          zIndex: 1,
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
          padding: '30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
        }}>


          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            < MdCancel style={{ position: "absolute", right: "10px", top: '10px' }} size={27} color='black' onClick={() => handleButtonClick()} />
          </div>

          <div>
            <label htmlFor="name">Description:</label><br />
            <input placeholder='Enter Description' className={style.input} type="text" value={merchandiseName} onChange={(e) => setMerchandiseName(e.target.value)} />
          </div>

          <div>
            <label htmlFor="price">Amount:</label><br />
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
            <label htmlFor="stock">Quantity:</label><br />
            <input className={style.input} type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>

          <div>
            <label htmlFor="stock">Size and Quantity:</label><br />
            {size_and_quantity.map((s, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-around', gap: '2px', }}>
                <input
                  className={style.input}
                  type="text"
                  name="size"
                  placeholder="Size"
                  value={s.size}
                  onChange={(e) => handleChange(index, e)}
                />

                <input
                  className={style.input}
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  value={s.quantity}
                  onChange={(e) => handleChange(index, e)}
                />

                <div style={{ marginTop: '10px' }} onClick={() => removeInputHandle(index)}>
                  <MdDelete color='white' size={30} />
                </div>
              </div>

            ))}

            <button type='button'
              style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }}
              onClick={() => addInput()}>Add Input</button>

            {/* <button type="button"
              style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }}
              onClick={addSize}>Add</button> */}
          </div>


          <div>
            <label htmlFor="image">Item:</label><br />
            <input className={style.input} type="file" accept="image/*" onChange={(e) => handleFileChange(e)} />
          </div>

          {/* <div>
                           <label htmlFor="quantity">Quantity:</label><br />
                           <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                         </div> */}

          <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
        </form> : ''}

        {/* <table className={style.styledTable}>
          <thead>
            <tr>
              <th className={style.image}>Item</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Size & Quantity</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>
            {merchandise.map((item, index) => (
              <tr key={index}>
                <td className={style.image} onClick={() => handleClick(item)}>
                  <img src={item.image.data} style={{ width: '50px', height: '50px' }} />
                </td>
                <td onClick={() => handleClick(item)}>{item.name}</td>
                <td onClick={() => handleClick(item)}>{item.price}</td>
                <td onClick={() => handleClick(item)}>{item.stock}</td>
                <td>
                  {item.size_and_quantity.map((s) => (
                    <div key={s._id}>
                      <td>{s.size ? s.size : ''}</td>
                      <td>{s.quantity ? s.quantity : ''}</td>
                    </div>

                  ))}
                </td>
                <td style={{ display: "grid", gridTemplateColumns: "repeat(2 ,1fr)", placeItems: 'center', gap: '10px', height: '80px', border: 'none' }}>
                  <MdDelete color='red' size={27} onClick={() => handleDelete(item)} />
                  <FaEdit color='blue' size={27} onClick={() => handleEdit(item)} />
                </td>
              </tr>
            ))}
          </tbody>

        </table> */}


        <div style={{ width: "100%", display: 'grid', gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", margin: '0 auto', placeItems: 'center' }}>
          {merchandise.map((item) => (
            <div onClick={() => navigate('/manage-mechandise', { state: item })} key={item._id} style={{ position: 'relative', width: '270px', border: '1px solid gray', height: '370px', backgroundColor: 'white', padding: '10px', }}>
              <div>
                <img src={item.image.data} style={{ width: '100%', height: 'auto' }} />
              </div>

              <div style={{
                wordWrap: 'break-word', marginBottom: '30px', overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,  // Limits to 2 lines
                textOverflow: 'ellipsis'
              }}>
                <p style={{ fontSize: '20px' }}>{item.name}</p>
              </div>
              <div style={{ wordWrap: 'break-word', display: 'flex', justifyContent: 'start', position: 'absolute', bottom: '0', paddingBottom: '5px' }}>
                <p style={{ fontSize: '20px', color: 'red' }}>₱ {item.price}</p>
              </div>

            </div>
          ))}
        </div>





      </div>
    </ div>
  )
}

export default Merchandise
