const express = require('express');
const app = express ();



app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.get('/login', (req, res)=>{
    res.sendFile(__dirname + '/login.html')
})

app.get('/productCart', (req, res)=>{
    res.sendFile(__dirname + '/productCart.html')
})

app.get('/productDetail', (req, res)=>{
    res.sendFile(__dirname + '/productDetail.html')
})

app.get('/register', (req, res)=>{
    res.sendFile(__dirname + '/register.html')
})

app.listen(8080, () =>{
    
})