import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import API from '../api';

const Dashboard=()=>{
    const [stats,setStats]=useState({
        employees: 0,
        items: 0,
        entries: 0
    });

    useEffect(()=>{
        const fetchStats=async ()=>{
            try{
                const empRes=await API.get('/employees');
                const itemRes=await API.get('/items');
                const entryRes=await API.get('/work-entries');

                setStats({
                    employees: empRes.data.length,
                    items: itemRes.data.length,
                    entries: entryRes.data.length
                });
            }catch(err){
                console.error("Data laane me dikkat hui.",err);
            }
        };

        fetchStats();
    },[]);

    return(
        <Container className="mt-4">
            <h2 className="mb-4">Welcome, Admin</h2>

            <Row>
                {/* card 1*/}
                <Col md={4} className="mb-3">
                   <Card className="text-center h-100 shadow-sm p-3">
                    <Card.Body>
                        <h1>icon</h1>
                        <Card.Title>Total Employees</Card.Title>
                        <Card.Text style={{fontSize:'2rem',fontWeight:'bold'}}>
                            {stats.employees}
                        </Card.Text>
                    </Card.Body>
                   </Card>
                </Col>

                 {/* card 2*/}
                <Col md={4} className="mb-3">
                   <Card className="text-center h-100 shadow-sm p-3">
                    <Card.Body>
                        <h1>icon</h1>
                        <Card.Title>Active Item Types</Card.Title>
                        <Card.Text style={{fontSize:'2rem',fontWeight:'bold'}}>
                            {stats.items}
                        </Card.Text>
                    </Card.Body>
                   </Card>
                </Col>

                 {/* card 3*/}
                <Col md={4} className="mb-3">
                   <Card className="text-center h-100 shadow-sm p-3" bg='primary' text='white'>
                    <Card.Body>
                        <h1>icon</h1>
                        <Card.Title className="text-white">Today's Work Entries</Card.Title>
                        <Card.Text style={{fontSize:'2rem',fontWeight:'bold'}}>
                            {stats.entries}
                        </Card.Text>
                    </Card.Body>
                   </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;