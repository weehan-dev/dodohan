const mongoose = require("mongoose");

/**
 * DB 연결한 부분입니다. 신경 안쓰셔도 됩니다.
 */

module.exports = mongodbUrl => {
	function connect(url) {
		mongoose.connect(
			url,
			{ useNewUrlParser: true, useCreateIndex: true },
			function(err) {
				if (err) {
					console.error("mongodb connection error", err);
				}
				console.log("mongodb connected");
			}
		);
	}
	connect(mongodbUrl);
	mongoose.connection.on("disconnected", connect);
	require("./participants.schema");
	require("./teams.schema");
};
