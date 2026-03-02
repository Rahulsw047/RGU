import React,{useState,useEffect} from "react";
import { Container, Table, Button, Form, Modal,Card } from "react-bootstrap";
import API from "../api";

const ItemManagement=()=>{
    const [items, setItem]=useState([]);
    const [showModal,setShowModal]=useState(false);
    const [newItem,setNewItem]=useState({itemName:'',ratePerPiece:'',});

    const fetchItems=async ()=>{
        try{
            const res=await API.get('/items');
            setItem(res.data);

        }catch(err){
            console.error("Error fetching items",err);
        }
    };

    useEffect(()=>{
        fetchItems();
    },[]);

    const handleSave=async (e)=>{
        e.preventDefault();
        try{
            await API.post('/items',newItem);
            setShowModal(false);
            setNewItem({itemName:'',ratePerPiece:''});
            fetchItems();
        }catch(err){
            alert("Error Saving Item");
        }
    };

    const handleDelete=async(id)=>{
        if(window.confirm("Kya aap sach mein ye entry delete karna chahte hain?")){
            try{
                await API.delete(`/items/${id}`);
                setEntries(entries=>entries.filter(entry=>entry._id!==id));
            }catch(err){
                alert("Delete karne mein error aaya!");
            }
        }
    };

    return(
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Item & Rate Management</h2>
                <Button variant="primary" onClick={()=>setShowModal(true)}>+ Add New Item</Button>
            </div>

            <Card  className="shadow-sm">
                <Table striped bordered hover responsive className="mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>Item Name</th>
                            <th>Rate (Per Piece)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item=>(
                            <tr key={item._id}>
                                <td>{item.itemName}</td>
                                <td>{item.ratePerPiece}/-</td>
                                <td><Button variant="danger" size="sm">Delete</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>

            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton><Modal.Title>Add New Item</Modal.Title></Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group className="mb-3">
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control value={newItem.itemName} type="text" required onChange={(e)=>setNewItem({...newItem,itemName:e.target.value})}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Rate</Form.Label>
                            <Form.Control  value={newItem.ratePerPiece} type="number" required onChange={(e)=>setNewItem({...newItem,ratePerPiece:e.target.value})}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">Save Item</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ItemManagement;