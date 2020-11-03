const statsQuery = (period = 'season') => {
  const aliasLookup = {
    season: 'sp',
    week: 'wp',
  };
  const alias = aliasLookup[period];

  return `SELECT
t.name as teamName,
${alias}.savesTier2,
p.lastName,
${alias}.savesTier1,
${alias}.subs,
${alias}.motms,
${alias}.points,
${alias}.redCards,
${alias}.concedes,
${alias}.assists,
${alias}.shotsTier1,
${alias}.shotsTier2,
${alias}.playerId as id,
${alias}.starts,
${alias}.goals,
${alias}.tacklesTier1,
${alias}.tacklesTier2,
${alias}.ownGoals,
${alias}.cleansheets,
${alias}.penSaves,
p.firstName,
${alias}.penMisses,
${alias}.passesTier1,
p.position,
${alias}.passesTier2,
${alias}.yellowCards
FROM practical.${period}Players ${alias}
inner join players p on ${alias}.playerId = p.id
inner join teams t on p.teamid = t.id;`;
};

module.exports = { statsQuery };
