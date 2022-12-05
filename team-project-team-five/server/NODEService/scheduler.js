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

const setTimerMin = 1;

const interval = 1000;

setInterval(function(){
    console.log("---Running now Arrive");
    con.query("select temp_arrive.arriveid,temp_arrive.flightnumber,date_sub(arrivetime,interval 8 hour) as st,date_sub(date_add(arrivetime, interval 1 hour),interval 8 hour) as et from temp_arrive left join temp_gateavaliability on temp_arrive.arriveid=temp_gateavaliability.arriveid where temp_gateavaliability.gatenumber is null and arrivetime>now();", function (err, result, fields) {
        if(err===null){
            result=JSON.parse(JSON.stringify(result))
            result.forEach(function(item,index){
                setTimeout(function(){
                    con.query("call gate_random_assignment('"+item.st+"','"+item.et+"','"+item.flightnumber+"',"+item.arriveid+",null)",function (err, result, fields) {
                        if(err===null){
                            console.log("Added for Arrive");
                        }
                        else{
                            console.log("err")
                            console.log(err);
                        }
                    })
                },interval*index);
            })
        }
        else{
            console.log(err);
        }
    });
},setTimerMin*1000*60)

setInterval(function(){
    console.log("---Running now Depart");
    con.query("select temp_depart.departid,temp_depart.flightnumber,date_sub(departtime,interval 8 hour) as st,date_sub(date_add(departtime, interval 1 hour),interval 8 hour) as et from temp_depart left join temp_gateavaliability on temp_depart.departid=temp_gateavaliability.departid where temp_gateavaliability.gatenumber is null and departtime>now();", function (err, result, fields) {
        if(err===null){
            result=JSON.parse(JSON.stringify(result))
            result.forEach(function(item,index){
                setTimeout(function(){
                    con.query("call gate_random_assignment('"+item.st+"','"+item.et+"','"+item.flightnumber+"',null,"+item.departid+")",function (err, result, fields) {
                        if(err===null){
                            console.log("Added for Depart");
                        }
                        else{
                            console.log("err")
                            console.log(err);
                        }
                    })
                },interval*index);
            })
        }
        else{
            console.log(err);
        }
    });
},setTimerMin*1000*60)

// con.end();