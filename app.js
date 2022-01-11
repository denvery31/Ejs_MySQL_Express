const express = require("express");
//connect express
const mysql = require('mysql');
//connect database


/* (\) DATABASE IN TABLE(/) */
var stroka = "";
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "gentoo",
    password: "letmekeepitsecret"
});
//подключение
conn.connect(err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database OK");
    }
});
//формировка запроса, и таблицы
conn.query("SELECT * FROM developers",
    function(err, results, fields) {
        for (var i in results) {
            stroka += '<tr><td>'+results[i].name+'</td><td>'+results[i].email+'</td><td> '+results[i].job+'</td></tr>';
        }
        stroka = "<table>"+ stroka +"</table>"
    });
///database opr end

/* (\) SERVER PART(/) */
const app = express();

app.set("view engine", "ejs");  // ejs engine as HTML

//обработки запросов
app.use("/show", function(request, response){
    response.render("contact", {
        table: `${stroka}`
    });
});

app.use("/", function(request, response){
    response.render("main");
});

//port hearing...
app.listen(3000, () => console.log("Сервер работает..."));