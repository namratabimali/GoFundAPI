const mongoose = require('mongoose');

const donate = mongoose.model("Purchase", {
    campaign: {type: mongoose.Schema.Types.ObjectId, ref: "Product"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, default: new Date(Date.now())},
    amount: {type: Number}
})

module.exports = donate;