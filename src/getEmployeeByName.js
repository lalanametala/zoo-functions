const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const { employees } = data;
  return employees.find((currentEmployee) => {
    const currentFirstName = currentEmployee.firstName;
    const currentLastName = currentEmployee.lastName;
    return currentFirstName === employeeName || currentLastName === employeeName;
  });
}

module.exports = getEmployeeByName;
