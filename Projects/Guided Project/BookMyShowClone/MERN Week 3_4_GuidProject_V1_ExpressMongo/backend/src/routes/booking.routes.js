const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");


const {protect} = require("../middleware/auth.middleware");

// User booking routes
router.post("/",protect,bookingController.createBooking);
router.post("/my",protect,bookingController.getMyBookings);
router.post("/:id",protect,bookingController.cancelBookings);

module.exports = router;