const dbLoader = require("./databaseLoader");
const config = require("../config");
const tunnel = require("./tunnelLoader");
module.exports = async () => {
	console.log("LOADER IS INITIALIZED");

	console.log("TUNNEL LOADER IS INITAILIZED");
	await tunnel();
	console.log("TUNNEL IS LOADED");
	console.log("DB LOADER IS INITIALIZED");
	await dbLoader(config.MONGO_URL);
	console.log("DB IS LOADED");

	await console.log("LOAD SUCCESSFULLY");
};
