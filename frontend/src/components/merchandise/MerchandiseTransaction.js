import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from "../../images/ctc-logoo.jpg"

const MerchandiseTransaction = () => {
    const location = useLocation()

    const data = location.state || {}
    console.log(data)
    return (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: "100%", height: '100vh', backgroundColor: "whitesmoke" }}>
            <div style={{ width: "500px", height: '550px', backgroundColor: "white", border: '1px solid black', borderRadius: '5px', padding: '20px 10px' }}>

                <div style={{display:'flex',alignItems:'center',marginBottom:'15px'}}>
                    <img src={logo} width={70} height={70} />
                    <h2 style={{ padding: '20px 0 20px 10px' }}>Merchandise Transaction Details</h2>
                </div>
                <div style={{ padding: '5px 10px', display: 'grid', gap: '15px' }}>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Merchandise Name:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.merchandise.name}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Price:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.merchandise.price}</p>
                        </div>
                    </div>


                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Full Name:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.fullname}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Program:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.program}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Purchase Date:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.purchaseDate}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Quantity:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.quantity}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Size:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.size}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MerchandiseTransaction
