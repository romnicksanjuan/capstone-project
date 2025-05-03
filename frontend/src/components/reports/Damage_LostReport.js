import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import DOMAIN from "../../config/config";
import { useReactToPrint } from "react-to-print";
import { RiPrinterFill } from "react-icons/ri";
import img from '../../images/ctc-logoo.jpg'
import styles from '../reports-css/Damage_LostReport.module.css';

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  textAlign: "center",
};

const thTdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  color: "black",
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

const Damage_LostReport = () => {
  const contentRef = useRef()
  const [damageLost, setDamageLost] = useState([])
   const [filteredData, setFilteredData] = useState([])
      const [targetDate, setTargetDate] = useState('')
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

   useEffect(() => {
        const getDataByDate = () => {
          if (targetDate) {
            const filteredItems = damageLost.filter(item => {
              const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
              return itemDate === targetDate;
            });
    
            setFilteredData(filteredItems);
          } else {
            setFilteredData(damageLost); // Show all if no date selected
          }
        };
    
        getDataByDate();
      }, [targetDate, damageLost]);

  // printer
  const reactToPrintFn = useReactToPrint({
    documentTitle: `${new Date()}`,
    contentRef: contentRef,
  });
  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <h2 style={{ color: "orange", padding: '10px 0' }}>Damage/Lost Items Report</h2>
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
              <th>Item Name</th>
              <th>Issue</th>
              <th>Date Reported</th>
              <th>Remarks</th>
              <th>Quantity</th>
              <th>Action Taken</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td style={thTdStyle}>{item.itemDescription}</td>
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
    </div>
  );
};

export default Damage_LostReport;
