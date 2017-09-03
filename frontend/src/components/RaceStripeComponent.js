import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom';
import locale from '@/locale';

import CarComponent from '@/components/CarComponent';

export default class RaceStripeComponent extends React.Component {
    static propTypes = {
        isCurrentPlayer: PropTypes.bool,
        readyToPlay: PropTypes.bool,
    };

    updatePositions() {
        const $car = ReactDOM.findDOMNode(this.refs.car).children[0];
        const $stripeDesc = ReactDOM.findDOMNode(this.refs.stripeDesc);
        const $stripe = ReactDOM.findDOMNode(this.refs.stripe);
        const { sourceText } = this.props;

        const raceLengthInPx = $stripe.offsetWidth - 220;
        const step = raceLengthInPx / sourceText.length;

        $car.style.left = `${parseInt(this.props.position * step, 10)}px`;
        $stripeDesc.style.left = $car.style.left;
    }

    componentDidMount() {
        this.updatePositions();
    }

    componentDidUpdate() {
        this.updatePositions();
    }

    render() {
        const {
            racesCount = -1,
            finished,
            isCurrentPlayer,
            readyToPlay,
            username,
            place,
            errorsInPrint,
            finishedTime,
            speed,
            averageSpeed,
            carModel,
            sourceText,
        } = this.props;

        const errorInPercents = (((errorsInPrint || 0) * 100) / sourceText.length).toFixed(2);
        const time = moment()
            .startOf('day')
            .seconds(parseInt(finishedTime / 1000, 10) || 0)
            .format('mm:ss');

        return (
            <div ref="stripe" className='stripe'>
                <div ref="stripeDesc" className='stripe-desc'>
                    <span className={readyToPlay ? 'stripe-ready stripe-ready-yes' : 'stripe-ready'}></span>
                    <span>
                        {isCurrentPlayer ? (<strong>It's you</strong>) : username }
                        {racesCount > 10 &&
                            (<i className="award" title="A medal for 10 runs texts"></i>)
                        }
                        {racesCount > 0 &&
                            (<span className="stripe-desc-stats">races: <strong>{racesCount}</strong></span>)
                        }
                    </span>
                </div>
                {finished &&
                    (<div className='stripe-result'>
                        <span>{place} Place&nbsp;&nbsp;&nbsp;{time}&nbsp;&nbsp;&nbsp;{speed.toFixed(2)} chars/min&nbsp;&nbsp;&nbsp;{errorsInPrint} errors ({errorInPercents}%)</span>
                    </div>)
                }
                <div ref="car" className={finished ? 'car-wrapper car-wrapper-finished' : 'car-wrapper'}>
                    <CarComponent
                        model={carModel} />
                </div>
            </div>
        );
    }
}
