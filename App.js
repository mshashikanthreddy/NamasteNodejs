const express = require('express');

const app = express();

app.use('/hellotest',(req,res) => {
    res.send('hi hello');
})

app.use('/hello/test',(req,res) => {
    res.send('hi hello test');
})
app.use('/',(req,res) => {
    res.send('hi ');
})

app.listen(3000,() =>{
    console.log('server is successfully connected at port 3000');
})