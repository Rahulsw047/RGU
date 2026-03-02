import React, {useState, useEffect} from "react";
import API from '../api';
import { Table, Button, Container } from "react-bootstrap";

const DetailedReport=()=>{
    const [data, setData]=useState([]);
    const [selectedMonth, setSelectedMonth]=useState(new Date().getMonth()+1);
    const [selectedYear, setSelectedYear]=useState(new Date().getFullYear());


    useEffect(()=>{
        API.get('/work-entries/detailed-report').then(res=>setData(res.data));
    },[]);

    const handlePrint=()=>{
        window.print();
    };

    const fetchReport=async ()=>{
        const res=await API.get(`/work-entries/detailed-report?month=${selectedMonth}&year=${selectedYear}`);
        setReportData(res.data);
    };

    return (
        <Container className="mt-4">
            <Button variant="dark" onClick={handlePrint} className="mb-4 d-print-none">
                Download/Print PDF
            </Button>

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
        </Container>
    );
};


export default DetailedReport;