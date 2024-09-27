const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('home')
})

app.post('/adicionar',(req,res)=>{
    const nome = req.body.nome
    const idade = req.body.idade

    const sql = `INSERT INTO amigos (nome, idade) VALUES ('${nome}' , '${idade}')`
})
const conn = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password: 'root',
    database: 'pjnode'
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conectou')
        app.listen(3000)
    }
})
