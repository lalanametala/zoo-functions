const data = require('../data/zoo_data');

const { hours, species } = data;
const weekDays = Object.keys(hours);
const allAnimals = species.reduce((acc, currAnim) => {
  acc.push(currAnim.name);
  return acc;
}, []);

const offHour = (day) => `Open from ${hours[day].open}am until ${hours[day].close}pm`;

const exhibitionAnimals = (day) => {
  const includedAnimals = species.filter((currAnim) => currAnim.availability.includes(day));
  return includedAnimals.reduce((acc, currAnim) => {
    acc.push(currAnim.name);
    return acc;
  }, []);
};

const defaultSchedule = () => weekDays.reduce((acc, currDay) => {
  if (currDay === 'Monday') {
    acc[currDay] = {
      officeHour: 'CLOSED',
      exhibition: 'The zoo will be closed!',
    };
  } else {
    acc[currDay] = {
      officeHour: offHour(currDay),
      exhibition: exhibitionAnimals(currDay),
    };
  }
  return acc;
}, {});

function getSchedule(scheduleTarget) {
  if (weekDays.includes(scheduleTarget)) {
    const returnObj = {};
    returnObj[scheduleTarget] = defaultSchedule()[scheduleTarget];
    return returnObj;
  }
  if (allAnimals.includes(scheduleTarget)) {
    return species.find((currAnim) => currAnim.name === scheduleTarget).availability;
  }
  return defaultSchedule();
}

module.exports = getSchedule;
