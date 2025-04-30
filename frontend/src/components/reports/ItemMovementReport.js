import React, { useEffect, useState, useRef } from "react";
import DOMAIN from "../../config/config";
import { useReactToPrint } from "react-to-print";
import { RiPrinterFill } from "react-icons/ri";
import img from '../../images/ctc-logoo.jpg'
import styles from '../reports-css/ItemMovementReport.module.css';

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
  color: 'black'
};

const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
};

const ItemMovementReport = () => {
  const contentRef = useRef()

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

  // printer
  const reactToPrintFn = useReactToPrint({
    documentTitle: `${new Date()}`,
    contentRef: contentRef,
  });
  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2 style={{ color: "orange", padding: '10px 0' }}>Item Movement Report</h2>
        <div style={{ marginRight: '10px' }}>
          <RiPrinterFill onClick={() => reactToPrintFn()} color='black' size={35} />
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
              <th className={styles.thTdStyle}>Date</th>
              <th className={styles.thTdStyle}>Item Name</th>
              <th className={styles.thTdStyle}>From Location</th>
              <th className={styles.thTdStyle}>To Location</th>
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
    </div>
  );
};

export default ItemMovementReport;
