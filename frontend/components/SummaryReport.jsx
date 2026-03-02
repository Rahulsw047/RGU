import React ,{useState, useEffect} from 'react';
import API from '../api';
import { Table, Container, Spinner } from 'react-bootstrap';

const SummaryReport=()=>{
    const [summary, setSummary]=useState([]);
    const [loading, setLoading]=useState(true);

    useEffect(()=>{
        fetchSummary();
    },[]);

    const fetchSummary=async()=>{
        try{
            const res=await API.get('/work-entries/summary');
            setSummary(res.data);
            setLoading(false);
        }catch(err){
            console.error("Error fetching summary:", err);
            setLoading(false);
        }
    };

    if(loading){
        return <Spinner animation='border' className='d-block mx-auto mt-5' />;
    }

    return (
        <Container className='mt-4'>
            <h2 className='text-center mb-4'>Worker Wise Summary Report</h2>
            <Table striped bordered hover responsive shadow>
                <thead className='table-dark text-center'>
                    <tr>
                        <th>Worker Name</th>
                        <th>Total Pieces (Qty)</th>
                        <th>Total Payment </th>
                    </tr>
                </thead>
                <tbody className='="text-center'>
                    { summary.map((item)=>(
                            <tr key={item._id}>
                                <td><strong>{item.worker?.name || "Worker Not Found"}</strong></td>
                                <td>{item.totalPieces || 0}</td>
                                <td className='text-success font-weight-bold'>
                                    {typeof item.totalAmount==='number' ? item.totalAmount.toLocaleString('en-IN'):(Number(item.totalAmount)||0).toLocaleString('en-IN')}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </Container>
    );
};

export default SummaryReport;