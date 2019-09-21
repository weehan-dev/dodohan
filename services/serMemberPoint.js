const modWeehanFactory = require("../models/modWeehan");

module.exports = {
	injectWeehanPoint: async user => {
		const modWeehan = await modWeehanFactory();
		const result = await modWeehan.getUserByIdWithSanctions(user.weehanId);
		if (result.find && result.userInfo.warning_title) {
			console.log(result.userInfo.warning_title);
			throw new Error("BLACKUSER");
		} else if (result.find && !result.userInfo.warning_title) {
			// 아이디가 있는데 경고 받은 유저도 아님
			user.point++;
			return true;
		} else {
			// 아이디가 없음 (위한 회원이 아님) -> 팀은 만들어지지만, 점수는 안올라감
			return false;
		}
	}
};
