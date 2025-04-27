import React from 'react'
import { useLocation } from 'react-router-dom'
import logo from "../images/ctc-logoo.jpg"

const BorrowedTransaction = () => {
    const location = useLocation()

    const data = location.state || {}
    console.log(data)
    return (
        <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', width: "100%", height: '100vh', backgroundColor: "whitesmoke" }}>
            <div style={{ width: "600px", height: 'auto', backgroundColor: "white", border: '1px solid black', borderRadius: '5px', padding: '20px 10px' }}>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <img src={logo} width={60} height={60} />
                    <h2 style={{ padding: '20px 0 20px 10px' }}>Borrow Transaction Details</h2>
                </div>


                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }} border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>PMS Number</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>Unit</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>Brand</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.serialNumber?.length > 0 ? (
                            data.serialNumber.map((i, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{i.item}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{i.unit}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{i.brand}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{i.quantity}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }} colSpan="3">No items available</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div style={{ padding: '5px 10px', display: 'grid', gap: '10px' }}>
                    
                    {/* <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Category:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.item.category}</p>
                        </div>
                    </div> */}
                    {/* <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Conditon:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.item.condition}</p>
                        </div>
                    </div> */}
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
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Borrower's name:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.borrower}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Department:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.department}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Borrower's Designation:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.borrower_designation}</p>
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

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Quantity:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.quantity}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Condition Before:</p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.status_before}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '50%' }}>
                            <p style={{ fontSize: '19px', whiteSpace: 'pre', fontWeight: 'bold' }}>Condition After:                   </p>
                        </div>
                        <div style={{ width: '50%' }}>
                            <p style={{ color: 'GrayText', fontSize: '19px', }}>{data.status_after}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BorrowedTransaction
