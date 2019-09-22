const mongoose = require("mongoose");

const {
	Schema,
	model,
	Types: { ObjectId }
} = mongoose;

/**
 * 팀 스키마 입니다.
 */

const teamSchema = new Schema(
	{
		gender: { type: String, required: true, enum: ["male", "female"] }, // 팀 성별
		school: { type: String, required: true, enum: ["hanyang", "others"] }, // 팀 학교
		preferAge: [Number], // 선호하는 나이대 (중복 설정 가능)
		leader: { type: ObjectId, ref: "Participant", required: true },
		matchingType: { type: Number, enum: [1, 2, 3] }, // 1:1 ~ 3:3 의미
		members: [{ type: ObjectId, ref: "Participant" }], // 멤버들
		isMatched: { type: Boolean, default: false }, // 매칭 되었나?
		partnerTeam: { type: ObjectId, ref: "Team" }, // 파트너 팀 (매칭 된 경우만)
		avgAge: { type: Number, required: true }, // 평균 나이대 (상대방이 검색 시에 나타남)
		teamPoint: { type: Number, required: true }, // 좋아요 숫자 + 팀에 인증된 위한 유저 수 (팀원들의 포인트를 모두 더함)
		ages: [{ type: Number }]
	},
	{
		timestamps: true
	}
);

const db = model("Team", teamSchema);
module.exports = db;
