const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  const { species } = data;
  const allResidents = species.find((currentElement) => currentElement.name === animal).residents;
  return allResidents.every((currentElement) => currentElement.age >= age);
}

module.exports = getAnimalsOlderThan;
