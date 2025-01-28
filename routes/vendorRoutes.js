const VendorController = require('../controllers/vendorController');
const express = require('express');

const router = express.Router();

router.post('/register', VendorController.VendorRegister);
router.post('/login',VendorController.vendorLogin);

router.get('/all-vendors', VendorController.getAllVendors);
router.get('/single-vendor/:id', VendorController.getVendorById);
module.exports = router;