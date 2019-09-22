const utilSms = require('../utils/utilSms');
const modTeam = require('../models/modTeams');

module.exports = {
    sendMessageToMatchedTeam: async () => {
        const teamList = await modTeam.getMatchedTeamList();
        await Promise.all(teamList.map(team =>
            utilSms.smsSend(team)
        ));
    },
    sendMessageToUnmatchedTeam: async () =>{
        const teamList = await modTeam.getUnmatchedTeamList();
        await Promise.all(teamList.map(team =>
            utilSms.smsSendUnmatched(team)
        ));
    }
};
