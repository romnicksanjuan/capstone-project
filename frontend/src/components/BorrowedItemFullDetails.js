import React from 'react'
import { useLocation } from 'react-router-dom';

const BorrowedItemFullDetails = () => {
    const location = useLocation();
    const { item } = location.state;
    console.log(item)

    console.log(item.action)
    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', maxWidth: '800px', margin: 'auto', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }} border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>PMS Number</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>Item Description</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>Brand</th>
                            <th style={{ backgroundColor: 'orange', color: 'white', padding: '10px', textAlign: 'center' }}>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item?.PMSNumber?.length > 0 ? (
                            item.PMSNumber.map((i, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{i.item}</td>
                                    <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #ddd' }}>{i.itemDescription}</td>
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

                <div style={{ marginTop: '20px' }}>
                    <h4 style={{ margin: '8px 0', fontWeight: 'normal', fontSize:'17px' }}>Borrower's Name: <span style={{ fontWeight: 'bold', color: '#333' }}>{item.borrower}</span></h4>
                    <h4 style={{ margin: '8px 0', fontWeight: 'normal', fontSize:'17px' }}>Department: <span style={{ fontWeight: 'bold', color: '#333' }}>{item.department}</span></h4>
                    <h4 style={{ margin: '8px 0', fontWeight: 'normal', fontSize:'17px' }}>Borrower's Designation: <span style={{ fontWeight: 'bold', color: '#333' }}>{item.borrower_designation}</span></h4>
                    <h4 style={{ margin: '8px 0', fontWeight: 'normal', fontSize:'17px' }}>Mobile Number: <span style={{ fontWeight: 'bold', color: '#333' }}>{item.mobileNumber}</span></h4>
                    <h4 style={{ margin: '8px 0', fontWeight: 'normal', fontSize:'17px' }}>Purpose: <span style={{ fontWeight: 'bold', color: '#333' }}>{item.purpose}</span></h4>
                    <h4 style={{ margin: '8px 0', fontWeight: 'normal', fontSize:'17px' }}>Date Borrowed: <span style={{ fontWeight: 'bold', color: '#333' }}>{item.dateBorrowed}</span></h4>
                </div>
            </div>
        </div>
    )
}

export default BorrowedItemFullDetails
