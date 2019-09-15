const mongoose = require("mongoose");

const {
	Schema,
	model,
	Types: { ObjectId }
} = mongoose;

const participantSchema = new Schema({
	school: { type: String, required: true, enum: ["hanyang", "hanyang.w"] },
	gender: { type: String, required: true, enum: ["male", "female"] },
	weehanId: { type: String, unique: true },
	facebookLink: String,
	kakaoId: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	age: { type: Number, required: true },
	isLeader: { type: Boolean, default: false },
	likesWeehan: { type: Boolean, default: false },
	likesHDJ: { type: Boolean, default: false },
	team: { type: ObjectId, ref: "Team" },
	hasTeam: { type: Boolean, default: false },
	point: { type: Number, required: true, default: 0 }
});

module.exports = model("Participant", participantSchema);
