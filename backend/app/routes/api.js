var   User        = require("../models/user");

module.exports = function (router)
{
    // route for users to register
    //http://localhost:3000/api/users
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
    return router;
}

