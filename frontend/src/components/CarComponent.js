import React from 'react';

function CarComponent({ model = 1 } = {}) {
    const classes = ['car-body', `car-body-${model}`].join(' ');
    return (
        <div className='car'>
            <div className={classes}></div>
        </div>
    );
}

export default CarComponent;
