const data = require('../data/zoo_data');

const { employees, species } = data;
const namesAndIds = employees.reduce((acc, currEmp) => {
  acc.push(currEmp.firstName, currEmp.id, currEmp.lastName);
  return acc;
}, []);

const getSpecies = (animals) => animals.reduce((acc, currAnimal) => {
  acc.push(species.find((animal) => animal.id === currAnimal).name);
  return acc;
}, []);

const getLocations = (animals) => animals.reduce((acc, currAnimal) => {
  acc.push(species.find((animal) => animal.id === currAnimal).location);
  return acc;
}, []);

const defaultCoverage = () => employees.reduce((acc, curEmplo) => {
  const newObject = {
    id: curEmplo.id,
    fullName: `${curEmplo.firstName} ${curEmplo.lastName}`,
    species: getSpecies(curEmplo.responsibleFor),
    locations: getLocations(curEmplo.responsibleFor),
  };
  acc.push(newObject);
  return acc;
}, []);

const argName = (name) => {
  if (!namesAndIds.includes(name)) {
    throw new Error('Informações inválidas');
  }
  return defaultCoverage().find((currEmp) => currEmp.fullName.includes(name));
};

const argID = (id) => {
  if (!namesAndIds.includes(id)) {
    throw new Error('Informações inválidas');
  }
  return defaultCoverage().find((currEmp) => currEmp.id === id);
};

function getEmployeesCoverage(arg) {
  if (arg === undefined) {
    return defaultCoverage();
  }
  if (arg.name) {
    return argName(arg.name);
  }
  if (arg.id) {
    return argID(arg.id);
  }
}

module.exports = getEmployeesCoverage;
