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

    // // Form input handle
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    // Form Submit
    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(!items || items.length===0){
            return alert("database me koi item nahi mila!");
        }

        const selectedItem=items.find(i=>i._id.toString()===formData.itemId.toString());
        if(!selectedItem){
            return alert("Item Select Kijiye!");
        }

        const rate=selectedItem.rate||selectedItem.ratePerPiece||0
        const totalAmount=Number(formData.quantity)*Number(rate);

        try{
            const finalData={...formData, totalAmount};
            //console.log("Sending to server:",finalData);

            await API.post('/work-entries',finalData);
             alert("Entry Saved Successfully!");

            
         //   const res=await API.get('/work-entries',finalData);
            setFormData({...formData,quantity:''});
            loadInitialData();
        }catch(err){
            alert("Error Saving Entry:"+err.response?.data?.message);
        }
    };

    //Delete Entry
    const handleDelete=async(id)=>{
        if(window.confirm("Kya aap sach mein ye entry delete karna chahte hain?")){
            try{
                await API.delete(`/work-entries/${id}`);
                setEntries(entries=>entries.filter(entry=>entry._id!==id));
            }catch(err){
                alert("Delete karne mein error aaya!");
            }
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
                        <Form onSubmit={handleSubmit}>
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
                                        <option key={item._id} value={item._id}>{item.itemName}({item.ratePerPiece})</option>
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        entries.map(entry=>(
                                            <tr key={entry._id}>
                                                <td>{entry.employeeId?.name}</td>
                                                <td>{entry.itemId?.itemName}</td>
                                                <td>{entry.quantity}</td>
                                                <td>{new Date(entry.date).toLocaleString('en-IN')}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(entry._id)}>
                                                        Delete
                                                    </button>
                                                </td>
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