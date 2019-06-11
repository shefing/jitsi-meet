// @flow
import { Button } from 'react-native'


import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';

import { incomingCallDeclined } from '../actions';

/**
 * The type of the React {@code Component} props of {@link DeclineButton}.
 */
type Props = {

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button which declines/rejects an incoming call.
 */
class DeclineButton extends Button<Props, *> {
    accessibilityLabel = 'incomingCall.decline';
    iconName = 'hangup';
    label = 'incomingCall.decline';

    /**
     * Handles clicking / pressing the button, and declines the incoming call.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(incomingCallDeclined());
    }
}

export default translate(connect()(DeclineButton));
