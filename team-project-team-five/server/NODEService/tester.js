var mysql = require('mysql');

var con = mysql.createConnection({
  host: "airlinemanagement.cg5nflqlwqvp.us-west-1.rds.amazonaws.com",
  user: "admin",
  password: "password",
  database: "202AirlineDB"
});

con.connect(function(err) {
    if (err===null) {

    }
});

con.query(`select airlinename,
temp_depart.flightnumber as flightnumber,
arrivecity,
arrivestatecode,
departtime,
arrivetime,
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
        order by temp_depart.departtime desc;`, function (err, result, fields) {
    if(err===null){
        console.log(result);
    }
    else{
        console.log(err);
    }
});