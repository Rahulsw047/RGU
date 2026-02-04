import React, {useState, useEffect} from "react";
import { Container, Row, Col, Form, Button, Table, Card } from "react-bootstrap";
import API from "../api";

const WorkEntry=()=>{
    // states
    const [employees, setEmployees]=useState([]);
    const [items, setItems]=useState([]);
    const [entries, setEntries]=useState([]);
    const [formData, setFormData]=useState({
       employeeId:'',
       itemId:'',
       quantity:'',
       date: new Date().toISOString().split('T')[0]//todyas date default 
    });

    useEffect(()=>{
        const loadInitialData= async()=>{
            try{
                const [empRes, itemRes, entryRes]=await Promise.all([
                    API.get('/employees'),
                    API.get('/items'),
                    API.get('/work-entries')
                ]);
                setEmployees(empRes.data);
                setItems(itemRes.data);
                setEntries(entryRes.data);
            }catch(err){
                console.error("data load karne me error:",err);
            }
        };
        loadInitialData();
    },[]);

    // Form input handle
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    // Form Submit
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            await API.post('/work-entries',formData);
            alert("Entry Saved Successfully!");

            setFormData({...formData,quantity:''});
            const res=await API.get('/work-entries');
            setEntries(res.data);
        }catch(err){
            alert("Error Saving Entry:"+err.response?.data?.message);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Daily Work Entry</h2>
            <Row>
                {/* Left Side */}
                <Col md={5} className="mb-4">
                   <Card className="shadow-sm p-3">
                      <Card.Body>
                        <Card.Title className="mb-3">Add New Entry</Card.Title>
                        <Form>
                            {/* Employee Select */}
                            <Form.Group className="mb-3">
                                <Form.Label>Select Employee</Form.Label>
                                <Form.Select name="employeeId" onChange={handleChange} required>
                                    <option value="">Choose...</option>
                                    {employees.map(emp=>(
                                        <option key={emp._id} value={emp._id}>{emp.name}</option>
                                    ))
                                    }
                                </Form.Select>
                            </Form.Group>

                            {/* Item Select */}
                            <Form.Group className="mb-3">
                                <Form.Label>Select Item</Form.Label>
                                <Form.Select name="itemId" onChange={handleChange} required>
                                    <option value="">Choose...</option>
                                    {items.map(item=>(
                                        <option key={item._id} value={item._id}>{item.name}({item.rate})</option>
                                    ))
                                    }
                                </Form.Select>
                            </Form.Group>

                            {/* Quantity Input */}
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Enter Quantity" min="1" required/>
                            </Form.Group>

                            {/* Date Input */}
                            <Form.Group className="mb-4">
                                <Form.Label>Date</Form.Label>
                                <Form.Control 
                                   type="date"
                                   name="date"
                                   value={formData.date}
                                   onChange={handleChange}
                                />
                            </Form.Group>

                            {/* Submit Button */}
                            <Button variant="primary" type="submit" className="w-100">
                                Save Entry
                            </Button>
                        </Form>
                      </Card.Body>
                   </Card>
                </Col>

                {/* Right Side */}
                <Col md={7}>
                    <Card className="shadow-sm">
                        <Card.Header bg="light" as="h5">Today's Entries</Card.Header>
                        <Card.Body className="p-0">
                            <Table striped bordered hover responsive className="mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th>Employee</th>
                                        <th>Item</th>
                                        <th>Qty</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        entries.map(entry=>(
                                            <tr key={entry._id}>
                                                <td>{entry.employeeId?.name}</td>
                                                <td>{entry.itemId?.name}</td>
                                                <td>{entry.quantity}</td>
                                                <td>{entry.totalAmount}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default WorkEntry;