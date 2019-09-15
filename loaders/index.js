const dbLoader = require("./databaseLoader");
const config = require("../config");

module.exports = async () => {
	console.log("LOADER IS INITIALIZED");
	console.log("DB LOADER IS INITIALIZED");
	await dbLoader(config.MONGO_URL);

	console.log("LOAD SUCCESSFULLY");
};
