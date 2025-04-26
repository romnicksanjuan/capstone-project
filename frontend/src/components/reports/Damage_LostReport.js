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
  color: "black",
  color:'black'
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

const Damage_LostReport = () => {
  const [damageLost, setDamageLost] = useState([])
  useEffect(() => {
    const getDamageLost = async () => {
      try {
        const response = await fetch(`${DOMAIN}/get-damage-lost`, {
          method: 'GET'
        })
        const data = await response.json()
        setDamageLost(data)
      } catch (error) {
        console.log(error)
      }
    }
    getDamageLost()
  }, [])


  return (
    <div style={containerStyle}>

      <h2 style={titleStyle}>Damage/Lost Items Report</h2>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thTdStyle}>Item Name</th>
            <th style={thTdStyle}>Issue</th>
            <th style={thTdStyle}>Date Reported</th>
            <th style={thTdStyle}>Remarks</th>
            <th style={thTdStyle}>Quantity</th>
            <th style={thTdStyle}>Action Taken</th>
          </tr>
        </thead>
        <tbody>
          {damageLost.map((item, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{item.unit}</td>
              <td style={thTdStyle}>{item.issue}</td>
              <td style={thTdStyle}>{item.dateReported}</td>
              <td style={thTdStyle}>{item.remarks}</td>
              <td style={thTdStyle}>{item.quantity}</td>
              <td style={thTdStyle}>{item.actionTaken}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Damage_LostReport;
