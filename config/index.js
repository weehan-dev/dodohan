require("dotenv").config();
const path = require("path");

module.exports = {
	MONGO_URL: process.env.MONGO_URL,
	WEEHAN_BASE_PATH: path.join(__dirname, "..", "csv", "weehan"),
	OTHERS_BASE_PATH: path.join(__dirname, "..", "csv", "others"),
	TUNNEL_SSH: {
		USERNAME: process.env.SSH_USERNAME,
		HOST: process.env.SSH_HOST,
		PORT: process.env.SSH_PORT,
		PASSWORD: process.env.SSH_PASSWORD
	},
	TUNNEL_DB: {
		HOST: process.env.TUNNEL_DB_HOST,
		USERNAME: process.env.TUNNEL_DB_USERNAME,
		PASSWORD: process.env.TUNNEL_DB_PASSWORD,
		DATABASE: process.env.TUNNEL_DB_NAME,
		PORT: process.env.TUNNEL_DB_PORT,
		CONNECTION: process.env.TUNNEL_DB_CONNECTION
	},
	EMAIL_INFO: {
		ID: process.env.GMAIL_ID,
		PW: process.env.GMAIL_PW,
		PROAL: process.env.NAVER_PROAL,
        TEST1: process.env.NAVER_PROAL,
        TEST2: process.env.TEST_EMAIL
	},
	SMS_INFO:{
		// KEY: process.env.SOLAPI_API_KEY,
		// SECRET: process.env.SOLAPY_API_SECRET
		KEY: 'NCSYYSLYN6BKLUXL',
		SECRET: '94DKGGNGPIMWQQMJFQATURUUQRMROXCV'
	}
};
