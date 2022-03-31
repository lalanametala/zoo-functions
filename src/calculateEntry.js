const data = require('../data/zoo_data');

const { prices } = data;

function countEntrants(entrants) {
  return entrants.reduce((acc, currentEntrant) => {
    if (currentEntrant.age < 18) {
      acc.child += 1;
    } else if (currentEntrant.age < 50) {
      acc.adult += 1;
    } else {
      acc.senior += 1;
    }
    return acc;
  }, { child: 0, adult: 0, senior: 0 });
}

function calculateEntry(entrants) {
  // Checagem de objeto vazio alterada após dica do colega Raphael Martins
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const entr = countEntrants(entrants);
  return (entr.child * prices.child) + (entr.adult * prices.adult) + (entr.senior * prices.senior);
}

module.exports = { calculateEntry, countEntrants };
