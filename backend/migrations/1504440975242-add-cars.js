require('dotenv-extended').load();
require('./utils');

const { Car } = require('../app/models');

const cars = [
    {
        model: 'Duesenberg Speedster',
        image: '1.png',
    },
    {
        model: 'Ferrari 250 Testa Rossa',
        image: '2.png',
    },
    {
        model: 'Dodge Viper',
        image: '3.png',
    },
    {
        model: 'Ferrari FX Concept',
        image: '4.png',
    },
    {
        model: 'Smart Fortwo',
        image: '5.png',
    },
    {
        model: 'Bugatti Veyron',
        image: '6.png',
    },
    {
        model: 'Lamborghini Murcielago',
        image: '7.png',
    },
    {
        model: 'Ferrari Zobin',
        image: '8.png',
    },
    {
        model: 'Batmobile',
        image: '9.png',
    },
    {
        model: 'F1',
        image: '10.png',
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
