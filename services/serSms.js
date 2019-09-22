const utilSms = require('../utils/utilSms');
const modTeam = require('../models/modTeams');

module.exports = {
    test: async () => {
        const teamList = await modTeam.getMatchedTeamList();
        await Promise.all(teamList.map(team =>
            utilSms.smsSend(team)
        ));
        console.log('메세지 완료');
    }
};
