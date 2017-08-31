import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

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
        return (
            <RacesComponent
                races={this.props.races}
                onRouteChange={this._handleRouteChange}
                onPageChange={this._fetchRaces} />
        );
    }
}

export default connect(state => ({
    ...selectors.selectRaces(state)
}), {
    fetchRaces: actions.fetchRaces,
    fetchNotFinishedRaces: actions.fetchNotFinishedRaces,
    setCurrentRaceById: actions.setCurrentRaceById,
})(RacesContainer);
