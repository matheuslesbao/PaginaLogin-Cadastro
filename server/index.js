const express = require('express');
const app = express();

const mysql = require('mysql'); //puxar o mysql
const mysql2 = require('mysql2');// corrigindo o erro

const db = mysql2.createPool({ //Conexao com o mysql
    host: "localhost",
    user: "root",
    password: "password",
    database: "banco",
});

// app.get("/", (req, res) => {
//     db.query( // levar a informaçao para o mysql
//         "INSERT INTO usuarios (email, password) VALUES ('matheuss.lesbao@gmail.com', '1234567')",
//         (err, result) => {
//             if(err){
//                 console.log(err)
//             }
//         }
//     );
// });


app.listen(3001, () => { 
    console.log("Rodando na port 3001")
})
