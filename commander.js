#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const loaders = require("./loaders");
const app = require("./app");

program.version("0.0.1", "-v, --version").usage("[options]");

const dodohan = async () => {
	await loaders();
	let answer;
	while (true) {
		answer = await inquirer.prompt([
			{
				type: "list",
				name: "type",
				message: "원하는 작업이 뭔가요?",
				choices: [
					{ name: "DB에 참가자 넣기", value: "db" },
					{ name: "DB에 넣고 매칭까지", value: "match" },
					{ name: "매칭하기", value: "onlyMatch" },
					{ name: "매칭한 사람들에게 알림 보내기", value: "notification" },
					{ name: "전체 과정 자동 실행", value: "all" },
					{ name: "프로그램 종료", value: "quit" }
				]
			}
		]);

		switch (answer) {
			case "db":
				app.injectStart();
				break;
			case "match":
				app.injectStart();
				app.matchStart();
				break;
			case "onlyMatch":
				app.matchStart();
				break;
			case "notification":
				app.sendNotification();
				break;
			case "all":
				const confirm = await inquirer.prompt([
					{
						type: "list",
						name: "type",
						message:
							"전송을 포함한 모든 작업을 자동 처리 합니다. 확신하시나요?",
						choices: [
							{
								name: "YES",
								value: "y"
							},
							{
								name: "NO",
								value: "n"
							}
						]
					}
				]);
				if (confirm !== "n") continue;

				app.injectStart();
				app.matchStart();
				app.sendNotification();
				break;
			case "quit":
				process.exit();
		}
	}
};

dodohan();
