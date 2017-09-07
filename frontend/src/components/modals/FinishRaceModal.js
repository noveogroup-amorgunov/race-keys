import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import BaseModal from './BaseModal';

function FinishRaceModal(props) {
    const { place, speed, finishedTime, errorsInPrint, errorsInPercents } = props.data;
    const time = moment()
        .startOf('day')
        .seconds(parseInt(finishedTime / 1000, 10) || 0)
        .format('mm:ss');

    return (
        <BaseModal header={`You took the ${place} place`} {...props}>
            Time: <strong>{time}</strong><br/>
            Speed: <strong>{speed.toFixed(2)} chars/min</strong><br/>
            Errors: <strong>{errorsInPrint} ({errorsInPercents}%)</strong><br/>
        </BaseModal>
    );
}

FinishRaceModal.propTypes = {
    hideModal: PropTypes.func.isRequired,
};

export default FinishRaceModal;
