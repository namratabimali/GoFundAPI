const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fundraising', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
