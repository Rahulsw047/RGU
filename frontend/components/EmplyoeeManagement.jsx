import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Modal, Card } from "react-bootstrap";
import API from '../api';

const EmployeeManagement=()=>{
    const [employees,setEmployees]=useState([]);
    const [showModal, setShowModal]=useState(false);
    const [newEmployee, setNewEmployee]=useState({name:'',phone:''});

    //Data load Karo
    const fetchEmployees=async ()=>{
        try{
            const res=await API.get('/employees');
            setEmployees(res.data);
        }catch(err){
            console.error("Error fetching employees",err);
        }
    };

    useEffect(()=>{
        fetchEmployees();
    },[]);

    //Naya Emplyoee Save Karo
    const handleSave = async (e)=>{
        e.preventDefault();
        try{
            await API.post('/employees',newEmployee);
            setShowModal(false);
            setNewEmployee({name:'',phone:''});
            fetchEmployees();
        }catch(err){
            alert("Error saving employee");
        }
    };

    //Emplyoee Delete Karo
    const handleDelete=async(id)=>{
        if(window.confirm("Are You Delete?")){
            try{
                await API.delete(`/employees/${id}`);
                fetchEmployees();
            }catch(err){
                alert("Error Deleting Employee");
            }
        }
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Employee Management</h2>
                <Button variant="success" onClick={()=>setShowModal(true)}>+ Add New Employee</Button>
            </div>

            <Card className="shadow-sm">
                <Table striped bordered  hover responsive className="mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.length>0?(
                            employees.map(emp=>(
                                <tr key={emp._id}>
                                    <td>{emp.name}</td>
                                    <td>{emp.phone}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={()=>handleDelete(emp._id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))
                        ):(
                            <tr><td colSpan="3" className="text-center">No employees found. Add one!</td></tr>
                        )}
                    </tbody>
                </Table>
            </Card>


            {/* Pop up Form */}
            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group className="mb-3">
                            <Form.Label>Employee Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                onChange={(e)=>setNewEmployee({...newEmployee,name:e.target.value})}/>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e)=>setNewEmployee({...newEmployee,phone:e.target.value})}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Save Employee</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default EmployeeManagement;