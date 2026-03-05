import React, {useState, useEffect} from "react";
import API from '../api';
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import { motion } from "framer-motion";
import * as XLSX from 'xlsx';

const DetailedReport=()=>{
    const [data, setData]=useState([]);
    const [selectedMonth, setSelectedMonth]=useState(new Date().getMonth()+1);
    const [selectedYear, setSelectedYear]=useState(new Date().getFullYear());


    useEffect(()=>{
        API.get('/work-entries/detailed-report').then(res=>setData(res.data));
        fetchReport();
    },[selectedMonth,selectedYear]);

    const handlePrint=()=>{
        window.print();
    };

    const fetchReport=async ()=>{
        try{
            const res=await API.get(`/work-entries/detailed-report?month=${selectedMonth}&year=${selectedYear}`);
            setData(res.data);
        }catch(err){
            console.error("Report fetch error:",err);
        }
    };


    const exportToExcel=()=>{
        const excelData=[];

        data.forEach((worker)=>{
            excelData.push({
                "Worker Name":worker.workerName.toUpperCase(),
                "Date":"", "Item":"", "Quantity":"", "Total":""
            });

            worker.entries.forEach((entry)=>{
                excelData.push({
                    "Worker Name":"",
                    "Date":new Date(entry.date).toLocaleDateString('en-GB'),
                    "Item":entry.itemName,
                    "Quantity":entry.quantity,
                    "Total":entry.total
                });
            });

            excelData.push({
                "Worker Name":"", "Date":"", "Item":"Grand Total",
                "Quantity":"", "Total":worker.grandTotal
            });
            excelData.push({});
        });

        const workSheet=XLSX.utils.json_to_sheet(excelData);
        const workbook=XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, workSheet, "Report");

        XLSX.writeFile(workbook, `Ritika_Report_${selectedMonth}_${selectedYear}.xlsx`);
    };
    return (
        <Container className="mt-4">
            <div className="d-print-none bg-light p-3 mb-4 rounded border">
                <Row className="align-items-center">
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">Select Month</Form.Label>
                            <Form.Control as="select" value={selectedMonth} onChange={(e)=>setSelectedMonth(e.target.value)}>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <Form.Label className="font-weight-bold">Select Year</Form.Label>
                            <Form.Control as="select" value={selectedYear} onChange={(e)=>setSelectedYear(e.target.value)}>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={4} className="text-right mt-3">
                         <Button variant="dark" onClick={handlePrint} className="mb-4 d-print-none">
                            Download/Print PDF
                        </Button>
                        <br/>
                        <Button variant="success" onClick={exportToExcel} className="me-2 d-print-none">
                            Export to Excel
                        </Button>
                    </Col>
                </Row>
            </div>

            <motion.div 
                initial={{opacity:0, y:10}}
                animate={{opacity:1, y:0}}
                transition={{duration:0.5}}>

            {data.map((workerData)=>(
                <div key={workerData._id} className="mb-5 p-3 border bg-white">
                    <h3 className="text-center text-uppercase border-bottom pb-2">
                        {workerData.workerName}
                    </h3>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Amount (Rate)</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workerData.entries.map((entry,index)=>(
                                <tr key={index}>
                                    <td>{new Date(entry.date).toLocaleString('en-GB')}</td>
                                    <td>{entry.itemName || "Item Missing"}</td>
                                    <td>{entry.quantity}</td>
                                    <td>{entry.rate}/-</td>
                                    <td>{entry.total}/-</td>
                                </tr>

                            ))}
                            <tr className="table-secondary font-weight-bold">
                                <td colSpan="4" className="text-right">TOTAL</td>
                                <td>{workerData.grandTotal}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <div className="page-break"></div>
                </div>
            ))}
            </motion.div>
        </Container>
       
    );
     
};


export default DetailedReport;