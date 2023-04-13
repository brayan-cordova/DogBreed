const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const port        = process.env.PORT || 3000;
const mongoose    = require('mongoose');
const   bodyParser  = require('body-parser');
const   router      = express.Router();
const   appRoutes   = require('./app/routes/api')(router);
const   path        = require('path');

mongoose.set('strictQuery', true);

//middleware

app.use(morgan("dev"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname + '/public')))
app.use('/api', appRoutes);

// mongodb connection
mongoose.connect("mongodb://127.0.0.1:27017/dogBreed",{useNewUrlParser: true,  useUnifiedTopology: true },
function checkDB(err)
{
    if(err)
    {
        console.log('Not Connected to the database: ' + err);
    }
    else
    {
        console.log('Connection successfully connected to MongoDB')
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
    console.log('Server running on port ' + port);
});

