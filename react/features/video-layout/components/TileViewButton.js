// @flow

import type { Dispatch } from 'redux';
import { Button } from 'react-native'

import {
    createToolbarEvent,
    sendAnalytics
} from '../../analytics';
import { translate } from '../../base/i18n';
import { connect } from '../../base/redux';

import { setTileView } from '../actions';

/**
 * The type of the React {@code Component} props of {@link TileViewButton}.
 */
type Props = {

    /**
     * Whether or not tile view layout has been enabled as the user preference.
     */
    _tileViewEnabled: boolean,

    /**
     * Used to dispatch actions from the buttons.
     */
    dispatch: Dispatch<any>
};

class TileViewButton<P: Props> extends Button<P, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.tileView';
    iconName = 'icon-tiles-many';
    label = 'toolbar.enterTileView';
    toggledLabel = 'toolbar.exitTileView';
    toggledIconName = 'icon-tiles-many toggled';
    tooltip = 'toolbar.tileViewToggle';

    /**
     * Handles clicking / pressing the button.
     *
     * @override
     * @protected
     * @returns {void}
     */
    _handleClick() {
        const { _tileViewEnabled, dispatch } = this.props;

        sendAnalytics(createToolbarEvent(
            'tileview.button',
            {
                'is_enabled': _tileViewEnabled
            }));

        dispatch(setTileView(!_tileViewEnabled));
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._tileViewEnabled;
    }
}

/**
 * Maps (parts of) the redux state to the associated props for the
 * {@code TileViewButton} component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _tileViewEnabled: boolean
 * }}
 */
function _mapStateToProps(state) {
    return {
        _tileViewEnabled: state['features/video-layout'].tileViewEnabled
    };
}

export default translate(connect(_mapStateToProps)(TileViewButton));
