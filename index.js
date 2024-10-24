const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

const conn = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password: 'root',
    database: 'pjnode'
})

app.get('/',(req,res)=>{
    res.render('home')
})
app.get('/amigo/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM amigos WHERE id = ${id}`
    conn.query(sql, id,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const amigo = data[0]
        res.render('amigo',{amigo})
    })
})

app.get('/amigos',(req,res)=>{
    const sql = 'SELECT * FROM amigos'
    conn.query(sql,(err, data)=>{
        if(err){
            return
        }
        const amigos = data
        res.render('amigos',{amigos})
    })
})

app.post('/apagar/:id',(req,res)=>{
    const id = req.params.id
    const sql = `DELETE FROM amigos WHERE id = ${id}`
    conn.query(sql,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/amigos')
    }) 
})

app.post('/adicionar',(req,res)=>{
    const nome = req.body.nome
    const idade = req.body.idade

    const sql = `INSERT INTO amigos (nome, idade) VALUES ('${nome}' , '${idade}')`
    
    conn.query(sql,(err)=>{
        console.log(err)
        return
    })
    res.redirect('/')
})

app.get('/formEditar/:id',(req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM amigos WHERE id = ${id}`
    conn.query(sql,(err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const amigo = data[0]
        console.log(data)
        res.render('editar',{amigo})
    })    
})

app.post('/editar',(req,res)=>{
    const id = req.body.id
    const nome = req.body.nome
    const idade = req.body.idade

    const sql = `UPDATE amigos SET nome='${nome}', idade='${idade}' WHERE id = ${id}`
    conn.query(sql,(err)=>{
        if(err){
            console.log(err)
            return
        }
        res.redirect('/')
    })
})


conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conectou')
        app.listen(3000)
    }
})
