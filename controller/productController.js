const product = require("../models/productModel")
const donate = require("../models/donateModel")

exports.addCampaign = async (req, res) => {
    const product_ = new product(req.body)
    const image = req.file.path
    product_.image = req.file.path
    console.log(image)
    product_.creater = req.userInfo._id
    product_.save()
    res.json({ message: "Campaign Created", success: true })
}

exports.myCampaigns = async (req, res) => {
    const campaigns = await product.find({ creater: req.userInfo._id })
    res.json(campaigns)
}

exports.campaignDetails = async (req, res) => {
    const campaign = await product.findById(req.params.id).populate('creater')
    res.json(campaign)
}

exports.donate = async (req, res) => {
    const donate_ = new donate(req.body)
    donate_.user = req.userInfo._id
    console.log(req.body)
    const campaign = await product.findById(req.body.campaign)
    var raised = campaign.raised
    raised = parseInt(req.body.amount) + raised
    product.findByIdAndUpdate(campaign._id, { raised: raised }, function (err, docs) {
        if (!err) {
            donate_.save()
            res.json({ message: "Amount donated successfully", success: true })
        }
    })
}

exports.allCampaigns = async (req, res) => {
    const campaigns = await product.find()
    res.json(campaigns)
}

exports.donaters = async (req, res) => {
    const donators_ = await donate.find({campaign: req.params.id}).populate('user').sort('date')
    res.json(donators_)
}