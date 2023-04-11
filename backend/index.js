const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
var routes = require('./routes/routes');
const cors = require('cors');

app.use(cors(
    {
        origin: "http://localhost:4200"
    }

));

mongoose.connect("mongodb://127.0.0.1:27017/dogBreed",{useNewUrlParser: true,  useUnifiedTopology: true },
function checkDB(error)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log("DataBase Connected!!!")
    }
});

app.listen(8086,function port(error)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log("Port  Connected!!!! 8086")
    }
});

app.use(cors());
app.use(express.json());
app.use(routes);