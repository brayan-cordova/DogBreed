var   User        = require("../models/user");

module.exports = function (router)
{
    // route for users to register
    //http://localhost:3000/api/users
    // User Registration Route
    router.post("/users", async(req, res) =>
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
            {
                res.json({success: false, message: "Ensure names, email and password were provided"});
            }
            else
            {
                await user.save(function(err)
                {
                    if (err)
                    {
                        res.json({success: false, message: "Names or Email already exists"});
                    }
                    else
                    {
                        res.status(200).json({success: true, message: "User created successfully"});
                    }
                });
            }
        }
        catch (err)
        {
            res.status(400).send(err);
        }
    });

    // User Login Route
    //http://localhost:3000/api/authenticate
    router.post('/authenticate', function(req, res){
        User.findOne({ email: req.body.email }).select('names email password').exec(function(err, user){
            if (err) throw err;

            if (!user){
                res.json({ success: false, message: 'Could not authenticate user' });
            }
            else if (user){
                //password validation
                if (req.body.password){
                    var validPassword = user.comparePassword(req.body.password);
                }
                else{
                    res.json({ success: false, message: 'No password provided' });
                }
                if (!validPassword){
                    res.json({ success: false, message: 'Could not authenticate password' });
                }
                else{
                    res.json({ success: true, message: 'User authenticated' });
                }
            }

        })
    })
    return router;

}

