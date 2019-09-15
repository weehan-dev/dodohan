const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const { makeParticipant } = require("./models/participants");
const { makeTeam } = require("./models/teams");
const makePersonObjectList = require("./utils/makePersonObjectList");

const weehanPath = path.join(__dirname, "csv", "weehan");
const othersPath = path.join(__dirname, "csv", "others");

module.exports = async function() {
	try {
		const weehanCSV = await fs.readdirSync(weehanPath, { encoding: "utf8" });
		const othersCSV = await fs.readdirSync(othersPath, { encoding: "utf8" });

		const weehanParticipants = await csv().fromFile(
			path.join(weehanPath, weehanCSV[1])
		);

		const othersParticipants = await csv().fromFile(
			path.join(othersPath, othersCSV[1])
		);

		weehanParticipants.map(form => {
			const memberList = makePersonObjectList(form, "hanyang");

			Promise.all(memberList.map(member => makeParticipant(member)))
				.then()
				.catch(e => console.error(e));
		});

		othersParticipants.map(form => {
			const memberList = makePersonObjectList(form, "hanyang.w");

			Promise.all(memberList.map(member => makeParticipant(member))).catch(e =>
				console.error(e)
			);
		});
	} catch (e) {
		console.error(e);
	}
};
