const data = require('../data/zoo_data');

function getSpeciesByIds(...ids) {
  if (ids === undefined) {
    return [];
  }
  const { species } = data;
  return ids.reduce((acc, currentID) => {
    acc.push(species.find((currentElement) => currentElement.id === currentID));
    return acc;
  }, []);
}

module.exports = getSpeciesByIds;
