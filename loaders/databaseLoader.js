const mongoose = require("mongoose");

const connect = async dbUrl => {
	await mongoose.connect(dbUrl, {
		useNewUrlParser: true,
		useCreateIndex: false
	});
	console.log("MongoDB 연결 성공");
};

module.exports = async dbUrl => {
	await connect(dbUrl);

	mongoose.connection.on("error", e => {
		console.error(e);
		console.log("**** DB 에러 있음 ****");
	});

	mongoose.connection.on("disconnected", async () => {
		console.log("**** DB 재연결 시도 ****");
		await connect(dbUrl);
	});
};
