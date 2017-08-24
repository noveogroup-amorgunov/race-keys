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
        pagination: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    componentWillMount() {
        console.log('RacesContainer::fetchRaces');
        console.log(this.props.fetchRaces);
        this.props.fetchRaces();
    }

    _handleRouteChange = (raceId) => {
        this.props.setCurrentRaceById(raceId);
        this.props.history.push(`/races/${raceId}`);
    }
    render() {
        // pagination={pagination}
        const { races, /*pagination,*/ fetchRaces } = this.props;
        return (
            <RacesComponent
                races={races}
                
                onRouteChange={this._handleRouteChange}
                onPageChange={fetchRaces} />
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
        setCurrentRaceById: actions.setCurrentRaceById
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RacesContainer);
