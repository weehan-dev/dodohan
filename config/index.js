require("dotenv").config();
const path = require("path");
module.exports = {
	MONGO_URL: process.env.MONGO_URL,
	WEEHAN_BASE_PATH: path.join(__dirname, "..", "csv", "weehan"),
	OTHERS_BASE_PATH: path.join(__dirname, "..", "csv", "weehan")
};
