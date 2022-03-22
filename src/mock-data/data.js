import { faker } from '@faker-js/faker';

export const data = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: faker.name.findName(),
    surname: faker.name.lastName(),
    jmbg: faker.random.number({ min: 100000000, max: 999999999 }),
    email: faker.internet.email(),
    position: faker.name.jobTitle(),
    phone: faker.phone.phoneNumber(),
    active: faker.random.boolean(),
}));