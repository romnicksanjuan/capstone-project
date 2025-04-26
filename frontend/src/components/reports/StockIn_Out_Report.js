import React, { useEffect, useState } from "react";
import styles from '../reports-css/stockIn_Out.module.css';


import { MdCancel } from "react-icons/md";
import DOMAIN from '../../config/config'
const headerStyle = {
    backgroundColor: "#f2f2f2",
  };
const inventoryData = [
    {
        itemName: "Laptop",
        category: "Electronics",
        location: "IT Department",
        quantity: 12,
        status: "Available",
    },
    {
        itemName: "Printer Ink",
        category: "Consumables",
        location: "Supply Room",
        quantity: 25,
        status: "In Stock",
    },
    {
        itemName: "Ethernet Cable",
        category: "Accessories",
        location: "IT Department",
        quantity: 50,
        status: "In Use",
    },
];



const StockIn_Out_Report = () => {
    const [stockIn_Out, setStockIn_Out] = useState([]) 
  useEffect(() => {
    const getStocks = async() => {
        try {
            const response = await fetch(`${DOMAIN}/get-stock-in-out`,{
                method:'GET'
            })

            const data = await response.json()

            console.log(data)
            setStockIn_Out(data)
        } catch (error) {
            console.log(error)
        }
    }
    getStocks()
  },[]) 
    return (
        <div className={styles.containerStyle}>
         
            <h2 className={styles.titleStyle}>Stock In/Out Report</h2>
            <table className={styles.tableStyle}>
                <thead style={headerStyle}>
                    <tr>
                        <th className={styles.thTdStyle}>Date</th>
                        <th className={styles.thTdStyle}>Item Name</th>
                        <th className={styles.thTdStyle}>Action</th>
                        <th className={styles.thTdStyle}>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {stockIn_Out.map((stocks, index) => (
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
    );
};

export default StockIn_Out_Report;
