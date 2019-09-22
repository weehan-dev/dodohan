const modParticipant = require("../models/modParticipant");
const serMemberPoint = require("./serMemberPoint");
const { createBaseMember } = require("../utils/utilTeam");
const modHdjLikes = require("../models/modHdjLikes");
const modWhLikes = require("../models/modWhLikes");

const checkUserFbLink = async user => {
	let ret;
	ret = await modHdjLikes.checkUserLink(user.facebookLink);
	if (ret) user.point++;
	ret = await modWhLikes.checkUserLink(user.facebookLink);
	if (ret) user.point++;
	return;
};

module.exports = {
	injectWeehanMembers: async rawForm => {
		const { leader, mem1, mem2 } = createBaseMember(rawForm, "hanyang");
		const users = [leader, mem1, mem2];
		try {
			await Promise.all(
				users.map(user => modParticipant.checkDuplicated(user))
			);
			await Promise.all(
				users.map(user => serMemberPoint.injectWeehanPoint(user))
			);

			await Promise.all(users.map(user => checkUserFbLink(user)));

			//TODO: ret 안에 생성된 유저들이 있어야 함 확인 못해봄
			const ret = await Promise.all(
				users.map(user => modParticipant.makeParticipant(user))
			);
			return { result: true, ret };
		} catch (e) {
			return { result: false };
		}
	},
	injectOthersMembers: async rawForm => {
		const { leader, mem1, mem2 } = createBaseMember(rawForm, "others");
		const users = [leader, mem1, mem2];
		try {
			await Promise.all(
				users.map(user => modParticipant.checkDuplicated(user))
			);

			await Promise.all(users.map(user => checkUserFbLink(user)));

			const ret = await Promise.all(
				users.map(user => modParticipant.makeParticipant(user))
			);

			return { result: true, ret };
		} catch (e) {
			return { result: false };
		}
	}
};
