import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Button, Modal, Form, OverlayTrigger, Tooltip, Col, Row, ModalHeader, Container,Table, Dropdown,DropdownButton } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


import './AssignBaggage.css'

const withQuery = require('with-query');

const AssignBaggage = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`http://localhost:8000/api/getBaggageInfo`)
      .then((response) => response.json())
      .then((actualData) => {
        setData(actualData);
        // console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [dataGate, setDataGate] = useState([{
    airlinename:'a',
    flightnumber:'a',
    arrivetime:'a',
    terminalnumber:'a',
    gatenumber:'a'
  }]);

  const [dataForAssign,setDataForAssign] = useState([]);

  const fetchDataForAssign = () => {
    fetch(`http://localhost:8000/api/getAssignableFlights`)
    .then((response)=> response.json())
    .then((actualData)=> {
      setDataForAssign(actualData);
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }

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

  const [showArchive, setShowArchive] = useState(false);
  const [tno, setTno] = useState(null);
  const [bno, setBno] = useState(null);
  const handleCloseArchive = () => {
    setShowArchive(false)
    setTno(null);
    setBno(null);
  };
  function handleShowArchive(tno,bno){
    // console.log(bno)
    setTno(tno);
    setBno(bno);
    setShowArchive(true);
    fetchForGateData(bno);
    // console.log("here me")
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchDataForAssign();
  }, []);

  // const [condVal,setCondVal] = useState("null");

  const [searchForBaggage,setSearchBaggage]=useState('');
  const [searchForTerminal,setSearchForTerminal]=useState('');

  function editSearchForBaggage(e){
    setSearchBaggage(e.target.value)
  }

  function editSearchForTerminal(e){
    setSearchForTerminal(e.target.value)
  }

  function dynamicSearch(){
    return (data.filter(n=>(
      n.baggagenumber.toLowerCase().includes(searchForBaggage.toLowerCase()) && 
      n.terminalnumber.toLowerCase().includes(searchForTerminal.toLowerCase())
      )
    ))
  }

  const handleSearchClear = () => {
    setSearchForTerminal('');
    setSearchBaggage('');
  }

  const fetchForGateData = (bno) => {
    const params={bno}
    fetch('http://localhost:8000/api/getSpecificGateData/'+new URLSearchParams(params))
      .then((response) => response.json())
      .then((actualData) => {
        setDataGate(actualData);
        console.log(dataGate);
        // console.log("asdasd");
        // console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleSelect = (itr) => {
    const params = {
      arriveid:itr.arriveid,
      flightnumber:itr.flightnumber,
      baggagenumber:bno,
      terminalnumber:tno,
    };
    axios.post('http://localhost:8000/api/setSelectBaggageNumber', params)
      .then(response => {
        if(response.data==="Success"){
          handleShowInfoSuccess();
          fetchData();
          handleCloseArchive();
          handleSearchClear();
        }
        else{
          handleShowInfoFailure();
          handleCloseArchive();
        }
      });
  }

  return (
    <div className='main-box'>
      <Row>
        <Col md={3}></Col>
        <Col className="over-box" md={6}>
          <div  className="table-box" >
          <Row>
            <Col md={3} className="cells"><strong>Terminal</strong></Col>
            <Col md={3} className="cells"><strong>Carousal Number</strong></Col>
            <Col md={3} className="cells"><strong>Status</strong></Col>
            <Col md={3} className="cells"><strong>Change Assignment</strong></Col>
          </Row>
          <Row>
            <Col md={3} className="cells">
              <input type= 'text'
              className='search-box'
              value = {searchForTerminal}
              onChange = {editSearchForTerminal}
              placeholder = 'Search Terminal'
              />
            </Col>
            <Col md={3} className="cells">
              <input type= 'text'
              className='search-box'
              value = {searchForBaggage}
              onChange = {editSearchForBaggage}
              placeholder = 'Search Baggage'
              />
            </Col>
            <Col md={3} className="cells"></Col>
            <Col md={3} className="cells">
              <button className="the-button clear-btn" onClick={handleSearchClear}>Clear Filter</button>
            </Col>
          </Row>
          {dynamicSearch().map((item, index) => (
            <Row key={index}>
              <Col md={3} className="cells">{item.terminalnumber}</Col>
              <Col md={3} className="cells">{item.baggagenumber}</Col>
              <Col md={3} className="cells">{(item.active===0)?"Un-assigned":"Assigned"}</Col>
              {/* {
                item.active===0?<Col md={3} className="cells"><button className="the-button enable-btn" onClick={()=>handleShowArchive(item.terminalnumber,item.baggagenumber,"Enable")}>Enable</button></Col>:<Col md={3} className="cells"><button className="the-button disable-btn" onClick={()=>handleShowArchive(item.terminalnumber,item.gatenumber,"Disable")}>Disable</button></Col>
              } */}
              <Col md={3} className="cells">
                <button className="the-button modify-btn" onClick={()=>handleShowArchive(item.terminalnumber,item.baggagenumber)}>Modify</button>
              </Col>
            </Row>
          ))}
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Modal show={showArchive} onHide={handleCloseArchive}>
        <Modal.Header closeButton>
            <Modal.Title>Assign for this?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(dataGate===[])?
          <p>
            Currently Assigned to None
          </p>:
          <>
            <p>
              Currently Assigned to:
            </p>
            <div className='small-font'>
                Airline Name     : {dataGate[0].airlinename} <br/>
                Flight Number    : {dataGate[0].flightnumber} <br/>
                Arrival Time     : {dataGate[0].arrivetime} <br/>
                Terminal Number  : {dataGate[0].terminalnumber} <br/>
                Gate Number      : {dataGate[0].gatenumber} <br/>
            </div>
            <p>
              Change the assign this for a different flight?
            </p>
            <Row className='small-it-down'>
              <Col md={2}>Airline Name</Col>
              <Col md={2}>Flight Number</Col>
              <Col md={2}>Arrival Time</Col>
              <Col md={2}>Terminal Number</Col>
              <Col md={2}>Gate Number</Col>
              <Col md={2}>Action</Col>
            </Row>
          </>
          }
          {dataForAssign.map((itr, index) => { 
            return(
              <Row className='small-it-down' key={index}>
                <Col md={2}>{itr.airlinename}</Col>
                <Col md={2}>{itr.flightnumber}</Col>
                <Col md={2}>{itr.arrivetime}</Col>
                <Col md={2}>{itr.terminalnumber}</Col>
                <Col md={2}>{itr.gatenumber}</Col>
                <Col md={2}>
                  <button className='rounded-btn modify-btn' onClick={()=>handleSelect(itr)}>
                    Select
                  </button>
                </Col>
              </Row>
            )
          })}
        </Modal.Body>
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
    </div>
  )
}

export default AssignBaggage