class app {
	constructor() {
		if (app.instance) return app.instance;
		app.instance = this;
		return app.instance;
	}
	start = () => {
		console.log("앱 만들어지는 중...");
	};
}
const App = new app();

module.exports = App;
