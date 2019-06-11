// @flow
import { Button } from 'react-native'


import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';

import { incomingCallAnswered } from '../actions';



/**
 * An implementation of a button which accepts/answers an incoming call.
 */
class AnswerButton extends Button<Props, *> {
    accessibilityLabel = 'incomingCall.answer';
    iconName = 'hangup';
    label = 'incomingCall.answer';

    /**
     * Handles clicking / pressing the button, and answers the incoming call.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(incomingCallAnswered());
    }
}

export default translate(connect()(AnswerButton));
