import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MdDelete, MdAdd, MdCancel } from "react-icons/md";
import DOMAIN from '../../config/config'
import style from '../../css/Items.module.css'

const token = localStorage.getItem("token")

const ManageMerchandise = () => {
    const location = useLocation()

    const item = location.state;

    console.log(item)

    const [items, setItems] = useState(item)
    const [isClick, setIsClick] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [itemId, setItemId] = useState(null)

    const [fullname, setFullName] = useState('')
    const [program, setProgram] = useState('')
    const [size, setSize] = useState('')
    const [quantity, setQuantity] = useState(1)

    const [merchandise, setMerchandise] = useState([])


    //   const [errorMessage, setErrorMessage] = useState('')

    const [editingItemId, setEditingItemId] = useState(null);

    const [size_and_quantity, setsize_and_quantity] = useState(item.size_and_quantity)

    console.log("test", size_and_quantity)

    const [merchandiseName, setMerchandiseName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [image, setImage] = useState(null);

    useEffect(() => {
        setErrorMessage('')
    }, [fullname, program, size, quantity])


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

    const handleClick = (item) => {
        setIsClick(!isClick)
        console.log(item._id)
        setItemId(item._id)
    }

    const [errMessage, setErrMessage] = useState('')

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
            const data = await response.json()
            if (!response.ok) {
                console.log(data.message)
                setErrorMessage(data.message)
                return
            }


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

    const handleExitEdit = () => {
        setEditingItemId(null)
        setMerchandiseName('')
        setPrice(0)
        setStock(0)
    }


    const handleEdit = async (item) => {
        setEditingItemId(item._id)
        setMerchandiseName(item.name)
        setPrice(item.price)
        setStock(item.stock)
        console.log(item._id)
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
                body: JSON.stringify({ name: merchandiseName, price, stock, size_and_quantity })
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
            window.history.back();
        } catch (error) {
            console.log(error)
        }
    }

    const removeInputHandle = (index) => {
        setsize_and_quantity((prev) =>
            prev.filter((_, i) => i !== index) // Filter out the item at the specified index
        );
    };

    return (
        <div style={{ width: '70%', margin: "0 auto", display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'whitesmoke' }}>

            <div style={{ width: '90%', backgroundColor: "rgb(255, 187, 0)", padding: '30px', border: '1px solid gray', borderRadius: '5px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button onClick={() => handleEdit(item)} style={{
                        width: '140px', height: '40px', backgroundColor: "#219ebc",
                        color: "#fff",fontSize:'17px',cursor: "pointer", border:'none',borderRadius:'5px'
                    }}>Edit</button>
                    <button onClick={() => handleDelete(item)} style={{
                        width: '140px', height: '40px', backgroundColor: "#219ebc",
                        color: "#fff",fontSize:'17px',cursor: "pointer", border:'none',borderRadius:'5px'
                    }}>Delete</button>
                </div>

                <div style={{ display: 'flex', backgroundColor: '', width: '100%', gap: "30px" }}>

                    <div style={{ backgroundColor: '', padding: '', }}>
                        <img src={item.image.data} height={300} width={300} style={{ border: '1px solid gray' }} />
                    </div>

                    <div style={{ padding: '10px' }}>
                        <div style={{ padding: '10px', marginBottom: '50px' }}>
                            <p style={{ fontSize: '23px', color: 'white' }}>Description: {item.name}</p>
                        </div>

                        <div style={{ padding: '10px', display: 'flex', gap: '10px', marginBottom: '20px' }}>

                            <div>
                                <p style={{ fontSize: '23px', color: 'white' }}> Size & Quantity:</p>
                            </div>

                            {item.size_and_quantity.map((s) => (
                                <div key={s._id} style={{ display: 'grid', backgroundColor: '', padding: '10px', width: "100px" }}>
                                    <p style={{ fontSize: '23px', textAlign: 'center', color: 'white' }}>{s.size}</p>
                                    <p style={{ fontSize: '23px', textAlign: 'center', color: 'white' }}>{s.quantity}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: '10px', marginBottom: '20px' }}>
                            <p style={{ fontSize: '23px', color: 'red', color: 'white' }}>Amount: ₱ {item.price}</p>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <button onClick={() => handleClick(item)} style={{
                                width: '220px', height: '40px', padding: '5px', fontSize:'17px', backgroundColor: "#219ebc",
                                color: "#fff", cursor: "pointer", border:'none',borderRadius:'5px'
                            }}>Create Transaction</button>
                        </div>

                    </div>


                </div>
            </div>






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
                            {item.size_and_quantity.map((i) => (
                                <option key={i._id} value={i.size}>{i.size.toLowerCase()}</option>
                            ))}
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
                    padding: '30px', height: 'auto', width: '500px', gap: '20px', border: '1px solid black', borderRadius: '5px'
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
                        <label htmlFor="stock">Size and Quantity:</label><br />
                        {size_and_quantity.map((s, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-around', gap: '2px' }}>
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
                            style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', marginBottom: "10px" }}
                            onClick={() => addInput()}>Add Input Field</button>

                        {/* <button type="button"
                                 style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }}
                                 onClick={addSize}>Add</button> */}
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
    )
}

export default ManageMerchandise
