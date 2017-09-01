import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';

import locale from '@/locale';


/*
id: this.id,
readyToPlay: this.readyToPlay,
race: this.race,
place: this.place,
position: this.position,
errorsInPrint: this.errorsInPrint,
finished: this.finished,
finishedTime: this.finishedTime,
socketId: this.socketId,
username: this.name,
*/

export default class RaceStripeComponent extends React.Component {
    static propTypes = {
        isCurrentPlayer: PropTypes.bool,
        readyToPlay: PropTypes.bool,
    };

    updatePositions() {
        const $car = ReactDOM.findDOMNode(this.refs.car);
        const { sourceText } = this.props;

        const raceLengthInPx = ReactDOM.findDOMNode(this.refs.stripe).offsetWidth - 220;
        const step = raceLengthInPx / sourceText.length;
        // const currentPositionInPx = 

        $car.style.left = `${+this.props.position}px`;

        console.log(raceLengthInPx, step, sourceText.length);
    }

    getNewCarPosition(currentPosition, step) {
        return `${+currentPosition + step}px`;
    }

    componentDidMount() {
        this.updatePositions();
    }

    componentDidUpdate() {
        console.log('RaceStripeComponent::componentDidUpdate');
        this.updatePositions();
    }

    render() {
        const { isCurrentPlayer, readyToPlay, username } = this.props;


        return (
            <div ref="stripe" className='stripe'>
                <div className='stripe-desc'>
                    <span className={readyToPlay ? 'stripe-ready stripe-ready-yes' : 'stripe-ready'}></span>
                    {isCurrentPlayer
                        ? (<strong>It's you</strong>)
                        : (<span>{username}<span className="stripe-desc-stats">races: <strong>53</strong></span></span>)
                    }
                </div>
                <div className='car-wrapper'>
                    <div ref="car" className='car'>
                        <div className='car-body'>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
