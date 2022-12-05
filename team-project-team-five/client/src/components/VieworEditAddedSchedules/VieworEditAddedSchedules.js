import React,{ useState,useEffect } from 'react'
import axios from 'axios'; 
import { Row,Col,Button,Modal } from "react-bootstrap";

import moment from 'moment';

import './VieworEditAddedSchedules.css';

const VieworEditAddedSchedules = () => {

    const ViewArrival = () => {
        console.log("wow1 ")

        const [data, setData] = useState([{airlinename:'',flightnumber:'',departcity:'',departstatecode:'',departtime:'',arrivetime:'',terminalnumber:'',gatenumber:''}]);

        const fetchData = () => {
            fetch(`http://localhost:8000/api/getArriveDataForVieworEdit`)
                .then((response) => response.json())
                .then((actualData) => {
                    setData(actualData);
                    console.log(actualData);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };

        useEffect(() => {
            fetchData();
        }, []);

        const [serachAirlineName,setSerachAirlineName]=useState('');
        const [searchFlightNumber,setSearchFlightNumber]=useState('');
        const [searchDepartingCity,setSearchDepartingCity]=useState('');
        const [searchDepartingStateCode,setSearchDepartingStateCode]=useState('');
        const [searchDepartingTime,setSearchDepartingTime]=useState('');
        const [searchArrivalTime,setSearchArrivalTime]=useState('');
        const [searchTerminalNumber,setSearchTerminalNumber]=useState('');
        const [searchGateNumber,setSearchGateNumber]=useState('');

        const handleClear = () =>{
            setSerachAirlineName('');
            setSearchFlightNumber('');
            setSearchDepartingCity('');
            setSearchDepartingStateCode('');
            setSearchDepartingTime('');
            setSearchArrivalTime('');
            setSearchTerminalNumber('');
            setSearchGateNumber('');
        }

        const [showModal,setShowModal]=useState(false);


        const[arriveid,setArriveid]=useState('');
        const[airlineName,setAirlineName]=useState('');
        const[flightNumber,setFlightNumber]=useState('');
        const[departCity,setDepartCity]=useState('');
        const[departStateCode,setDepartStateCode]=useState('');
        const[departTime,setDepartTime]=useState('');
        const[arriveTime,setArriveTime]=useState('');

        const [showInfoSuccess,setShowInfoSuccess] = useState(false);

        const handleCloseInfoSuccess = () => {
            setShowInfoSuccess(false)
        }
        
        const handleShowInfoSuccess = () => {
            setShowInfoSuccess(true)
        }

        const [showInfoFailure,setShowInfoFailure] = useState(false);
  
        const handleCloseInfoFailure = () => {
            setShowInfoFailure(false)
        }

        const handleShowInfoFailure = () => {
            setShowInfoFailure(true)
        }
            
        const handleEdit = (item) => {
            console.log(item)
            setArriveid(item.arriveid);
            setAirlineName(item.airlinename);
            setFlightNumber(item.flightnumber);
            setDepartCity(item.departcity);
            setDepartStateCode(item.departstatecode);
            setDepartTime(item.departtime.split(":00.000Z")[0]);
            setArriveTime(item.arrivetime.split(":00.000Z")[0]);
            setShowModal(true);
        }

        function handleCloseModal(){
            setShowModal(false);
        }

        const handleSubmitEditChanges = () =>{
            const params={
                "arriveid":arriveid,
                "airlineName":airlineName,
                "flightNumber":flightNumber,
                "departCity":departCity,
                "departStateCode":departStateCode,
                "departTime":departTime,
                "arriveTime":arriveTime
            }
            axios.post('http://localhost:8000/api/editArrivalDetails',params)
                .then(response => {
                    if(response.data==="Success"){
                        handleShowInfoSuccess();
                        fetchData();
                        handleCloseModal();
                        handleClear();
                    }
                    else{
                        handleShowInfoFailure();
                        handleCloseModal();
                    }
                })
        }

        const handleDeleteFlight = () =>{
            console.log(arriveid);
            const params={
                "arriveid":arriveid
            }
            axios.post('http://localhost:8000/api/deleteArrivalFlight',params)
                .then(response=>{
                    if(response.data==="Success"){
                        handleShowInfoSuccess();
                        fetchData();
                        handleCloseModal();
                        handleClear();
                    }
                    else{
                        handleShowInfoFailure();
                        handleCloseModal();
                    }
                })
        }

        const getAirlineName = () => {
            axios.get("http://localhost:8000/user", { withCredentials: true}).then(res => {
              setAirlineName(res.data.role)
            })
        }

        const dynamicSearch = () => {
            // fetchData();
            console.log(data)
            return (data.filter(n=>(
                n.airlinename.toLowerCase().includes(serachAirlineName.toLowerCase()) && 
                n.flightnumber.toLowerCase().includes(searchFlightNumber.toLowerCase()) &&
                n.departcity.toLowerCase().includes(searchDepartingCity.toLowerCase()) && 
                n.departstatecode.toLowerCase().includes(searchDepartingStateCode) &&
                n.departtime.toLowerCase().includes(searchDepartingTime.toLowerCase()) && 
                n.arrivetime.toLowerCase().includes(searchArrivalTime.toLowerCase()) &&
                n.terminalnumber.toLowerCase().includes(searchTerminalNumber.toLowerCase()) && 
                n.gatenumber.toLowerCase().includes(searchGateNumber.toLowerCase())
                )
              )
            )
        }
        
        return (
            <div className='main-box'>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <Row className='input-box for-center'>
                            <Row className='heading-box'>
                                <div>
                                    <strong>
                                        View Arrival Schedules
                                    </strong>
                                </div>
                            </Row>
                            <Row>
                                <Col className="cells">Airline Name</Col>
                                <Col className="cells">Flight Number</Col>
                                <Col className="cells">Departing City</Col>
                                <Col className="cells">Departing State Code</Col>
                                <Col className="cells">Departing Time</Col>
                                <Col className="cells">Arrival Time</Col>
                                <Col className="cells">Terminal Number</Col>
                                <Col className="cells">Gate Number</Col>
                                <Col className="cells">Action</Col>
                            </Row>
                            <Row>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={serachAirlineName} onChange={(e)=>{setSerachAirlineName(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchFlightNumber} onChange={(e)=>{setSearchFlightNumber(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchDepartingCity} onChange={(e)=>{setSearchDepartingCity(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchDepartingStateCode} onChange={(e)=>{setSearchDepartingStateCode(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchDepartingTime} onChange={(e)=>{setSearchDepartingTime(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchArrivalTime} onChange={(e)=>{setSearchArrivalTime(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchTerminalNumber} onChange={(e)=>{setSearchTerminalNumber(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchGateNumber} onChange={(e)=>{setSearchGateNumber(e.target.value);}}/>
                                </Col>
                                <Col>
                                    <button className="the-button clear-btn" onClick={handleClear}>
                                        Clear Search
                                    </button>
                                </Col>
                            </Row>
                            {dynamicSearch().map((item,index)=>(
                                <Row key={index}>
                                    <Col className="cells">{item.airlinename}</Col>
                                    <Col className="cells">{item.flightnumber}</Col>
                                    <Col className="cells">{item.departcity}</Col>
                                    <Col className="cells">{item.departstatecode}</Col>
                                    <Col className="cells">{item.departtime}</Col>
                                    <Col className="cells">{item.arrivetime}</Col>
                                    <Col className="cells">{item.terminalnumber}</Col>
                                    <Col className="cells">{item.gatenumber}</Col>
                                    <Col className="cells">
                                        <button className="the-button edit-btn" onClick={()=>handleEdit(item)}>
                                            Edit
                                        </button>
                                    </Col>
                                </Row>
                            ))}
                        </Row>
                    </Col>
                    <Col md={1}></Col>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit this Flight</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Row className="for-center">
                            <Row className="heading-box">
                                <div>
                                    <strong>
                                        Edit Schedule
                                    </strong>
                                </div>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Airline Name</Col>
                                <Col md={8}>{getAirlineName()}
                                    <input className="input-box-each" type="text" name="airlineName" value={airlineName} onChange={(e)=>{setAirlineName(e.target.value);}} disabled/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Flight No</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="text" name="flightnumber" value={flightNumber} onChange={(e)=>{setFlightNumber(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Departing City</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="text" name="departCity" value={departCity} onChange={(e)=>{setDepartCity(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Departing State Code</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="text" name="departStateCode" value={departStateCode} onChange={(e)=>{setDepartStateCode(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Depart Time</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="datetime-local" name="departTime" max={arriveTime} value={departTime} onChange={(e)=>{setDepartTime(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Arrive Time</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="datetime-local" name="arriveTime" min={departTime} value={arriveTime} onChange={(e)=>{setArriveTime(e.target.value);}}/>
                                </Col>
                            </Row>
                        </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" className="rounded-btn" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="success" className="rounded-btn" onClick={handleSubmitEditChanges}>
                                Confirm Changes
                            </Button>
                        </Modal.Footer>
                        <Modal.Footer>
                            Delete this Flight? 
                            <Button variant="danger" className="rounded-btn" onClick={handleDeleteFlight}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showInfoSuccess} onHide={handleCloseInfoSuccess}>
                        <Modal.Header closeButton>
                            Update Successful
                        </Modal.Header>
                    </Modal>
                    <Modal show={showInfoFailure} onHide={handleCloseInfoFailure}>
                        <Modal.Header closeButton>
                            Update Failed
                        </Modal.Header>
                    </Modal>
                </Row>
            </div>
        )
    }

    const ViewDeparture = () => {

        const [data, setData] = useState([]);

        const fetchData = () => {
            fetch(`http://localhost:8000/api/getDepartDataForVieworEdit`)
                .then((response) => response.json())
                .then((actualData) => {
                    setData(actualData);
                    console.log("in here");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        };

        useEffect(() => {
            fetchData();
        }, []);

        const [serachAirlineName,setSerachAirlineName]=useState('');
        const [searchFlightNumber,setSearchFlightNumber]=useState('');
        const [searchArrivingCity,setSearchArrivingCity]=useState('');
        const [searchArrivingStateCode,setSearchArrivingStateCode]=useState('');
        const [searchDepartingTime,setSearchDepartingTime]=useState('');
        const [searchArrivalTime,setSearchArrivalTime]=useState('');
        const [searchTerminalNumber,setSearchTerminalNumber]=useState('');
        const [searchGateNumber,setSearchGateNumber]=useState('');

        const handleClear = () =>{
            setSerachAirlineName('');
            setSearchFlightNumber('');
            setSearchArrivingCity('');
            setSearchArrivingStateCode('');
            setSearchDepartingTime('');
            setSearchArrivalTime('');
            setSearchTerminalNumber('');
            setSearchGateNumber('');
        }

        function dynamicSearch(){
            return (data.filter(n=>(
                n.airlinename.toLowerCase().includes(serachAirlineName.toLowerCase()) && 
                n.flightnumber.toLowerCase().includes(searchFlightNumber.toLowerCase()) &&
                n.arrivecity.toLowerCase().includes(searchArrivingCity.toLowerCase()) && 
                n.arrivestatecode.toLowerCase().includes(searchArrivingStateCode.toLowerCase()) &&
                n.departtime.toLowerCase().includes(searchDepartingTime.toLowerCase()) && 
                n.arrivetime.toLowerCase().includes(searchArrivalTime.toLowerCase()) &&
                n.terminalnumber.toLowerCase().includes(searchTerminalNumber.toLowerCase()) && 
                n.gatenumber.toLowerCase().includes(searchGateNumber.toLowerCase())
                )
              )
            )
        }

        const [showModal,setShowModal]=useState(false);


        const[departid,setdepartid]=useState('');
        const[airlineName,setAirlineName]=useState('');
        const[flightNumber,setFlightNumber]=useState('');
        const[arriveCity,setArriveCity]=useState('');
        const[arriveStateCode,setArriveStateCode]=useState('');
        const[departTime,setDepartTime]=useState('');
        const[arriveTime,setArriveTime]=useState('');

        const [showInfoSuccess,setShowInfoSuccess] = useState(false);

        const handleCloseInfoSuccess = () => {
            setShowInfoSuccess(false)
        }
        
        const handleShowInfoSuccess = () => {
            setShowInfoSuccess(true)
        }

        const [showInfoFailure,setShowInfoFailure] = useState(false);
  
        const handleCloseInfoFailure = () => {
            setShowInfoFailure(false)
        }

        const handleShowInfoFailure = () => {
            setShowInfoFailure(true)
        }
            
        const handleEdit = (item) => {
            console.log(item)
            setdepartid(item.departid);
            setAirlineName(item.airlinename);
            setFlightNumber(item.flightnumber);
            setArriveCity(item.arrivecity);
            setArriveStateCode(item.arrivestatecode);
            setDepartTime(item.departtime.split(":00.000Z")[0]);
            setArriveTime(item.arrivetime.split(":00.000Z")[0]);
            setShowModal(true);
        }

        function handleCloseModal(){
            setShowModal(false);
        }

        const handleDeleteFlight = () =>{
            const params={
                "departid":departid
            }
            axios.post('http://localhost:8000/api/deleteDepartureFlight',params)
                .then(response=>{
                    if(response.data==="Success"){
                        handleShowInfoSuccess();
                        fetchData();
                        handleCloseModal();
                        handleClear();
                    }
                    else{
                        handleShowInfoFailure();
                        handleCloseModal();
                    }
                })
        }

        const handleSubmitEditChanges = () =>{
            const params={
                "departid":departid,
                "airlineName":airlineName,
                "flightNumber":flightNumber,
                "arriveCity":arriveCity,
                "arriveStateCode":arriveStateCode,
                "departTime":departTime,
                "arriveTime":arriveTime
            }
            axios.post('http://localhost:8000/api/editDepartureDetails',params)
                .then(response => {
                    if(response.data==="Success"){
                        handleShowInfoSuccess();
                        fetchData();
                        handleCloseModal();
                        handleClear();
                    }
                    else{
                        handleShowInfoFailure();
                        handleCloseModal();
                    }
                })
        }

        const getAirlineName = () => {
            axios.get("http://localhost:8000/user", { withCredentials: true}).then(res => {
              setAirlineName(res.data.role)
            })
        }
        
        return (
            <div className='main-box'>
                <Row>
                    <Col md={1}></Col>
                    <Col md={10}>
                        <Row className='input-box for-center'>
                            <Row className='heading-box'>
                                <div>
                                    <strong>
                                        View Departures Schedules
                                    </strong>
                                </div>
                            </Row>
                            <Row>
                                <Col className="cells">Airline Name</Col>
                                <Col className="cells">Flight Number</Col>
                                <Col className="cells">Arriving City</Col>
                                <Col className="cells">Arriving State Code</Col>
                                <Col className="cells">Departing Time</Col>
                                <Col className="cells">Arrival Time</Col>
                                <Col className="cells">Terminal Number</Col>
                                <Col className="cells">Gate Number</Col>
                                <Col className="cells">Action</Col>
                            </Row>
                            <Row>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={serachAirlineName} onChange={(e)=>{setSerachAirlineName(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchFlightNumber} onChange={(e)=>{setSearchFlightNumber(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchArrivingCity} onChange={(e)=>{setSearchArrivingCity(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchArrivingStateCode} onChange={(e)=>{setSearchArrivingStateCode(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchDepartingTime} onChange={(e)=>{setSearchDepartingTime(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchArrivalTime} onChange={(e)=>{setSearchArrivalTime(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchTerminalNumber} onChange={(e)=>{setSearchTerminalNumber(e.target.value);}}/>
                                </Col>
                                <Col className="cells">
                                    <input className='search-box' type="text" value={searchGateNumber} onChange={(e)=>{setSearchGateNumber(e.target.value);}}/>
                                </Col>
                                <Col>
                                    <button className="the-button clear-btn" onClick={handleClear}>
                                        Clear Search
                                    </button>
                                </Col>
                            </Row>
                            {dynamicSearch().map((item,index)=>(
                                <Row key={index}>
                                    <Col className="cells">{item.airlinename}</Col>
                                    <Col className="cells">{item.flightnumber}</Col>
                                    <Col className="cells">{item.arrivecity}</Col>
                                    <Col className="cells">{item.arrivestatecode}</Col>
                                    <Col className="cells">{item.departtime}</Col>
                                    <Col className="cells">{item.arrivetime}</Col>
                                    <Col className="cells">{item.terminalnumber}</Col>
                                    <Col className="cells">{item.gatenumber}</Col>
                                    <Col className="cells">
                                        <button className="the-button edit-btn" onClick={()=>handleEdit(item)}>
                                            Edit
                                        </button>
                                    </Col>
                                </Row>
                            ))}
                        </Row>
                    </Col>
                    <Col md={1}></Col>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit this Flight?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Row className="input-box for-center">
                            <Row className="heading-box">
                                <div>
                                    <strong>
                                        Edit Departure Schedule
                                    </strong>
                                </div>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Airline Name</Col>
                                <Col md={8}>{getAirlineName()}
                                    <input className="input-box-each" type="text" name="airlineName" value={airlineName} onChange={(e)=>{setAirlineName(e.target.value);}} disabled/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Flight No</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="text" name="flightnumber" value={flightNumber} onChange={(e)=>{setFlightNumber(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Arriving City</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="text" name="arriveCity" value={arriveCity} onChange={(e)=>{setArriveCity(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Arriving State Code</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="text" name="arriveStateCode" value={arriveStateCode} onChange={(e)=>{setArriveStateCode(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Depart Time</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="datetime-local" name="departTime" max={arriveTime} value={departTime} onChange={(e)=>{setDepartTime(e.target.value);}}/>
                                </Col>
                            </Row>
                            <Row className="each-row">
                                <Col className="feild-relevant" md={4}>Arrive Time</Col>
                                <Col md={8}>
                                    <input className="input-box-each" type="datetime-local" name="arriveTime" min={departTime} value={arriveTime} onChange={(e)=>{setArriveTime(e.target.value);}}/>
                                </Col>
                            </Row>
                        </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" className="rounded-btn" onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="success" className="rounded-btn" onClick={handleSubmitEditChanges}>
                                Confirm
                            </Button>
                        </Modal.Footer>
                        <Modal.Footer>
                            Delete this Flight? 
                            <Button variant="danger" className="rounded-btn" onClick={handleDeleteFlight}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal show={showInfoSuccess} onHide={handleCloseInfoSuccess}>
                        <Modal.Header closeButton>
                            Update Successful
                        </Modal.Header>
                    </Modal>
                    <Modal show={showInfoFailure} onHide={handleCloseInfoFailure}>
                        <Modal.Header closeButton>
                            Update Failed
                        </Modal.Header>
                    </Modal>
                </Row>
            </div>
        )
    }   

    const [selected,setSelected]=useState('');

    return (
        <div style={{overflowX : 'hidden'}}>
            <Row>
                <Col md={5}></Col>
                <Col md={1}>
                <Button onClick={() => { setSelected('arrivals') }}>Arivals</Button>
                </Col>
                <Col md={1}>
                <Button onClick={() => { setSelected('departures') }}>Departures</Button>
                </Col>
                <Col md={5}></Col>
            </Row>
            <div>
                {(selected==='arrivals')?<ViewArrival />:null}
                {(selected==='departures')?<ViewDeparture />:null}
            </div>
        </div>       
    )
}

export default VieworEditAddedSchedules