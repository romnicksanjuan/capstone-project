import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import image from "../images/ctc logo.png"
import { useNavigate } from 'react-router-dom';
import { MdCancel } from "react-icons/md";

import styles from '../css/BorrowedItems.module.css'
import DOMAIN from '../config/config'

const BorrowForm = () => {
    const { sn } = useParams()
    const [item, setItem] = useState({})
    console.log(sn)


    const [error, setError] = useState('')
    const [isClick, setIsClick] = useState(false)

    const [serialNumber, setSerialNumber] = useState('')
    const [brand, setBrand] = useState('')
    const [borrower, setBorrower] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [purpose, setPurpose] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const [showForm, setShowForm] = useState(false)

    const handleRedirect = () => {
        navigate('/add-borrow-item');
    };




    useEffect(() => {
        const handleGetItem = async () => {
            const response = await fetch(`${DOMAIN}/item/${sn}`)
            if (!response.ok) {
                console.log("item not found")
                return;
            }

            const data = await response.json()
            setItem(data)
            setSerialNumber(data.serialNumber)
            console.log(data)
        }

        handleGetItem()
    }, [])


    useEffect(() => {
        const f = () => {
            setError('')
        }
        f()
    }, [serialNumber, borrower, mobileNumber, purpose])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (borrower === '' || mobileNumber === '' || purpose === '') {
            setError('Please fill all field')
            setMessage('')
            return
        }

        try {
            const response = await fetch(`${DOMAIN}/borrow-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ serialNumber, borrower, mobileNumber, purpose })
            })

            const data = await response.json()

            if (!response.ok) {
                setError(data.message)
                throw new Error(response.status);
            }
            setMessage(data.message)
            setError('')

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div style={{
            width: '100%', height: '100vh', margin: '0 auto',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
            <form onSubmit={handleSubmit} style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
                padding: '50px 30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius: '5px'
            }}>
                {error && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: '40px', }}>
                    <p style={{ color: 'white', textAlign: 'center' }}>{error}</p>
                </div>}

                {message && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', height: '40px', }}>
                    <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
                </div>}
                <div>
                    <label htmlFor="serial-number">Serial Number:</label><br />
                    <input className={styles.input} type="text" id="item" name="item" defaultValue={serialNumber} disabled />
                </div>



                <div>
                    <label htmlFor="borrower">Borrower's Name:</label><br />
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
            </form>
        </div>
    )
}

export default BorrowForm
