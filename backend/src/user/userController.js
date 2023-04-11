var userModel = require('./userModel');

var createUserController = async (req, res) =>
{
    try
{
    const body = req.body
    const userModelData = new userModel()
    userModelData.name = body.name
    userModelData.email = body.email
    userModelData.password = body.password
    await userModelData.save()

    res.status(200).send({
        "status": true, "message": "User created successfully"
    });
}
catch(error)
{
    res.status(400).send(error);
}

}

module.exports = { createUserController };