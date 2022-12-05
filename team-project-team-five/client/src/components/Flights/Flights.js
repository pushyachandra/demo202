import  { useState,React } from "react";
import { Table, Input } from "antd";
import axios from "axios";
import { Columns } from "./Columns";
import {Button,Container,Col,Row} from "react-bootstrap";
import { FlightSearch } from "./FlightSearch";


const { Search } = Input;

const fetchArrive = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getArriveFlights"
  );
  return { data };
};

const fetchDepart = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getDepartFlights"
  );
  return { data };
};

const fetchDepart1hr = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getDepartFlights1hr"
  );
  return { data };
};

const fetchDepart2hr = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getDepartFlights2hr"
  );
  return { data };
};

const fetchDepart4hr = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getDepartFlights4hr"
  );
  return { data };
};

const fetchArrive1hr = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getArriveFlights1hr"
  );
  return { data };
};

const fetchArrive2hr = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getArriveFlights2hr"
  );
  return { data };
};

const fetchArrive4hr = async () => {
  const { data } = await axios.get(
    "http://localhost:8000/api/getArriveFlights4hr"
  );
  return { data };
};

const ArrivalData1 = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchArrive1hr
  });

  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[0] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const ArrivalData2 = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchArrive2hr
  });

  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[0] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const ArrivalData4 = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchArrive4hr
  });

  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[0] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const ArrivalData = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchArrive
  });



  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[0] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const DepartData = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchDepart 
  });

  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[1] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const DepartData1 = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchDepart1hr 
  });

  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[1] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const DepartData2 = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchDepart2hr 
  });

  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[1] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const DepartData4 = () => {
  const [searchVal, setSearchVal] = useState(null);

  const { filteredData, loading } = FlightSearch({
    searchVal,
    retrieve: fetchDepart4hr 
  });

  return (
    <div>
      <Search
        onChange={e => setSearchVal(e.target.value)}
        placeholder="Search"
        enterButton
        // style={{ position: "sticky", top: "10", left: "0" }}
      />
      <Table
        rowKey="name"
        dataSource={filteredData}
        columns={ Columns[1] }
        loading={loading}
        pagination={false}
      />
    </div>
  );
}

const Flights = () => {

  const [selected, setSelected] = useState(null)

  return (
    <div style={{overflowX : 'hidden'}}>
      <Row>
        <Col md={2}></Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('arrivals') }}>Arivals</Button>
        </Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('arrivals1') }}>Arivals 1hr</Button>
        </Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('arrivals2') }}>Arivals 2hr</Button>
        </Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('arrivals4') }}>Arivals 4hr</Button>
        </Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('departures') }}>Departures</Button>
        </Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('departures1') }}>Departures 1hr</Button>
        </Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('departures2') }}>Departures 2hr</Button>
        </Col>
        <Col md={1}>
        <Button onClick={() => { setSelected('departures4') }}>Departures 4hr</Button>
        </Col>
        <Col md={2}></Col>
      </Row>
      <div>
        {(selected==='arrivals1')?<ArrivalData1 />:null}
        {(selected==='arrivals2')?<ArrivalData2 />:null}
        {(selected==='arrivals4')?<ArrivalData4 />:null}
        {(selected==='arrivals')?<ArrivalData />:null}
        {(selected==='departures')?<DepartData />:null}
        {(selected==='departures1')?<DepartData1 />:null}
        {(selected==='departures2')?<DepartData2 />:null}
        {(selected==='departures4')?<DepartData4 />:null}
      </div>
    </div>
  );
}

export default Flights