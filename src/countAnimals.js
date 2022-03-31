const data = require('../data/zoo_data');

const { species } = data;

function countAnimals(animal) {
  if (animal === undefined) {
    return species.reduce((acc, currentElement) => {
      const currentKey = currentElement.name;
      const currentValue = currentElement.residents.length;
      acc[currentKey] = currentValue;
      return acc;
    }, {});
  }
  const { residents } = species.find((currentAnimal) => currentAnimal.name === animal.specie);
  if (Object.keys(animal).length === 1) {
    return residents.length;
  }
  return residents.reduce((acc, curr) => (curr.sex === animal.sex ? acc + 1 : acc), 0);
}

console.log(countAnimals());
module.exports = countAnimals;
