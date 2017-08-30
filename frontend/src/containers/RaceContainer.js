import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaceComponent from '@/components/RaceComponent';
import { actions as racesActions, selectors as racesSelectors } from '@/ducks/races';


class RaceContainer extends React.Component {
    static propTypes = {
        // currentRace: PropTypes.object.isRequired,
        joinRace: PropTypes.func.isRequired,
        leaveRace: PropTypes.func.isRequired,
        readyToPlay: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const raceId = this.props.match.params.id;
        console.log(`join to race: ${raceId}`);

        const next = this.props.isFetched ? Promise.resolve() : this.props.fetchRace(raceId);
    
        next.then(() => {
            const socketId = window.localStorage.getItem('socketId');
            this.props.joinRace(raceId, socketId);
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
        console.log('leave race');
        this.props.leaveRace();
    }

    render() {
        return (
            <RaceComponent
                race={this.props.currentRace}
                errorCode={this.props.errorCode}
                gameState={this.props.currentRaceState}
                readyToPlay={this.props.readyToPlay} />
        );
    }
}

function mapStateToProps(state) {
    return {
        currentRace: racesSelectors.selectCurrentRace(state),
        isFetched: racesSelectors.isFetchedRaces(state),
        errorCode: racesSelectors.selectErrorCode(state),
        currentRaceState: racesSelectors.selectCurrentRaceState(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRace: bindActionCreators(racesActions.fetchRace, dispatch),
        joinRace: data => dispatch(racesActions.joinRaceRequest(data)),
        leaveRace: () => dispatch(racesActions.leaveRace()),
        readyToPlay: () => dispatch(racesActions.readyToPlay()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceContainer);
