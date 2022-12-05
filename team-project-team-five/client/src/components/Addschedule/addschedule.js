import React, { useState } from "react";
import './addschedule.css';
import axios from 'axios'; 
import { Row,Col,Button } from "react-bootstrap";

function Addschedule  ()  {

  const [selected,setSelected]=useState('');

  const ArrivalSchedule = () => {

    const[airlineName,setAirlineName]=useState('');
    const[flightNumber,setFlightNumber]=useState('');
    const[departCity,setDepartCity]=useState('');
    const[departStateCode,setDepartStateCode]=useState('');
    const[departTime,setDepartTime]=useState('');
    const[arriveTime,setArriveTime]=useState('');

    const getAirlineName = () => {
      axios.get("http://localhost:8000/user", { withCredentials: true}).then(res => {
        setAirlineName(res.data.role)
      })
    }

    const handleSubmit = () => {
      if(checkDatesValid()===true && checkValuesPresent()===true){
        const params={
          'airlineName':airlineName,
          'flightNumber':flightNumber,
          'departCity':departCity,
          'departStateCode':departStateCode,
          'departTime':departTime,
          'arriveTime':arriveTime
        }
        axios.post("http://localhost:8000/api/AddArrivalSchedule",params).then(response=>{
          if(response.data==="Success"){
            alert("Added Successfully");
            setFlightNumber('');
            setDepartCity('');
            setDepartStateCode('');
            setDepartTime('');
            setArriveTime('');
            getAirlineName();
          }
        })
      }
    }

    const checkDatesValid = () => {
      if(new Date(departTime).getTime() >= new Date(arriveTime).getTime()){
        alert("Can not have the Arrival Time before the Departure Time");
        setDepartTime('');
        setArriveTime('');
        return false;
      }
      else{
        return true;
      }
    }

    const checkValuesPresent = () => {
      if(flightNumber==='' || departCity==='' || departStateCode===''){
        alert("All feilds should be filled")
        return false;
      }
      else{
        return true;
      }
    }

    return (
      <div className="main-box">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Row className="input-box for-center">
              <Row className="heading-box">
                <div>
                  <strong>
                    Add Arrivals Schedules
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
              <Row className="each-row">
                <Col md={5}></Col>
                <Col md={2}>
                  <button className="the-button submit-button" onClick={handleSubmit}>Submit</button>
                </Col>
                <Col md={5}></Col>
              </Row>
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
      </div>
    )
  }

  const DepartureSchedule = () => {

    const[airlineName,setAirlineName]=useState('');
    const[flightNumber,setFlightNumber]=useState('');
    const[arriveCity,setArriveCity]=useState('');
    const[arriveStateCode,setArriveStateCode]=useState('');
    const[departTime,setDepartTime]=useState('');
    const[arriveTime,setArriveTime]=useState('');

    const getAirlineName = () => {
      axios.get("http://localhost:8000/user", { withCredentials: true}).then(res => {
        setAirlineName(res.data.role)
      })
    }

    const handleSubmit = () => {
      if(checkDatesValid()===true && checkValuesPresent()===true){
        const params={
          'airlineName':airlineName,
          'flightNumber':flightNumber,
          'arriveCity':arriveCity,
          'arriveStateCode':arriveStateCode,
          'departTime':departTime,
          'arriveTime':arriveTime
        }
        axios.post("http://localhost:8000/api/AddDepartureSchedule",params).then(response=>{
          if(response.data==="Success"){
            alert("Added Successfully");
            setFlightNumber('');
            setArriveCity('');
            setArriveStateCode('');
            setDepartTime('');
            setArriveTime('');
            getAirlineName();
          }
        })
      }
    }

    const checkDatesValid = () => {
      if(new Date(departTime).getTime() >= new Date(arriveTime).getTime()){
        alert("Can not have the Arrival Time before the Departure Time");
        setDepartTime('');
        setArriveTime('');
        return false;
      }
      else{
        return true;
      }
    }

    const checkValuesPresent = () => {
      if(flightNumber==='' || arriveCity==='' || arriveStateCode===''){
        alert("All feilds should be filled")
        return false;
      }
      else{
        return true;
      }
    }

    return (
      <div className="main-box">
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Row className="input-box for-center">
              <Row className="heading-box">
                <div>
                  <strong>
                    Add Departures Schedules
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
              <Row className="each-row">
                <Col md={5}></Col>
                <Col md={2}>
                  <button className="the-button submit-button" onClick={handleSubmit}>Submit</button>
                </Col>
                <Col md={5}></Col>
              </Row>
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
      </div>
    )
  }

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
        {(selected==='arrivals')?<ArrivalSchedule />:null}
        {(selected==='departures')?<DepartureSchedule />:null}
      </div>
    </div>       
  )
}

export default Addschedule 


{/* 
const newfunc= () => {
  return (<div>
         <form >
          <table className="addschedule-table">
           <th> </th>
           <th></th>
           <tr>
            <td><label for="arlnname">Airline name:</label></td>
            <td> <input type="text" id="arlnname" name="arlnname"   value={arlnname} onChange={(e)=>{setAirlineName(e.target.value);}}/></td>
           </tr>
           <tr>
            <td> <label   for="arptcode">Airport code:</label></td>
            <td> <input type="text"   id="arptcode" name="arptcode" value={arptcode} onChange={(e)=>{setAirportCode(e.target.value);}}/></td>
           </tr>
           <tr>
            <td><label for="arrtime"  >Arrival time:</label></td>
            <td> <input type="datetime-local"    id="arrtime" name="arrtime" value={arrtime} onChange={(e)=>{setArrivaltime(e.target.value);}}/></td>
           </tr>
           <tr>
            <td><label for="gate"  >Gate:</label></td>
            <td><input type="text"    id="gate" name="gate" value={gate} onChange={(e)=>{setGate(e.target.value);}}/></td>
           </tr> 
           <tr>
            <td><label for="terminal"  >Terminal:</label></td>
            <td><input type="text"    id="terminal" name="terminal" value={terminal} onChange={(e)=>{setTerminal(e.target.value);}}/></td>
           </tr>   
           <tr>
            <td><label for="fltnum"  >Flight number:</label></td>
            <td><input type="text"    id="fltnum" name="fltnum" value={fltnum} onChange={(e)=>{setFlightnumber(e.target.value);}}/></td>
           </tr> 
           <tr>
            <td><label for="source"  >Source:</label></td>
            <td><input type="text"    id="source" name="source" value={source} onChange={(e)=>{setSource(e.target.value);}}/></td>
           </tr>  
           <tr>
            <td><label for="destination"  >Destination:</label></td>
            <td><input type="text"    id="destination" name="destination" value={destination}  onChange={(e)=>{setDestination(e.target.value);}}/></td>
           </tr>         
           <tr>
            <td></td>
            <td><button className="button" onClick={addscheduleDetails}>Add schedule</button></td>
           </tr>
          </table>
          
            
            
        </form> 

        </div>)}

       */}