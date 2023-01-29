const client = require("../Connection/connection");
const usersCollection = client.db("power-pack").collection("users");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const usersRegisterController = async(req, res) =>{
    await client.connect();
    const {name, email, password} = req.body;
    const isHas = await usersCollection.findOne({email: email});
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    
    if(isHas){
        return res.send({success: false, message: "Users already exists"});
    }
    const result = await usersCollection.insertOne({name: name, email: email, password: hashPassword});
    if(result.acknowledged){
        return res.send({success: true, message: "Users registered successfully"});
    }
};



/* User Patch Controller  */
const userPatchController = async(req, res) =>{
    await client.connect();
    const {email} = req.query;
    const query = {email: email};
    const data = req.body;
    const updateDoc = {$set: data};

    const result = await usersCollection.updateOne(query, updateDoc);
    if(result.acknowledged){
        return res.send({success: true, message: "Login successfully done"});
    }

}

/* User get Controller */
const userGetController =  async(req, res) =>{
    await client.connect();
    const email = req.decoded.email;
    const isHas = await usersCollection.findOne({email: email});
    // const isHas = await usersCollection.find().toArray();
    res.send({success: true, message: "User is already login", user:isHas});
    
}

/* User Login Function */
const userLoginController = async(req, res) =>{
    await client.connect();
    const email = req.query.email;
    const password = req.query.password;
        
    const isHas = await usersCollection.findOne({email: email });
    if(!isHas){
        return res.send({success: false, message: "Email is not registered"});
    }

    const isValid = await bcrypt.compare(password, isHas.password);
    if(isValid){
        const token = jwt.sign({email: email}, process.env.ACCESS_TOKEN, {
            expiresIn: '1d'
        })
        res.send({success: true, email, token})

    }else{
        return res.send({success: false, message: "Password is not matched"});
    }
}




module.exports = {usersRegisterController,userLoginController, userPatchController, userGetController}