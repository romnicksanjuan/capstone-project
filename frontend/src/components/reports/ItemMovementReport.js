import React, { useEffect, useState } from "react";
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
  color: 'black'
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

const ItemMovementReport = () => {


  const [itemTransfer, setItemTransfer] = useState([])
  useEffect(() => {
    const getitemTransfer = async () => {
      try {
        const response = await fetch(`${DOMAIN}/get-item-transfer`, {
          method: 'GET'
        })
        const data = await response.json()
        setItemTransfer(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getitemTransfer()
  }, [])


  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Item Movement Report</h2>
      <table style={tableStyle}>
        <thead style={headerStyle}>
          <tr>
            <th style={thTdStyle}>Date</th>
            <th style={thTdStyle}>Item Name</th>
            <th style={thTdStyle}>From Location</th>
            <th style={thTdStyle}>To Location</th>
            {/* <th style={thTdStyle}>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {itemTransfer.map((item, index) => (
            <tr key={index}>
              <td style={thTdStyle}>{item.date}</td>
              <td style={thTdStyle}>{item.item}</td>
              <td style={thTdStyle}>{item.fromLocation}</td>
              <td style={thTdStyle}>{item.toLocation}</td>
              {/* <td style={thTdStyle}>{item.status}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemMovementReport;
