const express = require('express')
const shareController = require('../controllers/share.controller.js')


const router = express.Router();



router.post("/send", shareController.send);
router.get("/receive/:code", shareController.receive);



module.exports = router;