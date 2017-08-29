import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

import CreateRaceComponent from '@/components/CreateRaceComponent';
import { actions as raceActions } from '@/ducks/races';
import { actions as appActions } from '@/ducks/app';

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: data =>
            dispatch(raceActions.createRace(data)).then((response) => {
                if (response.errorCode) {
                    return dispatch(appActions.errorHandler(response.errorCode));
                }
                ownProps.history.push(`/race/${response.race.id}`);
            })
    };
}

export default withRouter(connect(null, mapDispatchToProps)(CreateRaceComponent));
