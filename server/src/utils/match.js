const natural = require('natural');

const match = async (user, teams) => {
    const matches = await teams.map(team => {
        const matchPercentage = natural.JaroWinklerDistance(user, team, undefined, true) * 100;
        return { team, matchPercentage };
      });
    
      return matches;
};

module.exports = match;