const mongoose = require("mongoose");

const {
	Schema,
	model,
	Types: { ObjectId }
} = mongoose;

/**
 * 참가자 스키마 입니다.
 */

const participantSchema = new Schema({
	school: { type: String, required: true, enum: ["hanyang", "others"] }, // 학교
	gender: { type: String, required: true, enum: ["male", "female"] }, // 성별
	weehanId: { type: String, unique: true }, // 위한 ID
	facebookLink: String, // 본인 계정 페이스북
	kakaoId: { type: String, required: true, unique: true }, // 카카오톡 아이디
	phoneNumber: { type: String, required: true, unique: true }, // 휴대폰 번호
	email: { type: String, required: true, unique: true }, // 이메일
	name: { type: String, required: true }, // 이름
	age: { type: Number, required: true }, // 나이
	isLeader: { type: Boolean, default: false }, // 팀장인지
	likesWeehan: { type: Boolean, default: false }, // 위한을 좋아요 했는지
	likesHDJ: { type: Boolean, default: false }, // 한대전을 좋아요 했는지
	team: { type: ObjectId, ref: "Team" }, // 소속된 팀
	hasTeam: { type: Boolean, default: false }, // 팀이 있는지? 1:1도 확장하더라도 무조건 팀으로 찾게 만들면 되서 다 팀이 잇는 걸로 만면 될 듯
	point: { type: Number, required: true, default: 0 } // 한대전, 위한 좋아요, 위한 멤버인지에 따른 포인트
});

module.exports = model("Participant", participantSchema);
