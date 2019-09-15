const mongoose = require("mongoose");

const {
	Schema,
	model,
	Types: { ObjectId }
} = mongoose;

const teamSchema = new Schema(
	{
		gender: { type: String, required: true, enum: ["male", "female"] },
		school: { type: String, required: true, enum: ["hanyang", "hanyang.w"] },
		preferSchool: {
			type: String,
			required: true,
			enum: ["both", "hanyang", "hayang.w"]
		}, //심볼을 쓰면 좋을 것 같은데
		preferAge: [Number],
		leader: { type: ObjectId, ref: "Participant", required: true },
		matchingType: { type: Number, enum: [1, 2, 3] },
		members: [{ type: ObjectId, ref: "Participant" }],
		isMatched: { type: Boolean, default: false },
		partnerTeam: { type: ObjectId, ref: "Team" },
		avgAge: { type: Number, required: true },
		likesCount: { type: Number, required: true }
	},
	{
		timestamps: true
	}
);

module.exports = model("Team", teamSchema);
