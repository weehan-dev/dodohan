require("dotenv").config();
const path = require("path");
const fs = require("fs");

const db = require("./schema");

db(process.env.MONGO_URL);
const inject = require("./injectDb");

(async function() {
	await inject();
	console.log("마침");
})();
