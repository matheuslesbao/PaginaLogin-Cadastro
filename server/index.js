const express = require('express');
const app = express();

const mysql = require('mysql'); //puxar o mysql
const mysql2 = require('mysql2');// corrigindo o erro

const cors = require('cors');

const bcrypt = require("bcrypt"); //Senha
const saltRounds = 10;

const db = mysql.createPool({ //Conexao com o mysql
    host: "localhost",
    user: "root",
    password: "password",
    database: "banco",
});

app.use(express.json());
app.use(cors());

// Registro
app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM usuarios WHERE email = ?", [email], 
        (err, result) => {
            if(err) {
                res.send(err);
            }
            else if(result.length == 0){
                bcrypt.hash(password, saltRounds, 
                    (erro, hash) => {
                        db.query(
                            "INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], 
                            (err, response) => {
                                if(err){
                                    res.send(err);
                                }
                                res.send({msg: "Cadastrado"});
                            });
                });
             
            }else {
                res.send({msg: 
                    "Usuario ja cadastrado"});
            }
        });
    });
//LOGIN

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM usuarios WHERE email = ? ", [email], 
    (err, result) => {
        if(err){
            res.send(err);
        }
           else if(result.length > 0){ //Criptografar
                bcrypt.compare(password, result[0].password, 
                    (erro,result) =>{
                        if(result){
                           res.send("Usuario logado") 
                        }else{
                            res.send({msg: "Usuario ou Senha incorreta"});
                        }
                });
            } else{
                res.send({msg: "Conta nao encontrada"})
            }
        }
    );
});


app.listen(3001, () => { 
    console.log("Rodando na port 3001")
})
