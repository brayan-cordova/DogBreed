const express     = require('express');
const app         = express();
const morgan      = require('morgan');
const port        = process.env.PORT || 3000;
const mongoose    = require('mongoose');
var   User        = require("./app/models/user");
var   bodyParser  = require('body-parser');

mongoose.set('strictQuery', true);

//middleware

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan("dev"));

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


// route for users to register

//http://localhost:3000/users
app.post("/users", async(req, res) =>
{

    try
    {
        const user      = User();
        user.names      = req.body.names;
        user.email      = req.body.email;
        user.password   = req.body.password;
        if
        (
            req.body.names == null || req.body.names == "" ||
            req.body.email == null || req.body.email == "" ||
            req.body.password == null || req.body.password == ""
        )
        {res.send("Ensure names, email and password were provided");}

        else
        {
            await user.save(function(err)
            {
                if (err)
                {
                    res.send("Names or Email already exists");
                }
                else
                {
                    res.status(200).send({"status": true, "message": "User created successfully"});
                }
            });
        }

    }
    catch (err)
    {
        res.status(400).send(err);
    }


});

app.listen(port, function(){
    console.log('Server running on port ' + port);
});