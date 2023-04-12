var   User        = require("../models/user");

module.exports = function (router)
{
    // route for users to register
    //http://localhost:3000/users
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
                        res.status(200).send("User created successfully");
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

