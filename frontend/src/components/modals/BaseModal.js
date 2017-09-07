import React from 'react';
import PropTypes from 'prop-types';

function BaseModal(props) {
    return (
        <div className="modal">
            <div className="modal-content">
                <h3>{props.header}</h3>
                {props.children}
                <br />
                <br />
                {!props.hideCloseButton &&
                    (<button className="button" onClick={props.hideModal}>
                        Close popup
                    </button>)
                }
            </div>
        </div>
    );
}

BaseModal.propTypes = {
    hideModal: PropTypes.func,
    hideCloseButton: PropTypes.bool,
    header: PropTypes.string,
};

export default BaseModal;
