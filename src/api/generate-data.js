import faker from 'faker';

function generateData() {
  const foodtrucks = [];
  const users = [];
  const reservations = [];

  for (let i = 1; i <= 2; i++) {
    foodtrucks.push({ id: i, name: `Food Truck ${i}` });
  }

  for (let i = 1; i <= 2; i++) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    users.push({ id: i, name, email });
  }

  for (let i = 1; i <= 3; i++) {
    const foodtruckId = i <= 2 ? i : 1;
    const date = faker.date.between('2023-05-05', '2023-05-07').toISOString();
    const userId = i % 2 === 0 ? 2 : 1;
    reservations.push({ id: i, foodtruckId, date, userId });
  }

  return { foodtrucks, users, reservations };
}
