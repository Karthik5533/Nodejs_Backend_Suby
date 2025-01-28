const Vendor = require('../models/Vendor');   //for vendorId
const jwt = require("jsonwebtoken");   //for verifying the token
const dotEnv = require("dotenv");

dotEnv.config()
const secretKey = process.env.whatIsYourName

const verifyToken = async(req, res, next)=>{
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if(!token){
            return res.status(401).json({error: "Token is required"});
        }
        try {
            const decoded = jwt.verify(token,secretKey);
            console.log("Decoded JWT:", decoded);  //Debugging line
            const vendor = await Vendor.findById(decoded.vendorId);
            console.log("Found vendor:", vendor); //Debugging line

            if(!vendor){
                return res.status(404).json({error: "Vendor not Found"})
            }

            req.vendorId = vendor._id;
            next()
        } catch (error) {
            console.error(error)
            return res.status(500).json({error: "Invalid Token"})
        }
}

module.exports = verifyToken