import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import RaceComponent from '@/components/RaceComponent';
import { actions, selectors } from '@/ducks/races';


class RaceContainer extends React.Component {
    static propTypes = {
        currentRace: PropTypes.object,
        joinRace: PropTypes.func.isRequired,
        leaveRace: PropTypes.func.isRequired,
        readyToPlay: PropTypes.func.isRequired,
        // makeErrorInText: PropTypes.func.makeErrorInText,
        // movingForward: PropTypes.func.movingForward,
        // finishRace: PropTypes.func.finishRace,
    };

    constructor(props) {
        super(props);
        this.raceId = this.props.match.params.id;
    }

    componentWillMount() {
        console.log(`join to race: ${this.raceId}`);
        const next = this.props.isFetched ? Promise.resolve() : this.props.fetchRace(this.raceId);
        next.then(() => {
            const socketId = window.localStorage.getItem('socketId');
            this.props.joinRace(this.raceId, socketId);
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.socketId && nextProps.socketId !== this.props.socketId) {
            window.localStorage.setItem('socketId', nextProps.socketId);
        }
        if (nextProps.error && nextProps.error !== this.props.error) {
            this.props.history.push('/');
        }
    }

    componentWillUnmount() {
        console.log(`leave race: ${this.raceId}`);
        this.props.leaveRace(this.raceId);
    }

    render() {
        return (
            <RaceComponent
                race={this.props.currentRace}
                errorCode={this.props.errorCode}
                gameState={this.props.currentRaceState}
                makeErrorInText={this.props.makeErrorInText}
                movingForward={this.props.movingForward}
                finishRace={this.props.finishRace}
                readyToPlay={this.props.readyToPlay.bind(this, this.raceId)} />
        );
    }
}

export default connect(state => ({
    currentRace: selectors.selectCurrentRace(state),
    isFetched: selectors.isFetchedRaces(state),
    errorCode: selectors.selectErrorCode(state),
    currentRaceState: selectors.selectCurrentRaceState(state),
}), {
    fetchRace: actions.fetchRace,
    joinRace: actions.joinRaceRequest,
    makeErrorInText: actions.makeErrorInTextRequest,
    movingForward: actions.movingForwardRequest,
    finishRace: actions.finishRaceRequest,
    leaveRace: actions.leaveRace,
    readyToPlay: actions.readyToPlay,
})(RaceContainer);
