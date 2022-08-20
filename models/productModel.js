const mongoose = require('mongoose');

const product = mongoose.model("Product", {
    title: {type: {}},
    image: {type: String},
    description: {type: String},
    creater: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    goal: {type: Number},
    raised: {type: Number, default: 0},
    category: {type: String},
    date: {type: Date, default: new Date(Date.now())}
})

module.exports = product;