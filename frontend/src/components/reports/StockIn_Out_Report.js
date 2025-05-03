import React, { useEffect, useState, useRef } from "react";
import styles from '../reports-css/stockIn_Out.module.css';
import { useReactToPrint } from "react-to-print";
import { RiPrinterFill } from "react-icons/ri";
import img from '../../images/ctc-logoo.jpg'

import { MdCancel } from "react-icons/md";
import DOMAIN from '../../config/config'
const headerStyle = {
    backgroundColor: "#f2f2f2",
};


const StockIn_Out_Report = () => {
    const contentRef = useRef()
    const [targetDate, setTargetDate] = useState('')
    const [stockIn_Out, setStockIn_Out] = useState([])
    const [filteredData, setFilteredData] = useState([])
    useEffect(() => {
        const getStocks = async () => {
            try {
                const response = await fetch(`${DOMAIN}/get-stock-in-out`, {
                    method: 'GET'
                })

                const data = await response.json()

                console.log(data)
                setStockIn_Out(data)
            } catch (error) {
                console.log(error)
            }
        }
        getStocks()
    }, [])

    useEffect(() => {
        const getDataByDate = () => {
            if (targetDate) {
                const filteredItems = stockIn_Out.filter(item => {
                    const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
                    return itemDate === targetDate;
                });

                setFilteredData(filteredItems);
            } else {
                setFilteredData(stockIn_Out); // Show all if no date selected
            }
        };

        getDataByDate();
    }, [targetDate, stockIn_Out]);


    // printer
    const reactToPrintFn = useReactToPrint({
        documentTitle: `${new Date()}`,
        contentRef: contentRef,
    });
    return (
        <div className={styles.containerStyle}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ color: "orange", padding: '10px 0' }}>Stock In/Out Report</h2>
                <div style={{ marginRight: '10px' }}>
                    <RiPrinterFill onClick={() => reactToPrintFn()} color='black' size={35} />
                </div>

                <div>
                    <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        style={{
                            padding: '8px 12px',
                            fontSize: '16px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            outline: 'none',
                        }}
                    />
                </div>

            </div>

            <div ref={contentRef}>
                <div className={styles.header}>
                    <img src={img} width={100} height={100} />
                    <h4>Ceguera Technological Colleges</h4>
                </div>
                <table className={styles.styledTable}>
                    <thead>
                        <tr>
                            {/* <th>Serial No.</th> */}
                            {/* <th>PMS Number</th>
                                            <th>Unit</th> */}
                            {/* <th>Brand</th> */}
                            <th className={styles.thTdStyle}>Date</th>
                            <th className={styles.thTdStyle}>Item Name</th>
                            <th className={styles.thTdStyle}>Action</th>
                            <th className={styles.thTdStyle}>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredData.map((stocks, index) => (
                            <tr key={index}>
                                <td className={styles.thTdStyle}>{stocks.date}</td>
                                <td className={styles.thTdStyle}>{stocks.itemName}</td>
                                <td className={styles.thTdStyle}>{stocks.action}</td>
                                <td className={styles.thTdStyle}>{stocks.quantity}</td>
                                {/* <td className={styles.thTdStyle}>{stocks.status}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default StockIn_Out_Report;
