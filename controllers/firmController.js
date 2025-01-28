
const Firm = require('../models/Firm')
const Vendor = require('../models/Vendor') //Because we are adding the vendor to the firm
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/'); //Destination folder for where the uploaded images are stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); //For generating unique file name
    }
});

const upload = multer({storage: storage});


const addFirm = async(req,res)=>{
    console.log("addFirm called"); //Debug log
    try {
    const {firmName, area, category, region, offer} = req.body;

    const image = req.file ? req.file.filename : undefined;

    console.log("Vendor ID from token:", req.vendorId);  // Debugging line

    const vendor = await Vendor.findById(req.vendorId);
    if(!vendor){
       return res.status(404).json({message: "Vendor not Found"})
    }
    // Create the firm, setting the vendor as an array
    const firm = new Firm({
        firmName, 
        area, 
        category, 
        region, 
        offer,
        image, 
        vendor: [vendor._id]
    });

    const savedFirm = await firm.save();
    vendor.firm.push(savedFirm)
    await vendor.save()
    return res.status(200).json({message: "Firm Added Successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal Server Error")
    }
}

const deleteFirmById = async(req,res)=>{
    try {
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);

        if(!deletedFirm){
            return res.status(404).json({error: "No Firm Found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal Server Error")
    } 
}

module.exports = {addFirm, upload, deleteFirmById};