import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from "../images/ctc-logoo.jpg"

const BorrowedTransaction = () => {
    const location = useLocation()

    const data = location.state || {}
    console.log(data)
    return (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: "100%", height: '100vh', backgroundColor: "whitesmoke" }}>
            <div style={{ width: "600px", height: '600px', backgroundColor: "white", border: '1px solid black', borderRadius: '5px', padding: '20px 10px' }}>

                <div style={{display:'flex',alignItems:'center',marginBottom:'20px'}}>
                    <img src={logo} width={60} height={60} />
                    <h2 style={{ padding: '20px 0 20px 10px' }}>Borrow Transaction Details</h2>
                </div>
                <div style={{ padding: '5px 10px', display: 'grid', gap: '15px' }}>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Serial Number:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.item.serialNumber}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Unit:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.item.unit}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Brand:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.item.brand}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Category:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.item.category}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Conditon:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.item.condition}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Date Returned:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.dateReturned}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Status:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.action}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Borrower:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.borrower}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Mobile Number:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.mobileNumber}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Purpose:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.purpose}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowedTransaction
