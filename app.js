class app {
	constructor() {
		if (app.instance) return app.instance;
		app.instance = this;
		return app.instance;
	}
	start = () => {
		// 여기에 앱 동작을 정의 하시면 됩니다.
		console.log("앱 만들어지는 중...");
	};
}
const App = new app();

module.exports = App;
