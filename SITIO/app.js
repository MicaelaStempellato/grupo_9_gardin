const express = require('express');
const app = express ();

app.use(express.static(__dirname + "/public"))

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

app.get('/signin', (req, res)=>{
    res.sendFile(__dirname + '/signin.html')
})

app.listen(8080, () =>{
    
})