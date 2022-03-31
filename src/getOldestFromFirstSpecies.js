const data = require('../data/zoo_data');

const { species, employees } = data;

const getSpecies = (id) => employees.find((currEmplo) => currEmplo.id === id).responsibleFor[0];

function getOldestFromFirstSpecies(id) {
  const namesArray = species
    .find((currSpe) => currSpe.id === getSpecies(id))
    .residents.sort((a, b) => b.age - a.age);
  return [namesArray[0].name, namesArray[0].sex, namesArray[0].age];
}

console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
module.exports = getOldestFromFirstSpecies;
