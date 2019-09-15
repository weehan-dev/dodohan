const Participant = require("../schema/participants.schema");

const makeParticipant = async person => {
	const { weehanId } = person;
	const existParticipant = Participant.find({ weehanId }).lean();
	console.log("exist? : ", existParticipant);
	if (existParticipant.length) {
		throw new Error("중복 참여");
	}
	await Participant.create(person);
};

exports.makeParticipant = makeParticipant;
