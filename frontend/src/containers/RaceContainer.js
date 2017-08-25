import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RacesComponent from '@/components/RacesComponent';
import { actions, selectors } from '@/ducks/races';

class RacesContainer extends React.Component {
    componentWillMount() {
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
        this.props.leaveRace();
    }

    /* _handleRouteChange = (raceId) => {
        this.props.setCurrentRaceById(raceId);
        this.props.history.push(`/races/${raceId}`);
    }*/

    render() {
        return (<div>RaceGameComponent</div>);
        /*
        return !this.props.currentArticle
            ? <Redirect to='/'/>
            : <ArticleComponent
                {...this.props.currentArticle}
                goToEdit={this._changeRouteToEdit}
                userId={this.props.userId}
            />
        return (
            <RacesComponent
                races={races}
                
                onRouteChange={this._handleRouteChange}
                onPageChange={fetchRaces} />
        );
        */
    }
}

function mapStateToProps(state) {
    return {
        currentRace: selectors.selectCurrentRace(state),
        selectCurrentRaceId: selectors.selectCurrentRaceId(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // joinRace: actions 
        // leaveRace: actions
    };
    /*
        fetchRaces: bindActionCreators(actions.fetchRaces, dispatch),
        setCurrentRaceById: actions.setCurrentRaceById
    };
    */
}

export default connect(mapStateToProps, mapDispatchToProps)(RacesContainer);
