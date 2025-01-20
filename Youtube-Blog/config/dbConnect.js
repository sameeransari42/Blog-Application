const {connect} = require("mongoose");

async function connectMongoDB(url) {
    return connect(url);
}

module.exports = connectMongoDB;