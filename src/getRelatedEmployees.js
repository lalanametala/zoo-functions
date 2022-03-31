const data = require('../data/zoo_data');

const { employees } = data;

function isManager(id) {
  const managers = employees.reduce((acc, curr) => acc.concat(curr.managers), []);
  return (managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  return employees.reduce((acc, currentEmployee) => {
    if (currentEmployee.managers.includes(managerId)) {
      acc.push(`${currentEmployee.firstName} ${currentEmployee.lastName}`);
    }
    return acc;
  }, []);
}

module.exports = { isManager, getRelatedEmployees };
