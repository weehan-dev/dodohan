const csv = require("csvtojson");
const fs = require("fs");
const path = require("path");
const config = require("../config");

module.exports = {
	csvParser: async path => {
		const jsonArray = await csv().fromFile(path);
		return jsonArray;
	},

	formPathMaker: () => {
		const whForm = fs.readdirSync(config.WEEHAN_BASE_PATH)[0];
		const whPath = path.join(config.WEEHAN_BASE_PATH, whForm);

		const otForm = fs.readdirSync(config.OTHERS_BASE_PATH)[0];
		const otPath = path.join(config.OTHERS_BASE_PATH, otForm);
		const ret = {
			whPath,
			otPath
		};
		return ret;
	}
};

/**
 * inject DB 하는 곳
 */
