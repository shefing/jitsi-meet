// @flow
import { Button } from 'react-native'

import { getAppProp } from '../../../base/app';
import { translate } from '../../../base/i18n';
import { connect } from '../../../base/redux';

import { enterPictureInPicture } from '../actions';

type Props = {

    /**
     * Whether Picture-in-Picture is enabled or not.
     */
    _enabled: boolean,

    /**
     * The redux {@code dispatch} function.
     */
    dispatch: Function
};

/**
 * An implementation of a button for entering Picture-in-Picture mode.
 */
class PictureInPictureButton extends Button<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.pip';
    iconName = 'icon-menu-down';
    label = 'toolbar.pip';

    /**
     * Handles clicking / pressing the button.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.dispatch(enterPictureInPicture());
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {React$Node}
     */
    render() {
        return this.props._enabled ? super.render() : null;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code PictureInPictureButton} component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _enabled: boolean
 * }}
 */
function _mapStateToProps(state): Object {
    return {
        _enabled: Boolean(getAppProp(state, 'pictureInPictureEnabled'))
    };
}

export default translate(connect(_mapStateToProps)(PictureInPictureButton));
