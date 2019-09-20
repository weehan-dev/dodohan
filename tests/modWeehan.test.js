const { expect } = require("chai");
const modWeehanFactory = require("../models/modWeehan");

describe("modWeehan TEST", function() {
	let modWeehan;
	before(async () => {
		modWeehan = await modWeehanFactory();
	});
	this.timeout(5 * 1000);

	it("getUserById: it is expected to return user info when it takes user id.", async () => {
		const result = await modWeehan.getUserById("changhoi0522");
		expect(result.success && result.userInfo.user_id).to.equal("changhoi0522");
	});

	it("getUserById: it will return false if there is no user with given user id.", async () => {
		const result = await modWeehan.getUserById("changhoi00100");
		expect(result.success).to.be.false;
	});

	it("isUserInBlackList: it should return false if it takes none black user's id", async () => {
		const isUserInBL = await modWeehan.isUserInBlackList("changhoi0522");
		expect(isUserInBL).to.be.false;
	});

	it("isUserInBlackList: it should return true if it takes black user's id", async () => {
		const isUserInBL = await modWeehan.isUserInBlackList("ucan10");
		expect(isUserInBL).to.be.true;
	});
});
