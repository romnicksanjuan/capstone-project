import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import image from "../images/ctc logo.png"
import { useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";

import styles from '../css/BorrowedItems.module.css'
import DOMAIN from '../config/config'
import { MdDelete } from "react-icons/md";

const BorrowForm = ({ request }) => {

    console.log('request:', request)
    // const { sn } = useParams()
    const [item, setItem] = useState({})
    // console.log(form)
    //  const [isShowForm, setIsShowForm] = useState(form)

    const [error, setError] = useState('')
    const [isClick, setIsClick] = useState(false)

    const [PMSNumber, setPMSNumber] = useState([{ item: '', quantity: '' }])
    const [brand, setBrand] = useState('')
    const [borrower, setBorrower] = useState(request.requestedBy)
    const [quantity, setQuantity] = useState('')
    const [mobileNumber, setMobileNumber] = useState(request.requesterData.phoneNumber)
    const [purpose, setPurpose] = useState(request.purpose)
    const [department, setDepartment] = useState(request.requesterData.department)
    const [borrowerDesignation, setBorrowerDesignation] = useState(request.requesterData.designation)
    const [toLocation, setToLocation] = useState(request.toLocation)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    // const [showForm, setShowForm] = useState(isShowForm)

    const handleRedirect = () => {
        navigate('/add-borrow-item');
    };




    // useEffect(() => {
    //     const handleGetItem = async () => {
    //         const response = await fetch(`${DOMAIN}/item/`)
    //         if (!response.ok) {
    //             console.log("item not found")
    //             return;
    //         }

    //         const data = await response.json()
    //         setItem(data)
    //         setSerialNumber(data.serialNumber)
    //         console.log(data)
    //     }

    //     handleGetItem()
    // }, [])


    useEffect(() => {
        const f = () => {
            setError('')
        }
        f()
    }, [borrower, mobileNumber, purpose])

    const handleSubmit = async (e) => {
        e.preventDefault()

        // console.log(serialNumber)
        // return

        // if (borrower === '' || mobileNumber === '' || purpose === '', borrowerDesignation === '', department === '', quantity === '') {
        //     setError('Please fill all field')
        //     setMessage('')
        //     return
        // }

        try {
            const response = await fetch(`${DOMAIN}/borrow-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ PMSNumber, borrower, mobileNumber, purpose, department, borrowerDesignation, quantity, toLocation })
            })
            const data = await response.json()

            if (!response.ok) {
                setError(data.message)
                setMessage('')
                throw new Error(response.status);
            }
            setMessage(data.message)
            setError('')

        } catch (error) {
            console.log(error)
        }
    }



    const handleItemChange = (e, field, index) => {
        const updatedItems = [...PMSNumber];
        updatedItems[index][field] = e.target.value;
        setPMSNumber(updatedItems);
    };

    const handleAddItem = () => {
        setPMSNumber([...PMSNumber, { item: '', quantity: '' }]);
    };

    const deleteField = (index) => {
        setPMSNumber(PMSNumber.filter((_, i) => i !== index))
    }


    return (
        <form onSubmit={handleSubmit} style={{
            // position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
            backgroundColor: 'orange',
            // padding: '20px 30px',
            //  height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
        }}>
            {/* <MdCancel size={25} color='black' onClick={() => setIsShowForm(!isShowForm)}/> */}
            {error && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: '40px', }}>
                <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>
            </div>}

            {message && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', height: '40px', }}>
                <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
            </div>}
            <h2 style={{ marginBottom: '10px' }}>Create Transaction</h2>

            <div>
                {PMSNumber.map((item, index) => (
                    <div key={index} style={{ display: 'flex', marginBottom: '10px', justifyContent: 'center', alignItems: 'center' }}>
                        <div>
                            {/* <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                                  Quantity:
                                              </label> */}
                            <input
                                type="text"
                                placeholder="PMS Number"
                                value={item.item}
                                onChange={(e) => handleItemChange(e, 'item', index)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                                required
                            />
                        </div>


                        <div>
                            {/* <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
                                                  Materials:
                                              </label> */}
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(e, 'quantity', index)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                }}
                                required
                            />
                        </div>

                        <MdDelete size={20} color='black' onClick={() => deleteField(index)} />
                    </div>
                ))}

                <button style={{ padding: '3px 5px' }} type='button' onClick={handleAddItem}>Add Field</button>
            </div>



            <div>
                <label htmlFor="borrower">Borrower's Name:</label><br />
                <input className={styles.input} type='text' id="borrower" name="borrower" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
            </div>


            <div>
                <label htmlFor="borrower">Borrower's Designation:</label><br />
                <input className={styles.input} type='text' id="borrower" name="borrower" value={borrowerDesignation} onChange={(e) => setBorrowerDesignation(e.target.value)} />
            </div>

            <div>
                <label htmlFor="department">Department:</label><br />
                <input className={styles.input} type='text' id="department" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>

            <div>
                <label htmlFor="mobilenumber">Mobile Number:</label><br />
                <input className={styles.input} type='number' id="mobilenumber" name="mobilenumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div>

            <div>
                <label htmlFor="purpose">Purpose:</label><br />
                <input className={styles.input} type="text" id="purpose" name="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
            </div>

            <div>
                <label htmlFor="to-location">To Location:</label><br />
                <input className={styles.input} type="text" id="to-location" name="to-location" value={toLocation} onChange={(e) => setToLocation(e.target.value)} />
            </div>

            {/* <div>
                <label htmlFor="quantity">Quantity:</label><br />
                <input className={styles.input} type="text" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div> */}


            {/* <div>
                       <label htmlFor="quantity">Quantity:</label><br />
                       <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                   </div> */}

            <button style={{ height: '40px', width: '100%', border: 'none', fontSize: '20px', borderRadius: '5px', }} type="submit">Submit</button>
        </form>
    )
}

export default BorrowForm
