// @flow
import { Button } from 'react-native'

import { openDialog } from '../../base/dialog';

import { KickRemoteParticipantDialog } from '.';

export type Props = {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function,

    /**
     * The ID of the participant that this button is supposed to kick.
     */
    participantID: string,

    /**
     * The function to be used to translate i18n labels.
     */
    t: Function
};

/**
 * An abstract remote video menu button which kicks the remote participant.
 */
export default class AbstractKickButton extends Button<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.kick';
    iconName = 'icon-kick';
    label = 'videothumbnail.kick';

    /**
     * Handles clicking / pressing the button, and kicks the participant.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch, participantID } = this.props;

        dispatch(openDialog(KickRemoteParticipantDialog, { participantID }));
    }
}
