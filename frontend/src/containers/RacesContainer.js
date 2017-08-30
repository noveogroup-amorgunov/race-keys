import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RacesComponent from '@/components/RacesComponent';
import { actions, selectors } from '@/ducks/races';

class RacesContainer extends React.Component {
    static propTypes = {
        fetchRaces: PropTypes.func.isRequired,
        setCurrentRaceById: PropTypes.func.isRequired,
        races: PropTypes.array.isRequired,
        history: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
    };

    componentWillMount() {
        this._fetchRaces();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthenticated !== this.props.isAuthenticated) {
            this._fetchRaces(nextProps.isAuthenticated);
        }
    }

    _fetchRaces(isAuthenticated) {
        if ((typeof isAuthenticated === 'boolean' && isAuthenticated) || this.props.isAuthenticated) {
            this.props.fetchNotFinishedRaces();
        } else {
            this.props.fetchRaces();
        }
    }

    _handleRouteChange = (raceId) => {
        this.props.setCurrentRaceById(raceId);
        this.props.history.push(`/race/${raceId}`);
    }

    render() {
        const { races, fetchRaces } = this.props;
        return (
            <RacesComponent
                races={races}
                onRouteChange={this._handleRouteChange}
                onPageChange={this._fetchRaces} />
        );
    }
}

function mapStateToProps(state) {
    return {
        ...selectors.selectRaces(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchRaces: bindActionCreators(actions.fetchRaces, dispatch),
        fetchNotFinishedRaces: bindActionCreators(actions.fetchNotFinishedRaces, dispatch),
        setCurrentRaceById: bindActionCreators(actions.setCurrentRaceById, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RacesContainer);
