const express = require('express');

const studentsRoutes = require('./src/student/routes')
const apiRoutes = require('./src/apis/routes')

const app = express();
const port = 2000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

app.use('/api/v1/students',studentsRoutes);
app.use('/api/v1/apis', apiRoutes);

app.listen(port,()=>console.log(`app listening on port ${port}`));