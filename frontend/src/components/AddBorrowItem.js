import React, { useState } from 'react'
import style from '../css/AddBorrowItem.module.css'
import DOMAIN from '../config/config'


const AddBorrowItem = () => {
    const [serialNumber, setSerialNumber] = useState('')
    const [brand, setBrand] = useState('')
    const [borrower, setBorrower] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [purpose, setPurpose] = useState('')
    const [status, setStatus] = useState('')
    // const [quantity, setQuantity] = useState(1)



    // redirect to add borrow item

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${DOMAIN}/add-borrow-item`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ serialNumber, borrower, mobileNumber, purpose })
            })

            const data = await response.json()

           

            if (!response.ok) {
                console.log(data.message)
                throw new Error(response.status);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange',
              padding: '30px 30px 35px 30px', height: 'auto', width: '450px', gap: '20px', border: '1px solid black', borderRadius:'5px'
            }}>


                {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ textAlign: 'end' }} onClick={handleButtonClick}>x</button>
                </div> */}
                <div>
                    <label htmlFor="serial-number">Serial Number:</label><br />
                    <input className={style.input} type="text" id="item" name="item" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
                </div>

                

                <div>
                    <label htmlFor="borrower">Borrower:</label><br />
                    <input className={style.input} type='text' id="borrower" name="borrower" value={borrower} onChange={(e) => setBorrower(e.target.value)} />
                </div>

                <div>
                    <label htmlFor="mobilenumber">Mobile Number:</label><br />
                    <input className={style.input} type='number' id="mobilenumber" name="mobilenumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                </div>

                {/* <div>
                    <label htmlFor="category">Category:</label><br />
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ marginLeft: '10px', marginRight: '10px', height: '30px' }}
                    >
                        <option value="" disabled>
                            -- Choose a Category --
                        </option>
                        <option value="Peripherals">Peripherals</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                </div> */}

                <div>
                    <label htmlFor="purpose">Purpose:</label><br />
                    <input className={style.input} type="text" id="purpose" name="purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                </div>


                {/* <div>
                    <label htmlFor="quantity">Quantity:</label><br />
                    <input className={style.input} type="number" id="quantity" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </div> */}

                <button style={{ height: '35px', width: '100px', fontSize: '15px', borderRadius: '5px', }} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default AddBorrowItem
