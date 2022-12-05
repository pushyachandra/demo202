const express = require("express");
var session = require('express-session');
const flash = require('express-flash');
const app = express();
const bodyParser = require("body-parser");
const mysql=require("mysql2");
const cors = require("cors");
const passport = require("passport");
var bcrypt = require('bcrypt');
var moment=require('moment')

const db= mysql.createPool({
    host: "airlinemanagement.cg5nflqlwqvp.us-west-1.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "202AirlineDB"
});

// const db = mysql.createPool({
//     host:"localhost",
//     user:"root",
//     password:"",
//     database:"202_new"
// })


const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
  };

const initializePassport = require('./passport-config');
const e = require("express");
initializePassport(db, passport);

app.use(cors(corsOptions));
app.use(flash());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.post('/login', passport.authenticate('local'), (req, res) => {
    // console.log("here");
    res.send("success")
});

app.get('/logout', (req, res) => {
    req.logout(req.user, err => {
    if(err) return next(err);
        res.send("success");    
    });
});

app.get('/user', (req, res) => {
    res.send(req.user)
});

app.get("/api/getUsers", (req,res)=>{
    const query="select username,password from temp_accounts;"
    db.query(query,(error,result)=>{
        res.send(JSON.stringify(result));
    });
});

app.get("/api/get",(req,res)=>{
    const query="Select * from city Limit 100;"
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getAllAirlineInfo",(req,res)=>{
    const query = "select distinct airlineId_pk,airlineName from airlines;"
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getAirlineInfo/:ID",(req,res)=>{
    const airlineid_pk=req.params.ID;
    const query = "select distinct airlineName,website,phoneNumber from airlines where airlineId_pk="+airlineid_pk+";";
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getArrivalFligts",(req,res)=>{
    const query="select airlinename_fk,airline_fk,scheduledTime,status,terminalId_fk,gateId_fk,arrivalId";
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getDepartureFligts",(req,res)=>{
    const query="select airlineId_dept_fk,scheduledTime,status,terminalId_fk,gateId_fk";
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

// app.post("/api/post",(req,res)=>{
//     const {roleId_pk,name} = req.body;
//     const query = "INSERT INTO roles (roleId_pk,name) values (?, ?, ?);"
//     db.query(query,[roleId_pk,name],(error,result) => {
//         if(error){
//             console.log(error);
//         }
//     });
// });

app.post("/api/addNewAirline",(req,res)=>{
    
    const airlineName=req.body.airlineName;
    const website=req.body.website;
    const phoneNumber=req.body.phoneNumber;
    
    const query= "insert into airlines (airlineName,website,phoneNumber) values ('"+airlineName+"','"+website+"','"+phoneNumber+"');"
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.post("/api/addNewUser",(req,res)=>{
    
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const address = req.params.address;
    const zipcode = req.params.zipcode;
    const phoneNumber = req.params.phoneNumber;
    const nationality = req.params.nationality;
    const city = req.params.city;
    const state = req.params.state;
    const gender = req.params.gender;
    const country = req.params.country;

    if(selectedRole=="Ariport Employee"){
        roleId=3
    }
    else if(selectedRole=="Airline Employee"){
        roleId=2
    }
    else if(selectedRole=="Customer"){
        roleId=1
    }
    else{
        res.send("error");
    }

    const query= "insert into users (firstName,lastName,address,zipcode,phoneNumber,nationality,city,state,gender,country,roleId_fk) values ('"+firstName+"','"+lastName+"','"+address+"','"+zipcode+"','"+phoneNumber+"','"+nationality+"','"+city+"','"+state+"','"+gender+"','"+country+"',"+roleId+");"
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.post("/api/updateAirlineInfo",(req,res)=>{
    
    const airlineName=req.params.airlineName;
    const website=req.params.website;
    const phoneNumber=req.params.phoneNumber;
    const airlineId_pk=req.params.airlineId_pk;
    
    const query= "update airlines set airlineName='"+airlineName+"',website='"+website+"',phoneNumber='"+phoneNumber+"' where airlineId_pk="+airlineId_pk;
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.post("/api/updateUserInfo",(req,res)=>{
    
    const firstName = req.params.firstName;
    const lastName = req.params.lastName;
    const address = req.params.address;
    const zipcode = req.params.zipcode;
    const phoneNumber = req.params.phoneNumber;
    const nationality = req.params.nationality;
    const city = req.params.city;
    const state = req.params.state;
    const gender = req.params.gender;
    const country = req.params.country;
    
    const userId_pk = req.params.userId_pk;

    const query= "update users set firstName='"+firstName+"',lastName='"+lastName+"',address='"+address+"',zipcode='"+zipcode+"',phoneNumber='"+phoneNumber+"',nationality='"+nationality+"',city='"+city+"',state='"+state+"',gender='"+gender+"',country='"+country+"' where userId_pk="+userID+";";
    
    db.query(query,(error,result)=>{
        if(error==null){
            res.send("ok");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getUsers", (req,res)=>{
    const query="select * from flights;"
    db.query(query,(error,result)=>{
        res.send(JSON.stringify(result));
    });
});

//app.listen(8000, () => {
//    console.log("Server running on port 8000");
//});

app.post("/addschedule", (req,res) => {
    //console.log(req.body.airlineName);
    var airlineName = req.body.airlineName;
    var airportCode = req.body.airportCode;
    var arrivaltime = req.body.arrivaltime;
    var gate_num = req.body.gate_num;
    var terminal_id = req.body.terminal_id;
    var flight_number_fk = req.body.flight_number_fk;
    var source = req.body.source;
    var destination = req.body.destination;

    console.log(airlineName + airportCode + arrivaltime + gate_num + terminal_id + flight_number_fk + source + destination);

    const query="INSERT INTO schedules (airlineName, airportCode, arrivaltime, gate_num, terminal_id, flight_number_fk, source , destination) Values (?,?,?,?,?,?,?,?)";
    db.query(query,[airlineName, airportCode, arrivaltime, gate_num, terminal_id, flight_number_fk, source , destination],(error,result)=>{
        if(error==null){
            //res.send(JSON.stringify(result));
            res.send("db record added");
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getArriveFlights", (req,res) => {
    const query =  `select airlinename,
                        temp_arrive.flightnumber as flightnumber,
                        departcity,
                        departstatecode,
                        date_sub(departtime, interval 8 hour) as departtime,
                        date_sub(arrivetime, interval 8 hour) as arrivetime,
                        ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
                        ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
                        temp_arrive.arriveid as arriveid,
                        ifnull(temp_baggage.baggagenumber,'Not Assigned') as baggagenumber
                        from temp_arrive left join 
                            temp_gateavaliability 
                            on temp_arrive.arrivetime=temp_gateavaliability.starttime 
                            and temp_arrive.flightnumber=temp_gateavaliability.flightnumber 
                                left join temp_airport 
                                on temp_gateavaliability.gatenumber=temp_airport.gatenumber
                                left join temp_baggage
                                on temp_baggage.arriveid=temp_arrive.arriveid order by temp_arrive.arrivetime asc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getArriveFlights1hr", (req,res) => {
    const query =  `select airlinename,
    temp_arrive.flightnumber as flightnumber,
    departcity,
    departstatecode,
    date_sub(departtime, interval 8 hour) as departtime,
    date_sub(arrivetime, interval 8 hour) as arrivetime,
    ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
    ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
    temp_arrive.arriveid as arriveid,
    ifnull(temp_baggage.baggagenumber,'Not Assigned') as baggagenumber
    from temp_arrive left join 
        temp_gateavaliability 
        on temp_arrive.arrivetime=temp_gateavaliability.starttime 
        and temp_arrive.flightnumber=temp_gateavaliability.flightnumber 
            left join temp_airport 
            on temp_gateavaliability.gatenumber=temp_airport.gatenumber
            left join temp_baggage
            on temp_baggage.arriveid=temp_arrive.arriveid
            where temp_arrive.arrivetime>date_sub(now(),interval 8 hour) and temp_arrive.arrivetime<date_sub(now(),interval 7 hour)
            order by temp_arrive.arrivetime asc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getArriveFlights2hr", (req,res) => {
    const query =  `select airlinename,
    temp_arrive.flightnumber as flightnumber,
    departcity,
    departstatecode,
    date_sub(departtime, interval 8 hour) as departtime,
    date_sub(arrivetime, interval 8 hour) as arrivetime,
    ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
    ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
    temp_arrive.arriveid as arriveid,
    ifnull(temp_baggage.baggagenumber,'Not Assigned') as baggagenumber
    from temp_arrive left join 
        temp_gateavaliability 
        on temp_arrive.arrivetime=temp_gateavaliability.starttime 
        and temp_arrive.flightnumber=temp_gateavaliability.flightnumber 
            left join temp_airport 
            on temp_gateavaliability.gatenumber=temp_airport.gatenumber
            left join temp_baggage
            on temp_baggage.arriveid=temp_arrive.arriveid
            where temp_arrive.arrivetime>date_sub(now(),interval 8 hour) and temp_arrive.arrivetime<date_sub(now(),interval 6 hour)
            order by temp_arrive.arrivetime asc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});


app.get("/api/getArriveFlights4hr", (req,res) => {
    const query =  `select airlinename,
    temp_arrive.flightnumber as flightnumber,
    departcity,
    departstatecode,
    date_sub(departtime, interval 8 hour) as departtime,
    date_sub(arrivetime, interval 8 hour) as arrivetime,
    ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
    ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
    temp_arrive.arriveid as arriveid,
    ifnull(temp_baggage.baggagenumber,'Not Assigned') as baggagenumber
    from temp_arrive left join 
        temp_gateavaliability 
        on temp_arrive.arrivetime=temp_gateavaliability.starttime 
        and temp_arrive.flightnumber=temp_gateavaliability.flightnumber 
            left join temp_airport 
            on temp_gateavaliability.gatenumber=temp_airport.gatenumber
            left join temp_baggage
            on temp_baggage.arriveid=temp_arrive.arriveid
            where temp_arrive.arrivetime>date_sub(now(),interval 8 hour) and temp_arrive.arrivetime<date_sub(now(),interval 4 hour)
            order by temp_arrive.arrivetime asc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});



app.get("/api/getDepartFlights", (req,res) => {
    const query = `select airlinename,
                    temp_depart.flightnumber as flightnumber,
                    arrivecity,
                    arrivestatecode,
                    date_sub(departtime, interval 8 hour) as departtime,
                    date_sub(arrivetime, interval 8 hour) as arrivetime,
                    ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
                    ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
                    temp_depart.departid 
                    from temp_depart left join 
                        temp_gateavaliability 
                        on temp_depart.departtime=temp_gateavaliability.starttime 
                        and temp_depart.flightnumber=temp_gateavaliability.flightnumber 
                            left join temp_airport 
                            on temp_gateavaliability.gatenumber=temp_airport.gatenumber order by temp_depart.departtime desc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getDepartFlights1hr", (req,res) => {
    const query = `select airlinename,
                    temp_depart.flightnumber as flightnumber,
                    arrivecity,
                    arrivestatecode,
                    date_sub(departtime, interval 8 hour) as departtime,
                    date_sub(arrivetime, interval 8 hour) as arrivetime,
                    ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
                    ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
                    temp_depart.departid 
                    from temp_depart left join 
                        temp_gateavaliability 
                        on temp_depart.departtime=temp_gateavaliability.starttime 
                        and temp_depart.flightnumber=temp_gateavaliability.flightnumber 
                            left join temp_airport 
                            on temp_gateavaliability.gatenumber=temp_airport.gatenumber 
                            where temp_depart.departtime>date_sub(now(),interval 8 hour) and temp_depart.departtime<date_sub(now(),interval 7 hour)
                            order by temp_depart.departtime desc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getDepartFlights2hr", (req,res) => {
    const query = `select airlinename,
                    temp_depart.flightnumber as flightnumber,
                    arrivecity,
                    arrivestatecode,
                    date_sub(departtime, interval 8 hour) as departtime,
                    date_sub(arrivetime, interval 8 hour) as arrivetime,
                    ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
                    ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
                    temp_depart.departid 
                    from temp_depart left join 
                        temp_gateavaliability 
                        on temp_depart.departtime=temp_gateavaliability.starttime 
                        and temp_depart.flightnumber=temp_gateavaliability.flightnumber 
                            left join temp_airport 
                            on temp_gateavaliability.gatenumber=temp_airport.gatenumber 
                            where temp_depart.departtime>date_sub(now(),interval 8 hour) and temp_depart.departtime<date_sub(now(),interval 6 hour)
                            order by temp_depart.departtime desc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getDepartFlights4hr", (req,res) => {
    const query = `select airlinename,
                    temp_depart.flightnumber as flightnumber,
                    arrivecity,
                    arrivestatecode,
                    date_sub(departtime, interval 8 hour) as departtime,
                    date_sub(arrivetime, interval 8 hour) as arrivetime,
                    ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
                    ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
                    temp_depart.departid 
                    from temp_depart left join 
                        temp_gateavaliability 
                        on temp_depart.departtime=temp_gateavaliability.starttime 
                        and temp_depart.flightnumber=temp_gateavaliability.flightnumber 
                            left join temp_airport 
                            on temp_gateavaliability.gatenumber=temp_airport.gatenumber 
                            where temp_depart.departtime>date_sub(now(),interval 8 hour) and temp_depart.departtime<date_sub(now(),interval 4 hour)
                            order by temp_depart.departtime desc;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getGatesInfo", (req,res) => {
    const query = "select `terminalnumber`,`gatenumber`,`active` from temp_airport;"
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/test",(req,res)=>{
    var now=moment.utc().local().format();
    console.log(now);
    res.send(now);
})

app.post("/api/enableGate",(req,res) => {
    const tno=req.body.tno;
    const gno=req.body.gno;
    var query='';
    var query1='';
    // var now=moment.utc().local().format();
    var now=moment();
    if(req.body.condVal=="Enable"){
        query="update temp_airport set active=1 where terminalnumber='"+tno+"' and gatenumber='"+gno+"';"
        db.query(query,(error,result)=>{
            if(error==null){
                res.send("Success");
                // var query2="select * from temp_gateavaliability where endtime>'' and gatenumber=gno;";
            }
            else{
                res.send("An error has occured");
                console.log(error);
            }
        })
    }
    else if(req.body.condVal=="Disable"){
        query="update temp_airport set active=0 where terminalnumber='"+tno+"' and gatenumber='"+gno+"';"
        query1="call gate_reroute('"+gno+"','"+now+"')"
        db.query(query,(error,result)=>{
            if(error==null){
                db.query(query1,(error,result)=>{
                    if(error==null){
                        res.send("Success");
                    }
                    else{
                        res.send("An error has occured");
                        console.log(error);
                    }
                })
            }
            else{
                res.send("An error has occured");
                console.log(error);
            }
        })
    }
});

app.post("/api/AddArrivalSchedule",(req,res)=>{
    const airlineName=req.body.airlineName;
    const flightNumber=req.body.flightNumber;
    const departCity=req.body.departCity;
    const departStateCode=req.body.departStateCode;
    const departTime=moment.utc(req.body.departTime).local().format();
    const arriveTime=moment.utc(req.body.arriveTime).local().format();
    const query="insert into temp_arrive(airlinename,flightnumber,departcity,departstatecode,departtime,arrivetime) values('"+airlineName+"','"+flightNumber+"','"+departCity+"','"+departStateCode+"','"+departTime+"','"+arriveTime+"')";
    
    console.log(req.body);

    db.query(query,(error,result)=>{
        if(error==null){
            res.send("Success")
        }
        else{
            res.send("An error has occured");
            console.log(error);
        }
    })
});

app.post("/api/AddDepartureSchedule",(req,res)=>{
    const airlineName=req.body.airlineName;
    const flightNumber=req.body.flightNumber;
    const arriveCity=req.body.arriveCity;
    const arriveStateCode=req.body.arriveStateCode;
    const departTime=moment.utc(req.body.departTime).local().format();
    const arriveTime=moment.utc(req.body.arriveTime).local().format();
    const query="insert into temp_depart(airlinename,flightnumber,arrivecity,arrivestatecode,departtime,arrivetime) values('"+airlineName+"','"+flightNumber+"','"+arriveCity+"','"+arriveStateCode+"','"+departTime+"','"+arriveTime+"')";
    
    console.log(req.body);

    db.query(query,(error,result)=>{
        if(error==null){
            res.send("Success")
        }
        else{
            res.send("An error has occured");
            console.log(error);
        }
    })
});

app.post("/api/editArrivalDetails",(req,res)=>{
    const arriveid=req.body.arriveid;
    const airlineName=req.body.airlineName;
    const flightNumber=req.body.flightNumber;
    const departCity=req.body.departCity;
    const departStateCode=req.body.departStateCode;
    const departTime=moment.utc(req.body.departTime).local().format();
    const arriveTime=moment.utc(req.body.arriveTime).local().format();
    // const departTime=req.body.departTime;
    // const arriveTime=req.body.arriveTime;

    console.log(arriveTime);
    console.log(departTime+"\n\n");

    // console.log(arriveTime);
    // console.log(req.body.departTime+"--------"+departTime);

    const query="update temp_arrive set airlinename='"+airlineName+"',flightnumber='"+flightNumber+"',departCity='"+departCity+"',departStateCode='"+departStateCode+"',departTime='"+departTime+"',arriveTime='"+arriveTime+"' where arriveid="+arriveid+";";

    const query1=" delete from temp_gateavaliability where arriveid="+arriveid+";";
    db.query(query,(error,result)=>{
        if(error==null){
            db.query(query1,(error,result)=>{
                if(error==null){
                    res.send("Success");
                }
                else{
                    res.send("An error has occured")
                    console.log(error);
                }
            })
        }
        else{
            res.send("An error has occured");
            console.log(error);
        }
    })
});

app.post("/api/editDepartureDetails",(req,res)=>{
    const departid=req.body.departid;
    const airlineName=req.body.airlineName;
    const flightNumber=req.body.flightNumber;
    const arriveCity=req.body.arriveCity;
    const arriveStateCode=req.body.arriveStateCode;
    const departTime=moment.utc(req.body.departTime).local().format();
    const arriveTime=moment.utc(req.body.arriveTime).local().format();

    const query="update temp_depart set airlinename='"+airlineName+"',flightnumber='"+flightNumber+"',arriveCity='"+arriveCity+"',arriveStateCode='"+arriveStateCode+"',departTime='"+departTime+"',arriveTime='"+arriveTime+"' where departid="+departid+";";

    const query1="delete from temp_gateavaliability where departid="+departid+";"

    db.query(query,(error,result)=>{
        if(error==null){
            db.query(query1,(error,result)=>{
                if(error==null){
                    res.send("Success");
                }
                else{
                    res.send("An error has occured");
                    console.log(error);
                }
            })
        }
        else{
            res.send("An error has occured");
            console.log(error);
        }
    })
});

app.post("/api/deleteArrivalFlight",(req,res)=>{
    const arriveid=req.body.arriveid;
    // console.log(req.body);
    const query="delete from temp_arrive where arriveid="+arriveid+";";
    const query1="delete from temp_gateavaliability where arriveid="+arriveid+";";
    db.query(query,(error,result)=>{
        if(error==null){
            db.query(query1,(error,result)=>{
                if(error==null){
                    res.send("Success");
                }
                else{
                    res.send("An error has occured");
                    console.log(error);
                }
            })
        }
        else{
            res.send("An error has occured");
            console.log(error);
        }
    })
})

app.post("/api/deleteDepartureFlight",(req,res)=>{
    const departid=req.body.departid;
    const query="delete from temp_depart where departid="+departid+";";
    const query1="delete from temp_gateavaliability where departid="+departid+";";
    db.query(query,(error,result)=>{
        if(error==null){
            db.query(query1,(error,result)=>{
                if(error==null){
                    res.send("Success");
                }
                else{
                    res.send("An error has occured");
                    console.log(error);
                }
            })
        }
        else{
            res.send("An error has occured");
            console.log(error);
        }
    })
})

app.get("/api/getDepartDataForVieworEdit",(req,res)=>{
    const query = `select airlinename,
                        temp_depart.flightnumber as flightnumber,
                        arrivecity,
                        arrivestatecode,
                        date_sub(departtime, interval 8 hour) as departtime,
                        date_sub(arrivetime, interval 8 hour) as arrivetime,
                        ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
                        ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
                        temp_depart.departid as departid
                        from temp_depart left join 
                            temp_gateavaliability 
                            on temp_depart.departtime=temp_gateavaliability.starttime 
                            and temp_depart.flightnumber=temp_gateavaliability.flightnumber 
                                left join temp_airport 
                                on temp_gateavaliability.gatenumber=temp_airport.gatenumber;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getArriveDataForVieworEdit",(req,res)=>{
    const query = `select airlinename,
                        temp_arrive.flightnumber as flightnumber,
                        departcity,
                        departstatecode,
                        date_sub(departtime,interval 8 hour) as departtime,
                        date_sub(arrivetime,interval 8 hour) as arrivetime,
                        ifnull(temp_airport.terminalnumber,'Not Assigned')  as terminalnumber,
                        ifnull(temp_gateavaliability.gatenumber,'Not Assigned')  as gatenumber,
                        temp_arrive.arriveid as arriveid 
                        from temp_arrive left join 
                            temp_gateavaliability 
                            on temp_arrive.arrivetime=temp_gateavaliability.starttime 
                            and temp_arrive.flightnumber=temp_gateavaliability.flightnumber 
                                left join temp_airport 
                                on temp_gateavaliability.gatenumber=temp_airport.gatenumber;`
    db.query(query,(error,result)=>{
        if(error==null){
            console.log(result);
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getBaggageInfo", (req,res) => {
    const query = "select `terminalnumber`,`baggagenumber`,`active`,`arriveid`,`currentflightnumber` from temp_baggage;"
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getSpecificGateData/:bno", (req,res) => {
    // console.log(req.body);
    const bgno=req.params.bno.split("=")[1];
    console.log(req.params.bno.split("=")[1].toString());
    const query = "select airlinename,temp_arrive.flightnumber,arrivetime,terminalnumber,gatenumber,baggagenumber from 202AirlineDB.temp_baggage join 202AirlineDB.temp_arrive on temp_baggage.arriveid=temp_arrive.arriveid left join 202AirlineDB.temp_gateavaliability on temp_arrive.arriveid=temp_gateavaliability.arriveid where baggagenumber='"+bgno+"';"
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.get("/api/getAssignableFlights", (req,res) => {
    const query = `select airlinename,
                    temp_arrive.flightnumber as flightnumber,
                    departcity,
                    departstatecode,
                    departtime,
                    arrivetime,
                    temp_airport.terminalnumber  as terminalnumber,
                    temp_gateavaliability.gatenumber  as gatenumber,
                    temp_arrive.arriveid as arriveid
                    from temp_arrive left join 
                        temp_gateavaliability 
                        on temp_arrive.arrivetime=temp_gateavaliability.starttime 
                        and temp_arrive.flightnumber=temp_gateavaliability.flightnumber 
                            left join temp_airport 
                            on temp_gateavaliability.gatenumber=temp_airport.gatenumber
                            where temp_gateavaliability.gatenumber is not null;`
    db.query(query,(error,result)=>{
        if(error==null){
            res.send(JSON.stringify(result));
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.post("/api/setSelectBaggageNumber",(req,res)=>{
    
    const arriveid=req.body.arriveid;
    const flightnumber=req.body.flightnumber;
    const baggagenumber=req.body.baggagenumber;
    const terminalnumber=req.body.terminalnumber;
    console.log("Whoa");
    
    const query= "update temp_baggage set active=1,arriveid="+arriveid+",currentflightnumber='"+flightnumber+"' where baggagenumber='"+baggagenumber+"' and terminalnumber='"+terminalnumber+"';";
    const query1= "update temp_baggage set arriveid=null,currentflightnumber=null where terminalnumber='"+terminalnumber+"' and baggagenumber='"+baggagenumber+"' ;";
    
    db.query(query1,(error,result)=>{
        if(error==null){
            db.query(query,(error,result)=>{
                if(error==null){
                    res.send("Success");
                }
                else{
                    res.send("An error has occured");
                    console.log(error)
                }
            });
        }
        else{
            res.send("An error has occured");
            console.log(error)
        }
    });
});

app.listen(8000, () => {
    console.log("Server running on port 8000")
})