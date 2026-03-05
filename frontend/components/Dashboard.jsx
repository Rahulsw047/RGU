import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { color, motion } from 'framer-motion';
import API from '../api';

const Dashboard=()=>{
    const [stats,setStats]=useState({
        totalWokers: 0,
        monthlyEntries: 0,
        totalAmount: 0
    });
    const [loading, setLoading]=useState(true);
   
    // useEffect(()=>{
    //     const fetchStats=async ()=>{
    //         try{
    //             const empRes=await API.get('/employees');
    //             const itemRes=await API.get('/items');
    //             const entryRes=await API.get('/work-entries');

    //             setStats({
    //                 employees: empRes.data.length,
    //                 items: itemRes.data.length,
    //                 entries: entryRes.data.length
    //             });
    //         }catch(err){
    //             console.error("Data laane me dikkat hui.",err);
    //         }
    //     };

    //     fetchStats();
    // },[]);

    // return(
    //     <Container className="mt-4">
    //         <h2 className="mb-4">Welcome, Admin</h2>

    //         <Row>
    //             {/* card 1*/}
    //             <Col md={4} className="mb-3">
    //                <Card className="text-center h-100 shadow-sm p-3">
    //                 <Card.Body>
    //                     <h1>icon</h1>
    //                     <Card.Title>Total Employees</Card.Title>
    //                     <Card.Text style={{fontSize:'2rem',fontWeight:'bold'}}>
    //                         {stats.employees}
    //                     </Card.Text>
    //                 </Card.Body>
    //                </Card>
    //             </Col>

    //              {/* card 2*/}
    //             <Col md={4} className="mb-3">
    //                <Card className="text-center h-100 shadow-sm p-3">
    //                 <Card.Body>
    //                     <h1>icon</h1>
    //                     <Card.Title>Active Item Types</Card.Title>
    //                     <Card.Text style={{fontSize:'2rem',fontWeight:'bold'}}>
    //                         {stats.items}
    //                     </Card.Text>
    //                 </Card.Body>
    //                </Card>
    //             </Col>

    //              {/* card 3*/}
    //             <Col md={4} className="mb-3">
    //                <Card className="text-center h-100 shadow-sm p-3" bg='primary' text='white'>
    //                 <Card.Body>
    //                     <h1>icon</h1>
    //                     <Card.Title className="text-white">Today's Work Entries</Card.Title>
    //                     <Card.Text style={{fontSize:'2rem',fontWeight:'bold'}}>
    //                         {stats.entries}
    //                     </Card.Text>
    //                 </Card.Body>
    //                </Card>
    //             </Col>
    //         </Row>
    //     </Container>
    // );
    const cardData=[
        {title:"Active Workers", value:`${stats.totalWokers}`, color:"#4e73df"},
        {title:"Total Entries (This Month)", value: `${stats.monthlyEntries}`, color:"#1cc88a"},
        {title:"Estimated Payout", value:`${stats.totalAmount}`, color:"#f6c23e"}
    ];
     useEffect(()=>{
        const fetchStats=async()=>{
            try{
                const res=await API.get('/work-entries/stats');
                setStats(res.data);
                setLoading(false);
            }catch(err){
                console.error("Stats load nahi hue:",err);
                setLoading(false);
            }
        };
        fetchStats();
    },[]);
    return (
        <Row className='mt-4'>
            {cardData.map((card,idx)=>(
                <Col md={4} key={idx}>
                    <motion.div
                        initial={{opacity:0,scale:0.9}}
                        animate={{opacity:1,scale:1}}
                        transition={{delay:idx*0.1}}>
                            <Card className='shadow-sm border-left-primary mb-4' style={{borderLeft:`5px solid ${card.color}`}}>
                                <Card.Body>
                                    <div className='text-xs font-weight-bold text-uppercase mb-1' style={{color:card.color}}>
                                        {card.title}
                                    </div>
                                    <div className='h5 mb-0 font-weight-bold text-gray-800'>{card.value}</div>
                                </Card.Body>
                            </Card>
                    </motion.div>
                </Col>
            ))}
        </Row>
    );
  
};

export default Dashboard;