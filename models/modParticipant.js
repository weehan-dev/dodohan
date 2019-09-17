const Participant = require("./schema/participants.schema");

module.exports = {
	makeParticipant: async person => {
		const participant = await Participant.create(person).lean();
		return participant;
	},
	makeBulkInsert: async people => {
		const ret = await Participant.bulkWrite([
			people.map(person => ({
				insertOne: { document: person }
			}))
		]);

		console.log(ret);
		return { ret, result: true };
	},
	checkDuplicated: async person => {
		const { kakaoId, phoneNumber, email } = person;
		const existUser = await Participant.findOne({
			kakaoId,
			phoneNumber,
			email
		}).lean();
		if (existUser) throw new Error("DUPLICATED");
		return true;
	}
};
