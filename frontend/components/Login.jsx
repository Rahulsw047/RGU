import React, {useState} from "react";
import {Form, Button, Container, Card} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import API from '../api';

const Login=()=>{
    const [credentials, setCredentials]=useState({username:'', password:''});
    const navigate=useNavigate();

    const handleLogin=async (e)=>{
        e.preventDefault();
        try{
            const res=await API.post('/auth/login',credentials);

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            alert(`Welcome back,${res.data.user.username}!`);
            navigate('/dashboard');
            window.location.reload();
        }catch(err){
            alert("Login Failed:"+(err.response?.data?.message || "Error"));
        }
    };

    return(
        <Container className="d-flex justify-content-center align-items-center" style={{height:'80vh'}}>
            <Card style={{width:'400px'}} className="shadow p-4">
                <h3 className="text-center mb-4">Admin Login</h3>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e)=>setCredentials({...credentials,username:e.target.value})}
                            required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={(e)=>setCredentials({...credentials,password:e.target.value})}
                            required/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">Login</Button>
                </Form>
            </Card>
        </Container>
    );
};

export default Login;