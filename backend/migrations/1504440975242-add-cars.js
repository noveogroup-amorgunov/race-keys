require('dotenv-extended').load();
require('./utils');

const { Car } = require('../app/models');

const cars = [
    {
        name: 'Duesenberg Speedster',
        model: '1',
    },
    {
        name: 'Ferrari 250 Testa Rossa',
        model: '2',
    },
    {
        name: 'Dodge Viper',
        model: '3',
    },
    {
        name: 'Ferrari FX Concept',
        model: '4',
    },
    {
        name: 'Smart Fortwo',
        model: '5',
    },
    {
        name: 'Bugatti Veyron',
        model: '6',
    },
    {
        name: 'Lamborghini Murcielago',
        model: '7',
    },
    {
        name: 'Ferrari Zobin',
        model: '8',
    },
    {
        name: 'Batmobile',
        model: '9',
    },
    {
        name: 'F1',
        model: '10',
    },
];

exports.up = async (next) => {
    await Promise.all(cars.map(async (carData) => {
        await Car.create(carData);
    }));
    next();
};

exports.down = async (next) => {
    await Car.remove({});
    next();
};
