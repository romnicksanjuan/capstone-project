import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import Topbar from './Topbar'
// const token = localStorage.getItem("token")

function RequestItems() {
    const [activeSection, setActiveSection] = useState('')
    const [role, setRole] = useState(null)

    useEffect(() => {
        const role = localStorage.getItem('role')
        setRole(role)
    }, [])

    if (role === null) {
        return null
    }
    return (
        <div style={{ display: 'flex' }}>
            <Navbar />


            <div className={styles.Dashboard}>

            {/* {(role === 'admin' || role === 'dean' || role === 'president') ? <Topbar /> : ''} */}
                <h2 style={{ color: 'orange', textAlign: 'start', margin: "0" }}>Request Items</h2>


                <div style={{ display: 'flex',minHeight:"90%", width: "100%", height: 'auto', gap: '20px' }}>
                    <nav style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', width: "20%", borderRadius: '5px' }}>
                        <ul style={{ listStyle: 'none', padding: '15px', }}>
                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'profile_information' ? 'white' : 'black',
                                backgroundColor: activeSection === 'profile_information' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('test')}>
                                Test
                            </li>
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div style={{ backgroundColor: 'white', width: '80%', padding: '10px', borderRadius: '5px', color: '#fff' }}>
                        {activeSection === 'test' &&
                            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto', color: 'black', }}>

                                {/* Dep/Lab/Room */}
                                <div style={{ backgroundColor: "white", minWidth: '45%', padding: "10px", padding: "20px", border: '1px solid #999' }}>
                                    <h3 style={{ textAlign: 'center' }}>CEGUERA</h3>
                                    <h5 style={{ textAlign: 'center' }}>Technological Colleges</h5>
                                    <h5 style={{ textAlign: 'center', }}>Iriga Philippines</h5>
                                    <h3 style={{ textAlign: 'center' }}>REQUEST FOR MATERIALS</h3>

                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <label style={{}}>Date:</label>
                                        <input type="date" style={{
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px'
                                        }} />
                                    </div>


                                    {/* purpose */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <label style={{ fontWeight: 'bold' }}>Dep/Lab/Room:</label>
                                        <input type="text" style={{
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px',
                                            width: "100%"
                                        }} />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <label style={{ fontWeight: 'bold' }}>Purpose:</label>
                                        <input type="text" style={{
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px',
                                            width: "100%"
                                        }} />
                                    </div>



                                    {/* check boxes */}
                                    <div style={{ display: 'flex', justifyContent: "space-around", marginTop: '5px' }}>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }} />
                                            <label>Fabrication </label>
                                        </div>

                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }} />
                                            <label>Repair </label>
                                        </div>

                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }} />
                                            <label>Replacement </label>
                                        </div>

                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <input type='checkbox' style={{ transform: 'scale(1.2)', }} />
                                            <label>Additional </label>
                                        </div>
                                    </div>

                                    {/* others */}
                                    <div style={{ display: 'flex', marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Others: </label>
                                        <input type='text'
                                            style={{
                                                border: 'none',
                                                borderBottom: '1px solid black',
                                                outline: 'none', // optional: removes blue outline on focus
                                                paddingLeft: '5px',
                                                fontSize: '15px',
                                                width: "100%"
                                            }} />
                                    </div>

                                    {/* table request */}
                                    <table border="1" style={{ width: "100%", marginTop: '10px', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ border: '1px solid black' }}>Quantity</th>
                                                <th style={{ border: '1px solid black' }}>Materials</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...Array(10)].map((_, index) => (
                                                <tr key={index}>
                                                    <td style={{ border: '1px solid black', width: '20%' }}>
                                                        <input type="number" name={`quantity-${index}`} style={{ width: '100%', outline: "none", border: "none", paddingLeft: "10px" }} />
                                                    </td>
                                                    <td style={{ border: '1px solid black' }}>
                                                        <input type="text" name={`materials-${index}`} style={{ width: '100%', outline: "none", border: "none", paddingLeft: "10px" }} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* requested by */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Requested By:</label>
                                        <input type="text" style={{
                                            border: 'none',
                                            borderBottom: '1px solid black',
                                            outline: 'none', // optional: removes blue outline on focus
                                            paddingLeft: '5px',
                                            fontSize: '15px',
                                            width: "50%"
                                        }} />
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'flex-start', gap: "10px", alignItems: 'center', marginTop: '10px' }}>
                                        <label style={{ fontWeight: 'bold' }}>Status:</label>
                                        <p style={{ color: "white", backgroundColor: 'orange', padding: "5px 10px" }}>Pending</p>
                                    </div>



                                </div>
                            </div>
                        }


                    </div>
                </div>

            </div>

        </div>

    )
}

export default RequestItems
