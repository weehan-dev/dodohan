const getDb = require("../loaders/tunnelLoader");

const modWeehanFactory = async () => {
	const Weehan = await getDb();
	return {
		getUserById: async userId => {
			let ret = {};

			const userInfo = await Weehan.query(
				`select * from xe_member where user_id = "${userId}"`
			);

			if (!!userInfo[0][0]) {
				ret.userInfo = userInfo[0][0];
				ret.find = true;
			} else {
				ret.find = false;
			}
			return ret;
		},

		getUserByIdWithSanctions: async userId => {
			const ret;
			const userInfoWithLeftJoin = await Weehan.query(
				`
					select u.user_id, u.member_srl, bu.warning_title
					from xe_member as u 
						left join xe_member_warning as bu
						on bu.member_srl = u.member_srl
					where u.user_id = '${userId}'
				`
			);
			if (!!userInfoWithLeftJoin[0][0]) {
				ret.userInfo = userInfoWithLeftJoin[0][0];
				ret.find = true;
			} else {
				ret.find = false;
			}
			return ret;
		},

		isUserInBlackList: async userId => {
			const isUserInBL = await Weehan.query(
				`
					select u.user_id, u.member_srl, bu.warning_title
					from xe_member as u 
						join xe_member_warning as bu
						on bu.member_srl = u.member_srl
					where u.user_id = '${userId}'
				`
			);
			return !!isUserInBL[0][0];
		}
	};
};

module.exports = modWeehanFactory;
