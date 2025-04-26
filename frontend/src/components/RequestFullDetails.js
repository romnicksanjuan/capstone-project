import React from 'react'
import { useLocation } from 'react-router-dom';


const RequestFullDetails = () => {
    const location = useLocation();
    const request = location.state?.request;
    console.log(request)
    if (!request) return null;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
            <div style={{ width: '50%', padding: '20px', backgroundColor: 'orange' }}>
                <h2 style={{ color: 'black' }}>Request Full Details</h2>
            <p style={{ color: 'black' }}>Requester Name: <span>{request.requestedBy}</span></p>
            <p style={{ color: 'black' }}>Department: <span>{request.department}</span></p>
            <p style={{ color: 'black' }}>Purpose: <span>{request.purpose}</span></p>
            <table
                border="1"
                cellPadding="10"
                style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}
            >
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {request.quantity_and_materials.map((request, index) => (
                        <tr key={index}>
                            <td>{request.materials}</td>
                            <td>{request.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <p style={{ color: 'black' }}>Endorsed By Dean: <span>{request.deanApproval}</span></p>
            <p style={{ color: 'black' }}>Status: <span>{request.presidentApproval}</span></p>
        </div>
        </div >
    )
}

export default RequestFullDetails
