const statsQuery = (period = 'season', periodId) => {
  const aliasLookup = {
    season: 'sp',
    week: 'wp',
    month: 'mp',
  };
  // Safe to disable as we validate period before calling this function
  // eslint-disable-next-line security/detect-object-injection
  const alias = aliasLookup[period];
  const whereClause = periodId
    ? `where ${alias}.${period}id = ${periodId};`
    : '';

  const selectClause = `SELECT
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
inner join teams t on p.teamid = t.id`;

  //   If there is a period id it means there is some filtering to be done by week/month id
  return periodId ? `${selectClause} ${whereClause}` : `${selectClause};`;
};

module.exports = { statsQuery };
