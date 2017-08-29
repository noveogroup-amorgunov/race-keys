import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaceComponent from '@/components/RaceComponent';
import { actions, selectors } from '@/ducks/races';

class RaceContainer extends React.Component {
    static propTypes = {
        currentRace: PropTypes.object.isRequired,
        joinRace: PropTypes.func.isRequired,
        leaveRace: PropTypes.func.isRequired,
        readyToPlay: PropTypes.func.isRequired,
    };

    componentWillMount() {
        console.log(`join to race: ${this.props.match.params.id}`);
        const socketId = window.localStorage.getItem('socketId');
        this.props.joinRace(
            this.props.match.params.id,
            socketId
        );
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

    /* _handleRouteChange = (raceId) => {
        this.props.setCurrentRaceById(raceId);
        this.props.history.push(`/races/${raceId}`);
    }*/

    render() {
        /*
        return !this.props.currentArticle
            ? <Redirect to='/'/>
            : <ArticleComponent
                {...this.props.currentArticle}
                goToEdit={this._changeRouteToEdit}
                userId={this.props.userId}
            />*/
        return (
            <RaceComponent
                race={this.props.currentRace}
                readyToPlay={this.props.readyToPlay} />
        );
    }
}

function mapStateToProps(state) {
    return {
        currentRace: selectors.selectCurrentRace(state),
        // selectCurrentRaceId: selectors.selectCurrentRaceId(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRaces: bindActionCreators(actions.fetchRaces, dispatch),
        joinRace: data => dispatch(actions.joinRaceRequest(data)),
        leaveRace: () => dispatch(actions.leaveRace()),
        readyToPlay: () => dispatch(actions.readyToPlay()),
    };
    /*
        fetchRaces: bindActionCreators(actions.fetchRaces, dispatch),
        setCurrentRaceById: actions.setCurrentRaceById
    };
    */
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceContainer);
