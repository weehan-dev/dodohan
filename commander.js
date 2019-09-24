const program = require("commander");
const inquirer = require("inquirer");
const loaders = require("./loaders");
const app = require("./app");

program.version("0.0.1", "-v, --version").usage("[options]");

const dodohan = async () => {
	await loaders();
	let answer = "start";
	let temp = {};
	while (true) {
		switch (answer) {
			case "start":
				temp = await inquirer.prompt([
					{
						type: "list",
						name: "type",
						message: "원하는 작업이 뭔가요?",
						choices: [
							{ name: "문자 한정 전송", value: "limit" },
							{ name: "남자 매칭 상황", value: "mInfo" },
							{ name: "여자 매칭 상황", value: "wInfo" },
							{ name: "프로그램 종료", value: "quit" }
						]
					}
				]);
				answer = temp.type;
				break;
			case "limit":
				await app.smsLimited();
				answer = "start";
				break;
			case "onlyMatch":
				await app.matching();
				answer = "start";
				break;
			case "rematch":
				await app.rematch();
				answer = "start";
				break;
			case "mInfo":
				await app.checkManInfo();
				answer = "start";
				break;
			case "wInfo":
				await app.checkWomanInfo();
				answer = "start";
				break;
			case "mail":
				await app.mailingStart();
				answer = "start";
				break;
			case "sms":
				await app.messageStart();
				anwer = "start";
				break;
			case "quit":
				process.exit();
		}
	}
};

dodohan();
