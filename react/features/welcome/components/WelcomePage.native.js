import React from 'react';
import {
    Animated,
    Keyboard,
    SafeAreaView,
    TouchableHighlight,
    View
} from 'react-native';

import { ColorSchemeRegistry } from '../../base/color-scheme';
import { translate } from '../../base/i18n';
import {  LoadingIndicator, Text } from '../../base/react';
import { connect } from '../../base/redux';
import { ColorPalette } from '../../base/styles';
import {
    destroyLocalTracks
} from '../../base/tracks';

import {
    AbstractWelcomePage,
    _mapStateToProps as _abstractMapStateToProps
} from './AbstractWelcomePage';
import LocalVideoTrackUnderlay from './LocalVideoTrackUnderlay';
import styles from './styles';

/**
 * The native container rendering the welcome page.
 *
 * @extends AbstractWelcomePage
 */
class WelcomePage extends AbstractWelcomePage {
    /**
     * Constructor of the Component.
     *
     * @inheritdoc
     */
    constructor(props) {
        super(props);

        this.state._fieldFocused = false;
        this.state.hintBoxAnimation = new Animated.Value(0);

    }

    /**
     * Implements React's {@link Component#componentDidMount()}. Invoked
     * immediately after mounting occurs. Creates a local video track if none
     * is available and the camera permission was already granted.
     *
     * @inheritdoc
     * @returns {void}
     */
    componentDidMount() {
        super.componentDidMount();

        const { dispatch } = this.props;

            dispatch(destroyLocalTracks());
    }

    /**
     * Implements React's {@link Component#render()}. Renders a prompt for
     * entering a room name.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const roomnameAccLabel = 'welcomepage.accessibilityLabel.roomname';
        const { _headerStyles, t } = this.props;

        return (
            <LocalVideoTrackUnderlay style={styles.welcomePage}>
                <View style={_headerStyles.page}>
                    <SafeAreaView style={styles.roomContainer} >
                        <View style={styles.joinControls} >
                            {this._renderJoinButton()}
                        </View>
                    </SafeAreaView>
                </View>
            </LocalVideoTrackUnderlay>
        );
    }



    /**
    * Renders the join button.
    *
    * @private
    * @returns{ReactElement}
    */
    _renderJoinButton() {
        const { t } = this.props;
        let children;


        if (this.state.joining) {
            // TouchableHighlight is picky about what its children can be, so
            // wrap it in a native component, i.e. View to avoid having to
            // modify non-native children.
            children = (
                <View>
                    <LoadingIndicator
                        color={styles.buttonText.color}
                        size='small' />
                </View>
            );
        } else {
            children = (
                <Text style={styles.buttonText}>
                    {this.props.t('welcomepage.join')}
                </Text>
            );
        }


        const buttonDisabled = this._isJoinDisabled();

        return (
            <TouchableHighlight
                accessibilityLabel=
                {t('welcomepage.accessibilityLabel.join')}
                disabled={buttonDisabled}
                onPress={this._onJoin}
                style={[
                    styles.button,
                    buttonDisabled ? styles.buttonDisabled : null
                ]}
                underlayColor={ColorPalette.white}>
                {children}
            </TouchableHighlight>
        );
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @returns {{
 *     _headerStyles: Object
 * }}
 */
function _mapStateToProps(state) {
    return {
        ..._abstractMapStateToProps(state),
        _headerStyles: ColorSchemeRegistry.get(state, 'Header')
    };
}

export default translate(connect(_mapStateToProps)(WelcomePage));
