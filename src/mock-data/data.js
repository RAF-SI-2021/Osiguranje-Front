import { faker } from '@faker-js/faker';

export const data = [
    {
        id: 1,
        name: 'Jovan',
        surname: 'Babic',
        jmbg: '1234567890123',
        email: 'jbabic3018rn@raf.rs',
        position: 'Junior Software Engineer',
        phone: '+381601234567',
        active: true
    },
    {
        id: 2,
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        jmbg: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
        email: faker.internet.email(),
        position: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber(),
        active: true
    },
    {
        id: 3,
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        jmbg: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
        email: faker.internet.email(),
        position: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber(),
        active: true
    },
    {
        id: 4,
        name: faker.name.firstName(),
        surname: faker.name.lastName(),
        jmbg: faker.datatype.number({ min: 1000000000000, max: 9999999999999 }).toString(),
        email: faker.internet.email(),
        position: faker.name.jobTitle(),
        phone: faker.phone.phoneNumber(),
        active: true
    }
]