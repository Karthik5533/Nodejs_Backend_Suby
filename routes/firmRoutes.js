const express = require("express");
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');  //after verifying middlewae the firm is adding to the middleware

const router = express.Router();

console.log("Firm Routes Loaded");

router.post('/add-firm', verifyToken,  firmController.addFirm, firmController.upload.single('image'));

router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;