import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';

import RaceStripeComponent from '@/components/RaceStripeComponent';
import { gameStatuses } from '@/constants';
import locale from '@/locale';

export default class RaceComponent extends React.Component {
    static propTypes = {
        race: PropTypes.object,
        gameState: PropTypes.object,
        errorCode: PropTypes.string,
        readyToPlay: PropTypes.func.isRequired,
    };

    render() {
        if (this.props.errorCode) {
            return (<div>{locale.errors[this.props.errorCode]}</div>);
        }

        if (!this.props.race || !this.props.gameState || !this.props.gameState.me) {
            return (<span>Loading</span>);
        }

        const gameState = this.props.gameState;
        const { me, others: players } = gameState;

        // console.log(gameState);
        // console.log(gameStatuses.WAIT_PLAYERS);

        return (
            <div className='race'>
                {gameState.game.status === gameStatuses.WAIT_PLAYERS
                    ? (
                        <div style={ { marginBottom: '5px' } }>
                            <span className="hint">Hint: </span>Game started, when all racer click to <strong>"Ready to play"</strong> button.
                        </div>
                    )
                    : (
                        <div>Game started! Run run run!</div>
                    )
                }

                {!me.readyToPlay
                    ? (<a onClick={this.props.readyToPlay} className="button">Ready to play</a>)
                    : (<div>You are ready to play!</div>)
                }

                <div className="stripes">
                    <div className="finish-line"></div>
                    <RaceStripeComponent
                        isCurrentPlayer={true}
                        readyToPlay={me.readyToPlay} />
                    {players.map(player => (<RaceStripeComponent readyToPlay={player.readyToPlay} name={player.username} key={player.id} />))}
                </div>

                <br/><br/>{JSON.stringify(gameState)}
            </div>
        );
    }
}
