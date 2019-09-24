const localDbLoader = require("../loaders/databaseLoader");
const tunnelDbLoader = require("../loaders/tunnelLoader");
const config = require("../config");

describe("loaders TEST", function() {
	this.timeout(5 * 1000);

	it("init local database", async () => {
		await localDbLoader(config.MONGO_URL);
	});

	it("init tunnel database", async () => {
		await tunnelDbLoader();
	});
});
