const data = require('../data/zoo_data');

const { species } = data;

// Função para gerar objeto quando não tem parâmetro passado
const getEmptyOptions = () => species.reduce((acc, currentAnimal) => {
  if (acc[currentAnimal.location]) acc[currentAnimal.location].push(currentAnimal.name);
  else acc[currentAnimal.location] = [currentAnimal.name];
  return acc;
}, {});

// Função para gerar um array contendo todas as localizações
const getAllLocations = () => species.reduce((acc, currentAnimal) => {
  if (!acc.includes(currentAnimal.location)) acc.push(currentAnimal.location);
  return acc;
}, []);

// Função para gerar array com o nome dos animais
const makeNameArray = (residents, sex) => {
  let allResidents = residents;
  if (sex) allResidents = allResidents.filter((currentResident) => currentResident.sex === sex);
  return allResidents.reduce((acc, curr) => {
    acc.push(curr.name);
    return acc;
  }, []);
};

// Função para gerar array com o nome dos animais com ordenação
const makeAnimalObject = (currLocation, sort, sex) => {
  const filteredSpec = species.filter((currentAnimal) => currentAnimal.location === currLocation);
  return filteredSpec.reduce((acc, curr) => {
    const newObj = {};
    if (sort && sex) newObj[curr.name] = makeNameArray(curr.residents, sex).sort();
    else if (sort) newObj[curr.name] = makeNameArray(curr.residents).sort();
    else if (sex) newObj[curr.name] = makeNameArray(curr.residents, sex);
    else newObj[curr.name] = makeNameArray(curr.residents);
    acc.push(newObj);
    return acc;
  }, []);
};

// Função para gerar objeto com o nome dos animais categorizados por localização
const getIncludeNamesAnimals = (sort, sex) => {
  const regionsArray = getAllLocations();
  if (!sort && !sex) {
    return regionsArray.reduce((acc, currentRegion) => {
      acc[currentRegion] = makeAnimalObject(currentRegion);
      return acc;
    }, {});
  }
  if (sort && !sex) {
    return regionsArray.reduce((acc, currentRegion) => {
      acc[currentRegion] = makeAnimalObject(currentRegion, sort);
      return acc;
    }, {});
  }
  return regionsArray.reduce((acc, currentRegion) => {
    acc[currentRegion] = makeAnimalObject(currentRegion, sort, sex);
    return acc;
  }, {});
};

const notSorted = (options) => {
  if (!options.sex) return getIncludeNamesAnimals();
  return getIncludeNamesAnimals(false, options.sex);
};

function getAnimalMap(options) {
  if (!options || !options.includeNames) return getEmptyOptions();
  if (!options.sorted) return notSorted(options);
  if (!options.sex) return getIncludeNamesAnimals(options.sorted);
  return getIncludeNamesAnimals(options.sorted, options.sex);
}

module.exports = getAnimalMap;
