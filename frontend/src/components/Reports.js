import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import styles from '../css/Dashboard.module.css'
import DOMAIN from '../config/config'
import { useNavigate } from 'react-router-dom'
import Topbar from './Topbar'
import { MdAddBox, MdDelete } from "react-icons/md";
import style from '../css/Request.module.css'
import { RiPrinterFill } from "react-icons/ri";
import { useReactToPrint } from "react-to-print";
import InventorySummaryReport from './reports/InventorySummaryReport'
// const token = localStorage.getItem("token")
import img from '../images/ctc-logoo.jpg'
import StockIn_Out_Report from './reports/StockIn_Out_Report'
import ItemMovementReport from './reports/ItemMovementReport'
import Damage_LostReport from './reports/Damage_LostReport'
import RequestReport from './reports/RequestReport'

function Reports() {
    const [activeSection, setActiveSection] = useState('inventory-report')


  

    return (
        <div style={{ display: 'flex' }}>
            <Navbar />

            <div className={styles.Dashboard}>

                {/* {(role === 'admin' || role === 'dean' || role === 'president') ? <Topbar /> : ''} */}
                <h2 style={{ color: 'orange', textAlign: 'start', margin: "0" }}>Reports</h2>


                <div style={{ display: 'flex', minHeight: "95%", width: "100%", height: 'auto', gap: '20px' }}>
                    <nav style={{ display: 'flex', position: 'relative', padding: '15px', justifyContent: 'center', backgroundColor: 'white', width: "20%", borderRadius: '5px', overflow: 'hidden' }}>
                        <ul style={{ listStyle: 'none', width: '100%', overflow: 'hidden', }}>
                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'inventory-report' ? 'white' : 'black',
                                backgroundColor: activeSection === 'inventory-report' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('inventory-report')}>
                                Inventory Summmary Report
                            </li>

                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'stock-report' ? 'white' : 'black',
                                backgroundColor: activeSection === 'stock-report' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('stock-report')} >
                                Stock In/Out Report
                            </li>

                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'item-report' ? 'white' : 'black',
                                backgroundColor: activeSection === 'item-report' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('item-report')} >
                                Item Movement Report
                            </li>

                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'damage-report' ? 'white' : 'black',
                                backgroundColor: activeSection === 'damage-report' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('damage-report')} >
                                Damage/Lost Items Report
                            </li>

                            <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'request-report' ? 'white' : 'black',
                                backgroundColor: activeSection === 'request-report' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('request-report')} >
                                Request Report
                            </li>

                            {/* <li style={{
                                cursor: 'pointer',
                                color: activeSection === 'item-report' ? 'white' : 'black',
                                backgroundColor: activeSection === 'item-report' ? 'orange' : '',
                                padding: '5px 20px',
                                borderRadius: '5px'
                            }} onClick={() => setActiveSection('item-report')} >
                                Item Movement Report
                            </li> */}
                        </ul>
                    </nav>

                    {/* Main Content */}
                    <div style={{ backgroundColor: 'white', width: '80%', padding: '10px', borderRadius: '5px', color: '#fff' }}>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginRight: "20px" }}>

                            {/* <RiPrinterFill onClick={() => handlePrintClick()} color='black' size={24} /> */}
                        </div>
                        
                        {activeSection === 'inventory-report' ? <InventorySummaryReport /> : ''}
                        {activeSection === 'stock-report' ? <StockIn_Out_Report /> : ''}
                        {activeSection === 'item-report' ? <ItemMovementReport /> : ''}
                        {activeSection === 'damage-report' ? <Damage_LostReport /> : ''}
                        {activeSection === 'request-report' ? <RequestReport /> : ''}
                        {/* {activeSection === 'request-report' ? <RequestReport /> : ''} */}

                        
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Reports
