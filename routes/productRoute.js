const express = require("express");
const { addCampaign, myCampaigns, allCampaigns, campaignDetails, donate, donaters } = require("../controller/productController");
const { verifyUser } = require("../middleware/auth");
const router = express.Router();
const upload = require('../uploads/uploads')

router.route("/add-campaign").post(verifyUser, upload.single('image'), addCampaign)
router.route("/my-campaigns").get(verifyUser, myCampaigns)
router.route("/campaign-details/:id").get(campaignDetails)
router.route("/all-campaigns").get(allCampaigns)
router.route("/donate").post(verifyUser, donate)
router.route("/donaters/:id").get(donaters)

module.exports = router;