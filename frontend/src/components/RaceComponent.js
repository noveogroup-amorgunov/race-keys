import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import moment from 'moment';
import React from 'react';

import RaceStripeComponent from '@/components/RaceStripeComponent';
import { gameStatuses, HOST_URL } from '@/constants';
import locale from '@/locale';
import { Game } from '@/helpers';

export default class RaceComponent extends React.Component {
    static propTypes = {
        race: PropTypes.object,
        gameState: PropTypes.object,
        errorCode: PropTypes.string,
        readyToPlay: PropTypes.func.isRequired,
    };

    copyShareLink(event) {
        event.currentTarget.select();
        document.execCommand('copy');
    }

    initGame(sourceText) {
        this.game = new Game({ sourceText });

        this.game.on('displayErrorText', this.displayErrorText.bind(this));
        this.game.on('makeErrorInText', this.props.makeErrorInText);
        this.game.on('movingForward', this.props.movingForward);
        this.game.on('finishRace', this.props.finishRace);
        this.game.on('clearInput', this.clearInput.bind(this));
        this.game.on('highlightCompletedChunks', this.highlightCompletedChunks.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if (!this.game && nextProps.gameState.game.text && (
            nextProps.gameState.game.status === gameStatuses.IN_PROCESS ||
            this.props.gameState.game.status === gameStatuses.IN_PROCESS)
        ) {
            this.initGame(nextProps.gameState.game.text);
        }
    }

    componentWillMount() {
        if (this.props.gameState.game.text && this.props.gameState.game.status === gameStatuses.IN_PROCESS) {
            this.initGame(this.props.gameState.game.text);
        }
    }

    clearInput() {
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    displayErrorText(show = false) {
        ReactDOM.findDOMNode(this.refs.textInput).className = show ? 'error' : '';
        console.log(`displayErrorText: ${show}`);
    }

    highlightCompletedChunks(text, chunks, currentChunkIndex) {
        const start = 0;
        const end = chunks
            .slice(0, currentChunkIndex + 1)
            .reduce((acc, item) => acc + item.length, 0);

        const formattedText = `${text.substring(0, start)}<span>${text.substring(start, end)}</span>${text.substring(end, text.length)}`;
        ReactDOM.findDOMNode(this.refs.text).innerHTML = formattedText;
    }

    onChange(event) {
        if (event.keyCode === 8) {
            return;
        }

        const inputText = event.currentTarget.value;
        this.game.userEnterNewChar(inputText[inputText.length - 1]);
    }

    render() {
        if (this.props.errorCode) {
            return (<div>{locale.errors[this.props.errorCode]}</div>);
        }

        if (!this.props.race || !this.props.gameState || !this.props.gameState.me) {
            return (<span>Loading</span>);
        }

        const gameState = this.props.gameState;
        const { me, others: players } = gameState;
        const { status, text } = gameState.game;

        return (
            <div className='race'>
                {status === gameStatuses.WAIT_PLAYERS
                    ? (
                        <div style={ { marginBottom: '5px' } }>
                            <span className="hint">Hint: </span>Game started, when all racer click to <strong>"Ready to play"</strong> button.
                        </div>
                    )
                    : (
                        <div>Game started! Run run run!</div>
                    )
                }

                {status === gameStatuses.WAIT_PLAYERS
                    && (
                        <div className="share">
                            <div>
                                Share link to friends and check <b>who is faster!</b>
                                <br/>
                                <span>Click to input to copy link:</span>
                                <input readOnly onClick={this.copyShareLink} value={`${HOST_URL}/race/${this.props.race.id}`} />
                            </div>
                        </div>
                    )
                }

                <div className="text-wrapper">
                    <div>
                        <div ref="text" className="text">
                            {text}
                        </div>
                        <br/>
                        <br/>
                        <span>Type text here as fast as possible:</span>
                        <input readOnly={status === gameStatuses.WAIT_PLAYERS} ref="textInput" onChange={::this.onChange} />
                    </div>
                </div>

                {!me.readyToPlay
                    ? (<a onClick={this.props.readyToPlay} className="button">Ready to play</a>)
                    : (<div className="-wait-players">You are ready to play!</div>)
                }

                <div className="stripes">
                    <div className="finish-line"></div>
                    <RaceStripeComponent
                        {...me}
                        isCurrentPlayer={true}
                        sourceText={text}
                        readyToPlay={me.readyToPlay} />
                    {players.map(player => (
                        <RaceStripeComponent
                            {...player}
                            sourceText={text}
                            readyToPlay={player.readyToPlay}
                            key={player.id}
                        />))}
                </div>

                <br/><br/>{JSON.stringify(gameState)}
            </div>
        );
    }
}



/*
const $input = document.querySelector('input');
const $car = document.querySelector('.car');
const $text = document.querySelector('.text');
const $race = document.querySelector('.race');
const $error = document.querySelector('.error');
const $start = document.querySelector('.start');
*/