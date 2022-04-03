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

export const stocks = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    stock_name: faker.company.companyName(),
    symbol: faker.random.arrayElement(['MSFT', 'GGL', 'SMM', 'FKR', 'QWE', 'OPRS', 'TSL', 'AMZN']),
    country: faker.address.country(),
    currency: faker.finance.currencyName(),
    time_zone: faker.random.arrayElement(['UTC-7', 'UTC-6', 'UTC-5', 'UTC-4', 'UTC-3', 'UTC-2', 'UTC+1', 'UTC+2', 'UTC+3']),
}));

export const listings = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    stock_symbol: faker.random.arrayElement(['MSFT', 'GGL', 'SMM', 'FKR', 'QWE', 'OPRS', 'TSL', 'AMZN']),
    description: faker.company.companyName(),
    stock_market: faker.random.arrayElement(['NYSE', 'TSE', 'LSE', 'NASDAQ']),
    last_updated: faker.date.past(10),
    price: faker.random.number({min: 0, max: 1000, precision: .01}),
    ask: faker.random.number({min: 0, max: 1000, precision: .01}),
    bid: faker.random.number({min: 0, max: 1000, precision: .01}),
    change: faker.random.number({min:0, max:2, precision: .01}),
    volume: faker.random.number({min:10000000, max:99999999}),
    listing_type: faker.random.arrayElement(['ACTION', 'FOREX', 'FUTURE']),
    initial_margin_cost: faker.datatype.number({ min: 0, max: 1000, precision: .01 })
}));

// For historical data, maybe put it in a .env later
export const apiKey = '83560be253a04a8a944edf4d6488cd41';