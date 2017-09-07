import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import BaseModal from './BaseModal';

function ConfirmLogoutModal(props) {
    const logoutAndHideModal = () => {
        props.hideModal();
        props.logout();
    };

    return (
        <BaseModal
            header="Are you really want logout?"
            hideCloseButton={true}
        >
            <button className="button" onClick={logoutAndHideModal}>Yes</button>&nbsp;&nbsp;
            <button className="button" onClick={props.hideModal}>Nope</button>
        </BaseModal>
    );
}

ConfirmLogoutModal.propTypes = {
    hideModal: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
};

export default ConfirmLogoutModal;
