import React from 'react';
import { connect } from 'react-redux';

import {
    selectors as appSelectors,
    actions as appActions,
    modalTypes,
} from '@/ducks/app';
import FinishRaceModal from '@/components/modals/FinishRaceModal';
import ConfirmLogoutModal from '@/components/modals/ConfirmLogoutModal';

const MODAL_COMPONENTS = {
    [modalTypes.FINISH_RACE]: FinishRaceModal,
    [modalTypes.CONFIRM_LOGOUT]: ConfirmLogoutModal,
};

const ModalContainer = ({ hideModal, modalType, modalProps }) => {
    if (!modalType) {
        return null;
    }

    const SpecificModalComponent = MODAL_COMPONENTS[modalType];
    return (<SpecificModalComponent
        hideModal={hideModal}
        {...modalProps}
    />);
};

export default connect(state => ({
    ...appSelectors.selectModal(state),
}), {
    hideModal: appActions.hideModal
})(ModalContainer);
