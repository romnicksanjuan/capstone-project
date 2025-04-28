import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DOMAIN from "../../config/config";

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

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
};

const thTdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  color: "black"
};

const headerStyle = {
  backgroundColor: "#f2f2f2",
};

const titleStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
  color:'black'
};

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const InventorySummaryReport = () => {

  const [inventoryReport, setInventoryReport] = useState([])
  useEffect(() => {
    const getInventorySummary = async() =>  {
      try {
        const response = await fetch(`${DOMAIN}/get-inventory-summary`,{
          method:'GET'
        })

        const data = await response.json()
        setInventoryReport(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    getInventorySummary()
  },[])
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Inventory Summary Report</h2>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thTdStyle}>Item Name</th>
            <th style={thTdStyle}>Category</th>
            <th style={thTdStyle}>Location</th>
            <th style={thTdStyle}>Quantity</th>
            <th style={thTdStyle}>Condition</th>
          </tr>
        </thead>
        <tbody>
          {inventoryReport.map((item, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{item.itemDescription}</td>
              <td style={thTdStyle}>{item.category}</td>
              <td style={thTdStyle}>{item.location}</td>
              <td style={thTdStyle}>{item.quantity}</td>
              <td style={thTdStyle}>{item.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventorySummaryReport;
