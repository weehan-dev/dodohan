const config = require("../config");
const utils = require("util");
const tunnel = utils.promisify(require("tunnel-ssh"));
const Sequelize = require("sequelize");

const tunnelConfig = {
	username: config.TUNNEL_SSH.USERNAME,
	host: config.TUNNEL_SSH.HOST,
	port: config.TUNNEL_SSH.PORT,
	dstHost: config.TUNNEL_DB.HOST,
	dstPort: config.TUNNEL_DB.PORT,
	password: config.TUNNEL_SSH.PASSWORD,
	keepAlive: true
};

function SingletonDb() {
	let sequelize;
	return async () => {
		if (sequelize) return sequelize;
		await tunnel(tunnelConfig);
		sequelize = new Sequelize(
			config.TUNNEL_DB.DATABASE,
			config.TUNNEL_DB.USERNAME,
			config.TUNNEL_DB.PASSWORD,
			{ dialect: "mysql", logging: false }
		);
		await sequelize.authenticate();
		return sequelize;
	};
}

const getDb = SingletonDb();

module.exports = getDb;
