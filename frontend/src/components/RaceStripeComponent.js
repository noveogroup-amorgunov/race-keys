import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';

import locale from '@/locale';

export default class RaceStripeComponent extends React.Component {
    static propTypes = {
        // race: PropTypes.object,
        // isCurrentPlayer: PropTypes.boolean,
        // errorCode: PropTypes.string,
        // readyToPlay: PropTypes.func.isRequired,
    };

    render() {
        const { isCurrentPlayer, readyToPlay, name } = this.props;

        return (
            <div className='stripe'>
                <div className='stripe-desc'>
                    <span className={readyToPlay ? 'stripe-ready stripe-ready-yes' : 'stripe-ready'}></span>
                    {isCurrentPlayer
                        ? (<strong>It's you</strong>)
                        : (<span>{name}<span className="stripe-desc-stats">races: <strong>53</strong></span></span>)
                    }
                </div>
                <div className='car-wrapper'>
                    <div className='car'></div>
                </div>
            </div>
        );
    }
}
